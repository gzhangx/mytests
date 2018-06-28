const Gpio = require('onoff').Gpio;


function createOutGpio(who){
  const created = new Gpio(who, 'out');
  function onoff(v){
    created.writeSync(v);
  }
  onoff(1);
  return {
    gpio: created,
    gon: ()=>onoff(0),
    goff: ()=>onoff(1),
    end: ()=>created.unexport()
  }
}

module.exports= {
  createOutGpio
}
