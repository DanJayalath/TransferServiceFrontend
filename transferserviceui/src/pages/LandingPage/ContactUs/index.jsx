// src/Home/ContactUs.jsx
const ContactUs = () => {
    return (
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Contact Form */}
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-600 mb-1">Message</label>
                  <textarea
                    id="message"
                    placeholder="Your Message"
                    rows="4"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                  Send Message
                </button>
              </form>
            </div>
            {/* Contact Information */}
            <div className="md:w-1/2 flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-4">Our Contact Details</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                  <span className="mr-2">📍</span> 123 Luxury Lane, New York, NY 10001
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📞</span> +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✉️</span> info@limo5.com
                </li>
                <li className="flex items-center">
                  <span className="mr-2">⏰</span> Mon - Fri: 9 AM - 6 PM
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default ContactUs;