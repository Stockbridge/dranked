import React, {Component} from 'react'
import Header from '../../components/header'
import ItemContainer from '../../containers/itemContainer';

class Home extends Component {
  render() {
    return (
        <main id="home">
            <Header />
            <div className="main-body">
              <div className="container">
                <p>Home Page</p>
                <ItemContainer />
              </div>
            </div>
        </main>
    );
  }
}

export default Home;
