import React, {Component} from 'react'
import Header from '../../modules/header'

class EventHome extends Component {
  render() {
    return (
        <div id="eventHome" data-eventId={this.props.match.params.eventId}>
            <Header />
            <section className="main-body">
                <section className="container">
                    <p>Event {this.props.match.params.eventId} Home Page</p>
                </section>
                
                <section className="container">
                    {/* AnonymousItem : { 
                        voted: boolean, 
                        assignedNumber: int, 
                        voteValues: { 
                            rating: int, 
                            ...userDefinedFields 
                        }  
                    } */}
                    {/* Item : { 
                        voted: boolean, 
                        assignedNumber: int, 
                        voteValues: { 
                            rating: int, 
                            ...userDefinedFields 
                        }, 
                        actualValues: { 
                            ...userDefinedFields 
                        } 
                    } */}
                </section>
            </section>
        </div>
    );
  }
}

export default EventHome;
