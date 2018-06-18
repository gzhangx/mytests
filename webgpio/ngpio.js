const Gpio = require('onoff').Gpio;


function createOutGpio(who){
  const created = new Gpio(who, 'out');
  return {
    gpio: created,
    gon: ()=>created.writeSync(1),
    goff: ()=>created.writeSync(0),
    end: ()=>created.unexport()
  }
}

module.exports= {
  createOutGpio
}
