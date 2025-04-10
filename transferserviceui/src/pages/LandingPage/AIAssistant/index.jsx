import React, { useState, useEffect } from 'react';
import { FaPlane, FaLandmark, FaPalette, FaShoppingBag, FaUtensils, FaCamera } from 'react-icons/fa';

const TravelPromptAssistant = () => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activities = [
    { name: 'Seine River Cruise', icon: <FaCamera />, description: 'Cruise past iconic landmarks like Notre-Dame and the Eiffel Tower.' },
    { name: 'Dine at a Michelin-Starred Restaurant', icon: <FaUtensils />, description: 'Experience world-class French cuisine at places like Septime.' },
    { name: 'Visit a Flea Market', icon: <FaShoppingBag />, description: 'Hunt for vintage treasures at Puces de Saint-Ouen.' },
    { name: 'Explore Montmartre', icon: <FaLandmark />, description: 'Discover the artistic soul of Paris with views from Sacré-Cœur.' },
    { name: 'Attend a Candlelight Concert', icon: <FaPalette />, description: 'Enjoy music from Vivaldi to Taylor Swift in a unique setting.' },
  ];

  const [fromCategory, setFromCategory] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toCategory, setToCategory] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [displayedResult, setDisplayedResult] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://localhost:7299/api/Locations');
        if (!response.ok) throw new Error('Failed to fetch locations');
        const data = await response.json();

        const groupedCategories = data.reduce((acc, location) => {
          const categoryName = location.locationCategory.name;
          if (!acc[categoryName]) {
            acc[categoryName] = [];
          }
          acc[categoryName].push({ name: location.name, description: `${location.name} in ${categoryName}` });
          return acc;
        }, {});

        setCategories(groupedCategories);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    let newPrompt = '';
    if (fromLocation) newPrompt += `From ${fromLocation}`;
    if (toLocation) newPrompt += `${fromLocation ? ' ' : ''}to ${toLocation}`;
    if (selectedActivity) newPrompt += `${(fromLocation || toLocation) ? ', I want to ' : 'I want to '}${selectedActivity.toLowerCase()}.`;
    setPrompt(newPrompt);
  }, [fromLocation, toLocation, selectedActivity]);

  useEffect(() => {
    if (result) {
      setDisplayedResult('');
      let index = 0;
      const interval = setInterval(() => {
        if (index < result.length) {
          setDisplayedResult((prev) => prev + result[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [result]);

  const handleAssist = async () => {
    if (!fromLocation || !toLocation || !selectedActivity) {
      setResult('Please select a "From" location, a "To" location, and an activity.');
      return;
    }

    const generatedPrompt = `From ${fromLocation} to ${toLocation}, I want to ${selectedActivity.toLowerCase()}.`;
    setPrompt(generatedPrompt);

    try {
      const response = await fetch('https://localhost:7299/api/GPT/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: generatedPrompt }),
      });

      if (!response.ok) throw new Error('Failed to fetch response from API');
      const data = await response.json();
      setResult(data.reply);
    } catch (err) {
      setResult(`Error: ${err.message}`);
    }

    // Clear the prompt box and selections
    setPrompt('');
    setFromCategory('');
    setFromLocation(''); // Fixed syntax error here
    setToCategory('');
    setToLocation('');
    setSelectedActivity('');
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">Error: {error}</div>;

  return (
    <section className="py-16 bg-gray-100 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-black text-center mb-8">
          Plan Your Paris Adventure with Our AI Assistant
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-black text-sm font-semibold mb-2">From</label>
            <select
              className="bg-gray-200 text-black border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 mb-2"
              value={fromCategory}
              onChange={(e) => {
                setFromCategory(e.target.value);
                setFromLocation('');
              }}
            >
              <option value="">Select Category</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {fromCategory && (
              <select
                className="bg-gray-200 text-black border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
              >
                <option value="">Select Location</option>
                {categories[fromCategory].map((location) => (
                  <option key={location.name} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-black text-sm font-semibold mb-2">To</label>
            <select
              className="bg-gray-200 text-black border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 mb-2"
              value={toCategory}
              onChange={(e) => {
                setToCategory(e.target.value);
                setToLocation('');
              }}
            >
              <option value="">Select Category</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {toCategory && (
              <select
                className="bg-gray-200 text-black border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
              >
                <option value="">Select Location</option>
                {categories[toCategory].map((location) => (
                  <option key={location.name} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-black mb-4">Special Things to Do in Paris</h3>
          <div className="flex flex-wrap gap-4">
            {activities.map((activity) => (
              <button
                key={activity.name}
                onClick={() => setSelectedActivity(activity.name)}
                className={`flex items-center space-x-2 bg-gray-300 text-black rounded-full px-4 py-2 hover:bg-gray-400 transition duration-300 ${
                  selectedActivity === activity.name ? 'ring-2 ring-gray-500' : ''
                }`}
              >
                {activity.icon}
                <span>{activity.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-black mb-4">Your Travel Prompt</h3>
          <div className="flex space-x-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Your prompt will appear here..."
              className="bg-gray-200 text-black border border-gray-400 rounded-lg px-4 py-3 w-full h-24 focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
              readOnly
            />
            <button
              onClick={handleAssist}
              className="bg-gray-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Assist
            </button>
          </div>
        </div>

        {displayedResult && (
          <div className="bg-gray-200 border border-gray-400 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-black mb-4">Your Travel Plan</h3>
            <div className="text-gray-800 whitespace-pre-line">{displayedResult}</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TravelPromptAssistant;