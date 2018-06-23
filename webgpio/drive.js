if (process.env.NODE_ENV === 'dev'){
    module.exports = {
        setState: s => s
    };
    return;
}

const gon = require('./ngpio');

const gleft = gon.createOutGpio(5);
const gright = gon.createOutGpio(6);
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
function drive() {

  setTimeout(drive, 1000);
  switch(curState) {
      case states.stop:
          gleft.goff();
          gright.goff();
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
          gright.gon();
          gleft.gon();
          break;
  }
}
drive();
module.exports = {
    states,
    setState: s => curState = s
};
