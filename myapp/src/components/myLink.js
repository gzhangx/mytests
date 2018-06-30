import React from 'react';
import gpio from '../api/gpio';


export default function MyLink(props) {
    return <button onClick={()=>{
        console.log(props.text)
        return gpio.drive(props.text);
    }
    }>{props.text}</button>
}
