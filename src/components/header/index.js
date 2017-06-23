import React, { Component } from 'react';
import Logo from '../../svgs/logo.js';
import Nav from '../nav';
import './styles.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header-container">
          <div className="nav-container">
            <Nav />
          </div>
          <div className="logo-container">
            <Logo />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
