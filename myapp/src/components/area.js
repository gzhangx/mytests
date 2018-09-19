import React from 'react';
import ReactCursorPosition from 'react-cursor-position';
import get from 'lodash/get';
import './area.css';
import gpio from '../api/gpio';

function YourComponentOne(props) {
    const centerX = 200;
    const centerY = 200;
    const x = get(props,'position.x')- centerX;
    const y = get(props,'position.y');
    console.log(`${x} ${y}`);

    gpio.steer(x,y);
    //gpio.drive(fs);
  return <div class="flex-container">
          <span margin="5">{get(props,'position.x')}</span>
          <span margin="5">{get(props,'position.y')}</span>
          <span margin="5">{get(props,'isActive')}</span>
      </div>;
}
export default function MyArea() {
  return <div className="flex-outer-container">
    <ReactCursorPosition>
        <YourComponentOne/>
    </ReactCursorPosition>
  </div>
}
