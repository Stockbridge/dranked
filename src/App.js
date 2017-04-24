import React, { Component } from 'react';
import './css/variables.css';
import './css/reset.css';
import './css/main.css';

import Header from './modules/header';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="main-body">
          <section className="container">thing</section>
        </div>
      </div>
    );
  }
}

export default App;
