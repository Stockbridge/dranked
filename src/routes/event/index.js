import React, {Component} from 'react'
import Header from '../../components/header'

class EventHome extends Component {
  render() {
    return (
        <main id="eventHome" data-eventId={this.props.match.params.eventId}>
            <Header />
            <section className="main-body">
                <section className="container">
                    <p>Event {this.props.match.params.eventId} Home Page</p>
                </section>
                
                <section className="container">
                    
                </section>
            </section>
        </main>
    );
  }
}

export default EventHome;
