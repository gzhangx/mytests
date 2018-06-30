import request from "superagent";

const baseUrl = 'http://192.168.168.100:8080';

function drive(v) {
    return request.get(`${baseUrl}/onoff/${v}`).then(res=>{
        console.log(res);
    });
}

function steer(v) {
    return request.get(`${baseUrl}/steer/${v}`).then(res=>{
        console.log(res);
    });
}

export default {
    drive,
    steer
};