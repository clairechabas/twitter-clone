import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => (
  <div className="home-hero">
    <h1>What's happening?</h1>
    <h4>New to Twitter Clone?</h4>
    <Link to="/signup" className="btn btn-primary">Signup here</Link>
  </div>
);

export default Homepage;
