import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './auth'; // Adjust the import path as necessary

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('access');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Library System</Link>
        <div className="navbar-nav">
          {isAuthenticated ? (
            <>
              <Link className="nav-link" to="/">Books</Link>
              <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;