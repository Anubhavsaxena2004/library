import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './BookList';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><BookList /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;