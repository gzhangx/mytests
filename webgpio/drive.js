if (process.env.NODE_ENV === 'dev'){
    module.exports = {
        setState: s => s
    };
    return;
}

const gon = require('./ngpio');

const driveF = gon.createOutGpio(5);
const steering = gon.createPWM();
//const gright = gon.createOutGpio(6);
//g5.gon();

//setTimeout(()=>{
//  g5.goff();
//  g5.end();
//}, 5000);

const states = {
  forward: 'forward',
    left:'left',
    right:'right',
    stop: 'stop'
};

let curState = states.stop;
let curDir = 100;

steering.setPwm(curDir);
function drive() {
    steering.setPwm(curDir);
    setTimeout(drive, 100);
    switch (curState) {
        case states.stop:
            driveF.goff();
            break;
        case states.left:
            gleft.gon();
            gright.goff();
            break;
        case states.right:
            gright.gon();
            gleft.goff();
            break;
        case states.forward:
            driveF.gon();
            break;
    }
}
drive();
module.exports = {
    states,
    setState: s => curState = s,
    setSteering: s=>{
        const v = parseInt(s);
        if (!isNaN(v)) {
            curDir = v;
        }
        if (curDir < 50) curDir = 50;
        if (curDir > 150) curDir = 150;
    }
};
