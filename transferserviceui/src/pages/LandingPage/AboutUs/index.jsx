
const AboutUs = () => {
    return (
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left Side: Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-600 mb-6">
              At LIMO5, we are dedicated to providing top-notch luxury limousine services for all your travel needs. With years of experience in the industry, our mission is to deliver comfort, style, and reliability to every client. Whether it's a special event, business trip, or airport transfer, our professional drivers and premium fleet ensure a seamless and unforgettable experience.
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Learn More
            </button>
          </div>
          {/* Right Side: Image */}
          <div className="md:w-1/2 mt-6 md:mt-0">
            <img
              src="https://via.placeholder.com/500x300"
              alt="About Us"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutUs;