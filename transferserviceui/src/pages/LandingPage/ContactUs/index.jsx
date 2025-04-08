import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus("Submitting...");
    setTimeout(() => {
      setFormStatus("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-gray-800 text-white py-8 px-6 shadow-lg rounded-b-xl -mt-[25px] flex justify-center items-center flex-col text-center">
  <h1 className="text-3xl font-semibold tracking-wide">Contact Us</h1>
  <p className="mt-1 text-md opacity-80">
    We’re here to assist you. Reach out today!
  </p>
</header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <section className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                  placeholder="Enter the subject"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
                  placeholder="Write your message here"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition-all font-medium shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
              {formStatus && (
                <p
                  className={`text-sm text-center ${
                    formStatus.includes("Thank")
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {formStatus}
                </p>
              )}
            </form>
          </section>

          {/* Contact Info and Map */}
          <section className="lg:col-span-1 space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Address:</span>{" "}
                  123 Rue de Paris, 75001 Paris, France
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Phone:</span>{" "}
                  +33 1 23 45 67 89
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Email:</span>{" "}
                  support@pariseasymove.com
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-800">Hours:</span>{" "}
                  Mon-Fri, 9:00 AM - 6:00 PM
                </p>
              </div>
              {/* Social Media Links */}
              <div className="mt-6 flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-1.337-.478-2.25-1.672-2.25-.912 0-1.455.614-1.695 1.207-.087.213-.109.426-.109.639v6.008h-3v-11h3v1.542c.435-.669 1.217-1.625 2.967-1.625 2.177 0 3.809 1.422 3.809 4.478v6.605z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Our Location
              </h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991625803693!2d2.350987315674!3d48.856614079287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                How can I reach your support team?
              </h3>
              <p className="text-gray-600 mt-1">
                You can contact us via email at support@pariseasymove.com, call
                us at +33 1 23 45 67 89, or use the form above.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                What are your operating hours?
              </h3>
              <p className="text-gray-600 mt-1">
                We’re available Monday to Friday, 9:00 AM to 6:00 PM (CET).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                Do you offer customer support in multiple languages?
              </h3>
              <p className="text-gray-600 mt-1">
                Yes, we provide support in English, French, and Spanish.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactUs;