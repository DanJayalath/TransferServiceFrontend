// src/Home/TripAdvisorReviews.jsx
import React from 'react';
import { FaStar } from 'react-icons/fa'; // Import star icon

const TripAdvisorReviews = () => {
  const reviews = [
    {
      name: 'Claudine Jackson',
      date: 'August 27, 2020',
      rating: 5,
      text: 'Amazing customer support and fantastic product to showcase your reviews on your website. Highly recommend.',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      name: 'Brian Walton',
      date: 'August 8, 2020',
      rating: 5,
      text: 'Good solution, happy to be Trustindex Pro user. Was really easy to integrate the widget to my WordPress website. Support working good.',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      name: 'Nicholas Aldridge',
      date: 'July 31, 2020',
      rating: 5,
      text: 'The graphics are crisp, tagging helps conveniently categorize and filter reviews, the software is intuitive and easy to use.',
      avatar: 'https://via.placeholder.com/40',
    },
  ];

  return (
    <section className="py-16 bg-white w-full px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black text-center">
          Tripadvisor reviews!
        </h2>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Navigation Arrows (Static for now) */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-8">
          <button className="bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-300 transition duration-300">
            &lt;
          </button>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-8">
          <button className="bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-300 transition duration-300">
            &gt;
          </button>
        </div>

        {/* Review Cards */}
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-6 flex flex-col space-y-4 shadow-md"
          >
            {/* User Info */}
            <div className="flex items-center space-x-3">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-black font-semibold">{review.name}</h4>
                <p className="text-gray-500 text-sm">{review.date}</p>
              </div>
            </div>
            {/* Rating */}
            <div className="flex space-x-1">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} className="text-green-500" />
              ))}
            </div>
            {/* Review Text */}
            <p className="text-gray-600 text-sm">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TripAdvisorReviews;