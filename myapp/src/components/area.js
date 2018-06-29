import React, { Component } from 'react';
import request from 'superagent';
import ReactCursorPosition from 'react-cursor-position';
import get from 'lodash/get';
import './area.css';

function YourComponentOne(props) {
    const centerX = 200;
    const centerY = 200;
    const x = get(props,'position.x')- centerX;
    const y = get(props,'position.y')- centerY;
    const lr = x > 50? 'right' : x<-50?'left':'center';
    const fs = y > 50? 'foward' :'stop';
  return <div class="flex-container">
          <span margin="5">{get(props,'position.x')}</span>
          <span margin="5">{get(props,'position.y')}</span>
          <span margin="5">{get(props,'isActive')}</span>
          <span margin="5">{ lr}</span>
            <span margin="5">{fs}</span>
      </div>;
}
export default function MyArea() {
  return <div className="flex-outer-container">
    <ReactCursorPosition>
        <YourComponentOne/>
    </ReactCursorPosition>
  </div>
}
