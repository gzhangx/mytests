/*
const rpio = require('rpio');
rpio.init({
        gpiomem: false,
        mapping: 'gpio',
        mock: undefined,
});
console.log('inited');
const p = 13;
{
console.log('ding ' +p);
rpio.open(p, rpio.OUTPUT, rpio.LOW);
rpio.write(p, rpio.HIGH);
rpio.sleep(1);
rpio.write(p, rpio.LOW);
}

const pwmp = 12;
rpio.open(pwmp, rpio.PWM);
rpio.pwmSetClockDivider(256);
rpio.pwmSetRange(pwmp, 1024);
rpio.pwmSetData(pwmp, 100);

*/

const ng = require('./ngpio');
//const p = ng.createPWM();
//p.setPwm(110);
function sleep(ms) {
  return new Promise(resolve=>{
    setTimeout(resolve, ms);
  });
}
const p6 = ng.createOutGpio(5);
async function test() {
  for(let i = 0; i < 100; i++){
    p6.goff();
    await sleep(1);
    p6.gon();
    await sleep(10);
  }
}

test().then(()=>{
  p6.gon();
});
