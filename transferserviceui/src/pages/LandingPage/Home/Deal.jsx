// src/Home/Deal.jsx
const Deal = () => {
    return (
      <section className="py-12 px-4 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-4">Only Today $75/day</h2>
        <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-2">Cadillac Escalade</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Seats for 6 to 7 passengers</li>
              <li>Wi-Fi & Optic Cable</li>
              <li>Multiple Design Choices</li>
              <li>Best-in-class fuel economy</li>
            </ul>
            <button className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600">Reserve Now</button>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <img src="https://via.placeholder.com/300" alt="Cadillac Escalade" className="w-full rounded-lg" />
          </div>
        </div>
      </section>
    );
  };
  
  export default Deal;