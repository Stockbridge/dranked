import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './css/variables.css';
import './css/reset.css';
import './css/main.css';

import Home from './pages/home';
import EventHome from './pages/event';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/event" component={EventHome}/>
        </div>
      </Router>
    );
  }
}

export default App;
