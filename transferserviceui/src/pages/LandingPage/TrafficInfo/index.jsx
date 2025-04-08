import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const center = {
  lat: 48.8566, // Paris center
  lng: 2.3522,
};

const mapOptions = {
  styles: [
    { featureType: "all", elementType: "all", stylers: [{ saturation: -80 }] },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ lightness: 100 }, { visibility: "simplified" }],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
  disableDefaultUI: false,
};

const MapWithDirections = () => {
  const [directions, setDirections] = useState(null);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [trafficDetails, setTrafficDetails] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");

  const startRef = useRef(null);
  const endRef = useRef(null);
  const directionsService = useRef(null);
  const directionsRenderer = useRef(null);
  const trafficLayer = useRef(null);

  useEffect(() => {
    if (map) {
      directionsService.current = new window.google.maps.DirectionsService();
      directionsRenderer.current = new window.google.maps.DirectionsRenderer();
      directionsRenderer.current.setMap(map);
      trafficLayer.current = new window.google.maps.TrafficLayer();
      // Toggle traffic layer based on travel mode
      if (travelMode === "DRIVING") {
        trafficLayer.current.setMap(map);
      } else {
        trafficLayer.current.setMap(null);
      }
    }
  }, [map, travelMode]);

  const handleCalculateRoute = () => {
    if (!startLocation || !endLocation) {
      setErrorMessage("Please provide both start and end locations.");
      return;
    }

    const request = {
      origin: startLocation,
      destination: endLocation,
      travelMode: window.google.maps.TravelMode[travelMode],
      drivingOptions:
        travelMode === "DRIVING"
          ? {
              departureTime: new Date(),
              trafficModel: window.google.maps.TrafficModel.BEST_GUESS,
            }
          : undefined,
    };

    directionsService.current.route(request, (result, status) => {
      if (status === "OK") {
        setDirections(result);
        directionsRenderer.current.setDirections(result);
        setTrafficDetails(extractTrafficDetails(result));
        setErrorMessage("");
      } else {
        setErrorMessage(`Directions request failed due to ${status}`);
      }
    });
  };

  const extractTrafficDetails = (result) => {
    if (result.routes && result.routes.length > 0) {
      const leg = result.routes[0].legs[0];
      return {
        durationInTraffic: leg.duration_in_traffic
          ? leg.duration_in_traffic.text
          : leg.duration.text,
        distance: leg.distance.text,
        startAddress: leg.start_address,
        endAddress: leg.end_address,
      };
    }
    return null;
  };

  const handleClearRoute = () => {
    setStartLocation("");
    setEndLocation("");
    setDirections(null);
    setTrafficDetails(null);
    if (directionsRenderer.current) {
      directionsRenderer.current.setDirections({ routes: [] });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (startLocation && endLocation) handleCalculateRoute();
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [startLocation, endLocation, travelMode]);

  const onApiLoad = () => setIsLoaded(true);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header with Rounded Corners */}
      <header className="bg-gray-800 text-white py-6 px-6 shadow-lg rounded-b-lg">
        <h1 className="text-3xl font-semibold tracking-wide">
          Traffic Navigator
        </h1>
        <p className="mt-1 text-md opacity-80">
          Real-Time Route Planning for Paris
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Inputs */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="space-y-6">
              {/* Start Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Location
                </label>
                {isLoaded && (
                  <StandaloneSearchBox
                    onLoad={(ref) => (startRef.current = ref)}
                    onPlacesChanged={() => {
                      const places = startRef.current.getPlaces();
                      if (places && places.length > 0) {
                        setStartLocation(places[0].formatted_address);
                      }
                    }}
                  >
                    <input
                      type="text"
                      value={startLocation} // Controlled input
                      onChange={(e) => setStartLocation(e.target.value)} // Allow manual typing
                      placeholder="Enter start location"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                    />
                  </StandaloneSearchBox>
                )}
              </div>

              {/* End Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Location
                </label>
                {isLoaded && (
                  <StandaloneSearchBox
                    onLoad={(ref) => (endRef.current = ref)}
                    onPlacesChanged={() => {
                      const places = endRef.current.getPlaces();
                      if (places && places.length > 0) {
                        setEndLocation(places[0].formatted_address);
                      }
                    }}
                  >
                    <input
                      type="text"
                      value={endLocation} // Controlled input
                      onChange={(e) => setEndLocation(e.target.value)} // Allow manual typing
                      placeholder="Enter end location"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                    />
                  </StandaloneSearchBox>
                )}
              </div>

              {/* Travel Mode Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Travel Mode
                </label>
                <select
                  value={travelMode}
                  onChange={(e) => setTravelMode(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                >
                  <option value="DRIVING">Driving</option>
                  <option value="WALKING">Walking</option>
                  <option value="BICYCLING">Bicycling</option>
                  <option value="TRANSIT">Transit</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleCalculateRoute}
                  className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition-all font-medium shadow-md hover:shadow-lg"
                >
                  Get Directions
                </button>
                <button
                  onClick={handleClearRoute}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-all font-medium shadow-md hover:shadow-lg"
                >
                  Clear Route
                </button>
              </div>

              {/* Traffic Details */}
              {trafficDetails && (
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Traffic Details
                  </h4>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium text-gray-800">From:</span>{" "}
                    {trafficDetails.startAddress}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="font-medium text-gray-800">To:</span>{" "}
                    {trafficDetails.endAddress}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="font-medium text-gray-800">Duration:</span>{" "}
                    {trafficDetails.durationInTraffic}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    <span className="font-medium text-gray-800">Distance:</span>{" "}
                    {trafficDetails.distance}
                  </p>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
              )}
            </div>
          </div>

          {/* Map with Rounded Corners */}
          <div className="lg:col-span-3">
            <LoadScript
              googleMapsApiKey="YOUR_API_KEY_HERE" // Replace with your key or use env variable
              libraries={["places"]}
              onLoad={onApiLoad}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                options={mapOptions}
                onLoad={(map) => setMap(map)}
                className="rounded-lg shadow-lg border border-gray-200"
              >
                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapWithDirections;