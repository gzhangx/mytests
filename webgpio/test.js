const rpio = require('rpio');
rpio.init({
        gpiomem: false,          /* Use /dev/gpiomem */
        mapping: 'gpio',    /* Use the P1-P40 numbering scheme gpio or physical */
        mock: undefined,        /* Emulate specific hardware in mock mode */
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

