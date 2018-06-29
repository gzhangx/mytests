import React, { Component } from 'react';
import request from 'superagent';
import ReactCursorPosition from 'react-cursor-position';
import get from 'lodash/get';
import './area.css';

function YourComponentOne(props) {

  return <div class="flex-container">
      <span margin="5">{get(props,'position.x')}</span>
      <span margin="5">{get(props,'position.y')}</span>
      <span margin="5">{get(props,'isActive')}</span>
  </div>
}
export default function MyArea() {
  return <ReactCursorPosition>
    <YourComponentOne/>
  </ReactCursorPosition>
}
