import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '../css/variables.css';
import '../css/reset.css';
import '../css/main.css';

import Home from '../routes/home';
import EventHome from '../routes/event';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/event/:eventId" component={EventHome} />
        </div>
      </Router>
    );
  }
}

export default App;
