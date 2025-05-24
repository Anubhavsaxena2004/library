// src/BookList.js (existing file mein add karein)

import React, { useState } from 'react';
import axios from 'axios';

function BookList() {
  const [formData, setFormData] = useState({
    user: 'anubhav',  // Default value
    book: 1,          // Only available book
    issued_date: '',
    return_date: ''
  });

  const handleIssueBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/issued/', formData);
      alert("Book issued successfully!");
    } catch (error) {
      alert(`Error: ${error.response?.data?.details || error.message}`);
    }
  };

  return (
    <div>
      <h2>Issue New Book</h2>
      <form onSubmit={handleIssueBook}>
        {/* User Dropdown */}
        <select 
          value={formData.user}
          onChange={(e) => setFormData({...formData, user: e.target.value})}
        >
          <option value="anubhav">anubhav</option>
          <option value="shubham">shubham</option>
          <option value="Anubhav_Saxena">Anubhav_Saxena</option>
          <option value="anubhavsaxena">anubhavsaxena</option>
        </select>

        {/* Book Selection (only 1 book available) */}
        <div>Book: sl arora (ID: 1)</div>
        <input type="hidden" value="1" />

        {/* Dates */}
        <input
          type="date"
          onChange={(e) => setFormData({...formData, issued_date: e.target.value})}
        />
        <input
          type="date"
          onChange={(e) => setFormData({...formData, return_date: e.target.value})}
        />

        <button type="submit">Issue Book</button>
      </form>
    </div>
  );
}

export default BookList;