import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header with Negative Margin */}
      <header className="bg-gray-800 text-white py-8 px-6 shadow-lg rounded-b-xl -mt-[25px]">
      <div className="max-w-7xl mx-auto text-center">
  <h1 className="text-4xl font-bold tracking-tight">About Us</h1>
  <p className="mt-2 text-lg opacity-90">
    Discover who we are and what drives us.
  </p>
</div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Company Overview */}
        <section className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100 mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 tracking-tight">
            Our Story
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Paris Easy Move was founded in 2020 with a vision to simplify
            navigation and exploration in the beautiful city of Paris. We began
            as a small team passionate about technology and travel, aiming to
            provide innovative tools like real-time traffic updates and
            immersive street views. Today, we’re a growing company dedicated to
            enhancing your Parisian experience with cutting-edge solutions.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-6">
            Our commitment to excellence drives us to continuously improve our
            services, ensuring that locals and tourists alike can move through
            Paris with ease and confidence.
          </p>
        </section>

        {/* Mission and Vision */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              To empower people with intuitive, reliable, and innovative tools
              that make navigating Paris seamless, enjoyable, and efficient.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">
              Our Vision
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              To be the leading provider of navigation and exploration solutions
              in Paris, blending technology with the city’s rich culture and
              history.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16 px-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-semibold mb-6 tracking-tight">
            Ready to Explore Paris with Us?
          </h2>
          <p className="text-gray-200 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of users who trust Paris Easy Move for their
            navigation needs. Contact us or try our tools today!
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="/contact-us"
              className="inline-block bg-white text-gray-800 py-4 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;