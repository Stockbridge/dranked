import React, {Component} from 'react'
import Header from '../../modules/header'

class Home extends Component {
  render() {
    return (
        <div id="home">
            <Header />
            <div className="main-body">
              <div className="container">
                <p>Home Page</p>
              </div>
            </div>
        </div>
    );
  }
}

export default Home;
