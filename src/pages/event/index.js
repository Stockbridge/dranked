import React, {Component} from 'react'
import Header from '../../modules/header'

class EventHome extends Component {
  render() {
    return (
        <div id="eventHome" data-eventId={this.props.match.params.eventId}>
            <Header />
            <div className="main-body">
                <div className="container">
                    <p>Event {this.props.match.params.eventId} Home Page</p>
                </div>
            </div>
        </div>
    );
  }
}

export default EventHome;
