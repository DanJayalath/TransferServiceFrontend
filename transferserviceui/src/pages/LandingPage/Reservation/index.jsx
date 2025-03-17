import React, { useState } from "react";

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Reservation confirmed for ${formData.name} on ${formData.date} at ${formData.time}`);
  };

  return (
    <div style={{ textAlign: "center", maxWidth: "400px", margin: "auto" }}>
      <h2>Reservation Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Date:</label><br />
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Time:</label><br />
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </div>
        <button type="submit">Confirm Reservation</button>
      </form>
    </div>
  );
};

export default ReservationPage;
