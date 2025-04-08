import React, { useEffect } from "react";

const StreetView = () => {
  useEffect(() => {
    const initStreetView = (id, position) => {
      const panorama = new window.google.maps.StreetViewPanorama(
        document.getElementById(id),
        {
          position,
          pov: { heading: 160, pitch: 0 },
          zoom: 1,
        }
      );
    };

    // Load the Google Maps API and initialize all locations
    const loadStreetViews = () => {
      // 1. Eiffel Tower
      initStreetView("eiffel-tower-view", { lat: 48.8588443, lng: 2.2943506 });
      // 2. Louvre Museum
      initStreetView("louvre-view", { lat: 48.860615, lng: 2.337644 });
      // 3. Notre-Dame Cathedral
      initStreetView("notre-dame-view", { lat: 48.852968, lng: 2.349902 });
      // 4. Sacré-Cœur Basilica
      initStreetView("sacre-coeur-view", { lat: 48.886704, lng: 2.343104 });
      // 5. Arc de Triomphe
      initStreetView("arc-de-triomphe-view", { lat: 48.873792, lng: 2.295028 });
      // 6. Champs-Élysées (near the Arc de Triomphe)
      initStreetView("champs-elysees-view", { lat: 48.8698, lng: 2.3075 });
      // 7. Palace of Versailles
      initStreetView("versailles-view", { lat: 48.804865, lng: 2.120355 });
      // 8. Moulin Rouge
      initStreetView("moulin-rouge-view", { lat: 48.8841, lng: 2.3324 });
      // 9. Musée d’Orsay
      initStreetView("musee-dorsay-view", { lat: 48.859961, lng: 2.326561 });
      // 10. Disneyland Paris
      initStreetView("disneyland-view", { lat: 48.8722, lng: 2.7756 });
    };

    // Dynamically add the Google Maps API script with the callback
    if (!window.google) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBeqVNk2kM08YUsKdezPMBgLyrOLFs1F6o&callback=loadStreetViews";
      script.async = true;
      script.defer = true;
      window.loadStreetViews = loadStreetViews;
      document.head.appendChild(script);
    } else {
      loadStreetViews(); // If already loaded, initialize all locations
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Page Header */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Discover Paris: Street Views of Iconic Landmarks
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Experience the magic of Paris through immersive Street Views of its most famous landmarks, from the Eiffel Tower to the Palace of Versailles.
        </p>
      </header>

      {/* Street View Sections */}
      <div className="max-w-6xl mx-auto space-y-12">
        {/* 1. Eiffel Tower */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-gray-800">
            <h2 className="text-2xl font-semibold text-white flex items-center space-x-2">
              <span>🗼</span>
              <span>Eiffel Tower</span>
            </h2>
          </div>
          <div
            id="eiffel-tower-view"
            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] border-t border-gray-100"
          />
        </section>

        {/* 2. Louvre Museum */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-gray-800">
            <h2 className="text-2xl font-semibold text-white flex items-center space-x-2">
              <span>🏛️</span>
              <span>Louvre Museum</span>
            </h2>
          </div>
          <div
            id="louvre-view"
            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] border-t border-gray-100"
          />
        </section>

        {/* 3. Notre-Dame Cathedral */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-gray-800">
            <h2 className="text-2xl font-semibold text-white flex items-center space-x-2">
              <span>⛪</span>
              <span>Notre-Dame Cathedral</span>
            </h2>
          </div>
          <div
            id="notre-dame-view"
            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] border-t border-gray-100"
          />
        </section>

        {/* 4. Sacré-Cœur Basilica */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-gray-800">
            <h2 className="text-2xl font-semibold text-white flex items-center space-x-2">
              <span>⛪</span>
              <span>Sacré-Cœur Basilica</span>
            </h2>
          </div>
          <div
            id="sacre-coeur-view"
            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] border-t border-gray-100"
          />
        </section>

        {/* 5. Arc de Triomphe */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-gray-800">
            <h2 className="text-2xl font-semibold text-white flex items-center space-x-2">
              <span>🏛️</span>
              <span>Arc de Triomphe</span>
            </h2>
          </div>
          <div
            id="arc-de-triomphe-view"
            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] border-t border-gray-100"
          />
        </section>

        {/* 6. Champs-Élysées */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-gray-800">
            <h2 className="text-2xl font-semibold text-white flex items-center space-x-2">
              <span>🛍️</span>
              <span>Champs-Élysées</span>
            </h2>
          </div>
          <div
            id="champs-elysees-view"
            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] border-t border-gray-100"
          />
        </section>

        {/* 7. Palace of Versailles */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-gray-800">
            <h2 className="text-2xl font-semibold text-white flex items-center space-x-2">
              <span>🏰</span>
              <span>Palace of Versailles</span>
            </h2>
          </div>
          <div
            id="versailles-view"
            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] border-t border-gray-100"
          />
        </section>

        {/* 8. Moulin Rouge */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-gray-800">
            <h2 className="text-2xl font-semibold text-white flex items-center space-x-2">
              <span>🎭</span>
              <span>Moulin Rouge</span>
            </h2>
          </div>
          <div
            id="moulin-rouge-view"
            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] border-t border-gray-100"
          />
        </section>

        {/* 9. Musée d’Orsay */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-gray-800">
            <h2 className="text-2xl font-semibold text-white flex items-center space-x-2">
              <span>🎨</span>
              <span>Musée d’Orsay</span>
            </h2>
          </div>
          <div
            id="musee-dorsay-view"
            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] border-t border-gray-100"
          />
        </section>

        {/* 10. Disneyland Paris */}
        <section className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-gray-800">
            <h2 className="text-2xl font-semibold text-white flex items-center space-x-2">
              <span>🏰</span>
              <span>Disneyland Paris</span>
            </h2>
          </div>
          <div
            id="disneyland-view"
            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] border-t border-gray-100"
          />
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© 2025 Paris Easy Move. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StreetView;