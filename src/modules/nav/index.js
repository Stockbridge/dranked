import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/event">Event</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
