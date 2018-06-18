const gon = require('./ngpio');

const g5 = gon.createOutGpio(5);

g5.gon();

setTimeout(()=>{
  g5.goff();
  g5.end();
}, 5000);
