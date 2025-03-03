import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import MapView from './MapView.jsx';
import 'ol/ol.css';

function App() {
  const [formData, setFormData] = useState({ firstName: '', mobileNumber: '' });
  const [searchTerm, setSearchTerm] = useState(''); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search Term:', searchTerm);
    alert(`You searched for: ${searchTerm}`);
  };

  return (
    <Router>
      <nav className="bg-blue-200 p-4 text-white">
        <Link to="/OtterMapTask" className="text-white text-2xl">Home</Link> 
        <span className='text-2xl  p-2'>|</span>
         <Link to="/map" className="hover:text-white-200 text-2xl">Map</Link>
      </nav>
      <div className="container mx-auto p-4">

        <Routes>
          <Route
            path="/"
            element={
              <div className="max-w-md mx-auto mb-8">
                <form onSubmit={handleSearch} className="flex items-center p-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Search
                  </button>
                </form>
              <div className="max-w-md mx-auto bg-blue-100 p-8 rounded-lg shadow-lg ">
                <h1 className="text-2xl font-bold mb-6 text-center">Form</h1>
                <form onSubmit={handleSubmit} className="space-y-4 ">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Submit
                  </button>
                </form>
              </div>
              </div>
            }
          />
          <Route path="/map" element={<MapView name={formData.firstName} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;