import React, { Component } from 'react';
import request from 'superagent';


export default function MyLink(props) {
    return <button onClick={()=>{
        console.log(props.text)
        return request.get(`http://localhost:8080/onoff/${props.text}`).then(res=>{
           console.log(res);
        });
    }
    }>{props.text}</button>
}