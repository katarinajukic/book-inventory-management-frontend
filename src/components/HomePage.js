import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="container-home">
        <h1 className="app-name">Welcome to our online library!</h1>
        <div className="button-container-home">
          <Link to="/login" className="button-home">Login</Link>
          <Link to="/register" className="button-home">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;