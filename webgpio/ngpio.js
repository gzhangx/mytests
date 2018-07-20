const rpio = require('rpio');
rpio.init({
    gpiomem: false,          /* Use /dev/gpiomem */
    mapping: 'gpio',    /* Use the P1-P40 numbering scheme gpio or physical */
    mock: undefined,        /* Emulate specific hardware in mock mode */
});
console.log('rpio inited');

function createPWM(pwmp=12) {
    rpio.open(pwmp, rpio.PWM);
    rpio.pwmSetClockDivider(256);
    rpio.pwmSetRange(pwmp, 1024);
    return {
        setPwm: v => rpio.pwmSetData(pwmp, v),
        end: ()=>rpio.reset(pwmp)
    };
}

function createOutGpio(who) {
    rpio.open(who, rpio.OUTPUT, rpio.HIGH);

    function onoff(v) {
        rpio.write(who, v);
    }

    return {
        goff: () => onoff(rpio.LOW),
        gon: () => onoff(rpio.HIGH),
        end: () => rpio.reset(who)
    }
}

module.exports= {
    createOutGpio,
    createPWM
};
