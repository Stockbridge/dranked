import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as itemActions from '../actions/itemActions';
import ItemList from '../components/ItemList';
import SubmitForm from '../components/SubmitForm';

class ItemContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submittedItems: []
    };
  }

  render() {
    const {submittedItems} = this.props;

    return (
      <div>
        <SubmitForm submitItem={this.props.actions.submitItem} />
        <ItemList submittedItems={submittedItems} />
      </div>
    );
  }
}

ItemContainer.propTypes = {
  submittedItems: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
  return {
    submittedItems: state.submittedItems
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(itemActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);