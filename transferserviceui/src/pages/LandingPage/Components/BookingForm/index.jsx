// src/components/BookingForm.jsx
const BookingForm = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Open Fleet</h2>
        <div className="space-y-4">
          <select className="w-full p-2 border rounded">
            <option>Distance</option>
          </select>
          <input type="text" placeholder="Pick Up Address" className="w-full p-2 border rounded" />
          <input type="text" placeholder="Drop Off Address" className="w-full p-2 border rounded" />
          <input type="date" className="w-full p-2 border rounded" />
          <input type="time" className="w-full p-2 border rounded" />
          <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Book Now</button>
        </div>
      </div>
    );
  };
  
  export default BookingForm;