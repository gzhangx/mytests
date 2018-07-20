if (process.env.NODE_ENV === 'dev'){
    module.exports = {
        setState: s => s
    };
    return;
}

const gon = require('./ngpio');

const driveLeft = gon.createOutGpio(5);
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
    const step = 10;
    const ret = parseInt(driveParam.y/step);
    if (isNaN(ret)) return def;
    return ret;
}
async function onDrive(driver, sign = 1) {

    const maxY = 10;
    const maxX = 10;
    const steppedX = calcStep(driveParam.x) * sign;
    const steppedY = calcStep(driveParam.y, maxY + 1);
    console.log(`${sign} stepped ${steppedX}/${steppedY}`);
    if(steppedY > maxY || steppedX > maxX) {
        console.log(`off for ${sign}`);
        driver.goff();
        return;
    }
    if (steppedX <= 0 && steppedY <= 0) {
        console.log(`on for ${sign}`);
        driver.gon();
        return;
    }

    const xSleep = steppedX < 0? 0 : steppedX;
    driver.gon();
    await sleep(maxY - steppedY - xSleep);
    driver.goff();
    await sleep(steppedY + xSleep);
}
async function drive() {
    while(true) {
        await sleep(1);
        await onDrive(driveLeft, -1);
    }
}
drive();
module.exports = {
    setSteering: prm=>{
        driveParam.x = parseFloat(prm.x);
        driveParam.y = parseFloat(prm.y);
    }
};
