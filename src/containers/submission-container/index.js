import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as itemActions from '../../actions/itemActions';
import SubmissionList from '../../components/submission-list';
import SubmissionForm from '../../components/submission-form';

class SubmissionContainer extends Component {
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
        <SubmissionForm submitItem={this.props.actions.submitItem} />
        <SubmissionList submittedItems={submittedItems} />
      </div>
    );
  }
}

SubmissionContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionContainer);