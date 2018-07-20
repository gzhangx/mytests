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

const p6 = ng.createOutGpio(13);
//p6.goff();
p6.gon();
