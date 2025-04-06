// src/components/Footer.jsx
const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">LIMO5</h3>
            <div className="flex space-x-2">
              <input type="email" placeholder="Email" className="p-2 rounded w-full" />
              <button className="bg-green-500 p-2 rounded">Subscribe</button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Top Cities</h3>
            <ul className="space-y-2">
              <li>New York</li>
              <li>Berlin</li>
              <li>Paris</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>Intercity Rides</li>
              <li>Chauffeur Service</li>
              <li>Airport Transfers</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Top Destinations</h3>
            <ul className="space-y-2">
              <li>East Hampton, NY</li>
              <li>New York, NY</li>
              <li>Philadelphia, PA</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; 2025 LIMO5. Terms | Privacy Policy | Notice</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;