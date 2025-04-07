// src/Components/TravelPromptAssistant.jsx
import React, { useState, useEffect } from 'react';
import { FaPlane, FaLandmark, FaPalette, FaShoppingBag, FaUtensils, FaCamera } from 'react-icons/fa'; // Import icons for stickers

const TravelPromptAssistant = () => {
  // Categories and locations data
  const categories = {
    Airports: [
      { name: 'Charles de Gaulle Airport (CDG)', description: 'Largest international airport in France, 23 km northeast of Paris.' },
      { name: 'Orly Airport (ORY)', description: 'Second major airport, located south of Paris.' },
      { name: 'Beauvais-Tille Airport (BVA)', description: 'Smaller airport, often used by budget airlines, 85 km north of Paris.' },
    ],
    Landmarks: [
      { name: 'Eiffel Tower', description: 'Iconic Parisian landmark with stunning views.' },
      { name: 'Notre-Dame Cathedral', description: 'Historic cathedral, recently reopened after the 2019 fire.' },
      { name: 'Arc de Triomphe', description: 'Monument at the end of Champs-Élysées with panoramic views.' },
      { name: 'Sacré-Cœur Basilica', description: 'Stunning basilica in Montmartre with city views.' },
    ],
    Museums: [
      { name: 'Louvre Museum', description: 'World-famous museum housing the Mona Lisa.' },
      { name: 'Musée d’Orsay', description: 'Impressionist art in a former railway station.' },
      { name: 'Centre Pompidou', description: 'Modern art museum with a unique architectural design.' },
      { name: 'Rodin Museum', description: 'Features Auguste Rodin’s sculptures like The Thinker.' },
    ],
    Markets: [
      { name: 'Marché des Enfants Rouges', description: 'Oldest covered market in Le Marais.' },
      { name: 'Puces de Saint-Ouen', description: 'Largest flea market in the world, great for antiques.' },
      { name: 'Marché Saint-Germain', description: 'Hidden gem market with superb coffee and wine.' },
    ],
    Gardens: [
      { name: 'Tuileries Garden', description: 'Historic garden between the Louvre and Place de la Concorde.' },
      { name: 'Luxembourg Gardens', description: 'Beautiful gardens with activities for kids.' },
      { name: 'Parc de Belleville', description: 'Hilly park with panoramic views of Paris.' },
    ],
  };

  // Special things to do in Paris (stickers)
  const activities = [
    { name: 'Seine River Cruise', icon: <FaCamera />, description: 'Cruise past iconic landmarks like Notre-Dame and the Eiffel Tower.' },
    { name: 'Dine at a Michelin-Starred Restaurant', icon: <FaUtensils />, description: 'Experience world-class French cuisine at places like Septime.' },
    { name: 'Visit a Flea Market', icon: <FaShoppingBag />, description: 'Hunt for vintage treasures at Puces de Saint-Ouen.' },
    { name: 'Explore Montmartre', icon: <FaLandmark />, description: 'Discover the artistic soul of Paris with views from Sacré-Cœur.' },
    { name: 'Attend a Candlelight Concert', icon: <FaPalette />, description: 'Enjoy music from Vivaldi to Taylor Swift in a unique setting.' },
  ];

  // State for dropdown selections, selected activity, prompt, and result
  const [fromCategory, setFromCategory] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toCategory, setToCategory] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [displayedResult, setDisplayedResult] = useState(''); // For typing animation

  // Update prompt in real-time when selections change
  useEffect(() => {
    let newPrompt = '';
    if (fromLocation) newPrompt += `From ${fromLocation}`;
    if (toLocation) newPrompt += `${fromLocation ? ' ' : ''}to ${toLocation}`;
    if (selectedActivity) newPrompt += `${(fromLocation || toLocation) ? ', I want to ' : 'I want to '}${selectedActivity.toLowerCase()}.`;
    setPrompt(newPrompt);
  }, [fromLocation, toLocation, selectedActivity]);

  // Typing animation for result
  useEffect(() => {
    if (result) {
      setDisplayedResult(''); // Reset displayed result
      let index = 0;
      const interval = setInterval(() => {
        if (index < result.length) {
          setDisplayedResult((prev) => prev + result[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 20); // Adjust speed of typing (20ms per character)
      return () => clearInterval(interval);
    }
  }, [result]);

  // Handle "Assist" button click to generate the prompt result and clear the prompt box
  const handleAssist = () => {
    if (!fromLocation || !toLocation || !selectedActivity) {
      setResult('Please select a "From" location, a "To" location, and an activity.');
      return;
    }

    const generatedPrompt = `From ${fromLocation} to ${toLocation}, I want to ${selectedActivity.toLowerCase()}.`;
    setPrompt(generatedPrompt);

    // Simulate a response (replace with actual logic or API call if needed)
    const response = `Here's a plan for your trip:\n\nStart at **${fromLocation}**. If you're at an airport like Charles de Gaulle, you can use the RER train or a taxi to head into the city (fares from CDG to central Paris are around €56-€65). If you're at a landmark or museum, you're likely already in the heart of Paris.\n\nNext, make your way to **${toLocation}**. If you're traveling between landmarks or museums, walking or the Metro is ideal—buy a carnet of 10 tickets for convenience. For example, from the Eiffel Tower to the Louvre, it's a scenic 30-minute walk along the Seine, or a quick Metro ride on Line 6 to Line 1.\n\nWhile traveling, enjoy your selected activity: **${selectedActivity}**. ${getActivityDetails(selectedActivity)}\n\nEnjoy your time in Paris!`;
    setResult(response);

    // Clear the prompt box and selections
    setPrompt('');
    setFromCategory('');
    setFromLocation('');
    setToCategory('');
    setToLocation('');
    setSelectedActivity('');
  };

  // Helper function to provide activity details
  const getActivityDetails = (activity) => {
    switch (activity) {
      case 'Seine River Cruise':
        return 'Book a one-hour cruise with Bateaux Parisiens or Bateaux Mouches, starting near the Eiffel Tower. You’ll pass Notre-Dame, Musée d’Orsay, and charming quaysides—perfect for photos!';
      case 'Dine at a Michelin-Starred Restaurant':
        return 'Try Septime in the 11th arrondissement for a seven-course tasting menu (€135). Book early, as reservations can fill up a year in advance. Pair your meal with their curated wine selection (€75).';
      case 'Visit a Flea Market':
        return 'Head to Puces de Saint-Ouen, open Friday to Monday. Browse vintage Chanel, antique books, and more. Stay for lunch at a local bistro like Le Pericole for an authentic experience.';
      case 'Explore Montmartre':
        return 'Wander the cobblestone streets, visit Sacré-Cœur Basilica for panoramic views, and enjoy a café au lait at a sidewalk bistro. Don’t miss Place du Tertre for local artists.';
      case 'Attend a Candlelight Concert':
        return 'Experience a unique concert at venues like Saint-Eustache, featuring music from Vivaldi to Taylor Swift, illuminated by candlelight. Check schedules at saintdenys.net or sfx-paris.fr.';
      default:
        return '';
    }
  };

  return (
    <section className="py-16 bg-gray-100 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-black text-center mb-8">
          Plan Your Paris Adventure Our AI Assistant
        </h2>

        {/* Dropdowns for From and To */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* From Dropdown */}
          <div>
            <label className="block text-black text-sm font-semibold mb-2">From</label>
            <select
              className="bg-gray-200 text-black border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 mb-2"
              value={fromCategory}
              onChange={(e) => {
                setFromCategory(e.target.value);
                setFromLocation(''); // Reset location when category changes
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

          {/* To Dropdown */}
          <div>
            <label className="block text-black text-sm font-semibold mb-2">To</label>
            <select
              className="bg-gray-200 text-black border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 mb-2"
              value={toCategory}
              onChange={(e) => {
                setToCategory(e.target.value);
                setToLocation(''); // Reset location when category changes
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

        {/* Stickers for Special Things to Do */}
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

        {/* Prompt Input and Assist Button */}
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

        {/* Result Display (ChatGPT-like with typing animation) */}
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