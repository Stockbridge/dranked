import React, {Component} from 'react'
import Header from '../../components/header'
import SubmissionContainer from '../../containers/submission-container';

class Home extends Component {
  render() {
    return (
        <main id="home">
            <Header />
            <div className="main-body">
              <div className="container">
                <p>Home Page</p>
                <SubmissionContainer />
              </div>
            </div>
        </main>
    );
  }
}

export default Home;
