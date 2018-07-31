if (process.env.NODE_ENV === 'dev'){
    module.exports = {
        setState: s => s
    };
    return;
}

const gon = require('./ngpio');

const driveLeft = gon.createOutGpio(5);
const driveRight = gon.createOutGpio(6);
//const steering = gon.createPWM();

//let curDir = 100;
//steering.setPwm(curDir);
//steering.setPwm(curDir);

function sleep(ms) {
    if (ms < 0) {
        return Promise.resolve();
    }
    return new Promise(resolve=>{
        setTimeout(resolve, ms);
    });
}

const driveParam = {};
function calcStep(v, def = 0) {
    const step = 20;
    const ret = parseInt(v/step);
    if (isNaN(ret)) return def;
    return ret;
}

const oldStepValLst = {'1':{},'-1':{}};
async function onDrive(driver, sign = 1) {

    const maxY = 10;
    const maxX = 10;
    const steppedX = calcStep(driveParam.x) * sign;
    const steppedY = calcStep(driveParam.y, maxY + 1);

    const oldStepVal = oldStepValLst[sign.toString()];
    const changed = oldStepVal.x != steppedX || oldStepVal.y != steppedY;
    //if (changed) console.log(`${sign} stepped ${steppedX}/${steppedY} old ${oldStepVal.x} ${oldStepVal.y}`);
    oldStepVal.x = steppedX;
    oldStepVal.y = steppedY;

    const xSleep = steppedX < 0? 0 : steppedX;
    const onSleep = maxY - steppedY - xSleep;
    if (onSleep > 0) {
        driver.gon();
        await sleep(onSleep);
    }

    const offSleep = steppedY + xSleep;
    if (offSleep > 0) {
        driver.goff();
        await sleep(offSleep);
    }
    if (onSleep != oldStepVal.onSleep || offSleep != oldStepVal.offSleep) {
        console.log(`${sign} onSleep ${onSleep} offSleep ${offSleep}`);
        oldStepVal.onSleep = onSleep;
        oldStepVal.offSleep = offSleep;
    }
}
async function drive() {
    while(true) {
        await sleep(1);
        await onDrive(driveLeft, -1);
        await onDrive(driveRight, 1);
    }
}
drive();
module.exports = {
    setSteering: prm=>{
        driveParam.x = parseFloat(prm.x);
        driveParam.y = parseFloat(prm.y);
    }
};
