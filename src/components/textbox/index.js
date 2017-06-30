import React from 'react';
import './styles.css';

export const TextBox = (props) => {
  return (
    <div className="textbox">
      <label className="textbox__label" htmlFor={props.id}>{props.label}</label>
      <input className="textbox__input" type="text" id={props.id} name={props.id} />
    </div>
  )
};
