import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { TextBox } from '../textbox';

class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmitFormClick = this.onSubmitFormClick.bind(this);
  }

  onSubmitFormClick() {
    const typeElement = document.getElementById('type');
    const nameElement = document.getElementById('name');

    this.props.submitItem({
      type: typeElement.value,
      name: nameElement.value
    });

    typeElement.value = "";
    nameElement.value = "";

    typeElement.focus();
  }

  render() {
    return (
      <div>
        <TextBox id="name" label="Brand" />
        <TextBox id="type" label="Style" />
        <button className="btn-primary" onClick={this.onSubmitFormClick}>Add Person</button>
      </div>
    );
  }
}

SubmitForm.propTypes = {
  submitItem: PropTypes.func.isRequired
};

export default SubmitForm;