const restify = require('restify');
const ips = require('./net');
const server = restify.createServer();
const {states, setState, setSteering} = require('./drive');
console.log(ips.getIPs());

server.use(restify.plugins.queryParser());
server.use(
    function crossOrigin(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);

server.get('/version', (req, res, next)=>{
  res.header('content-type','text/html');
  res.contentType = 'text/html';
  res.sendRaw('OK V1.0 <a href="/onoff/forward">forward</a><br>' +
      '<a href="/onoff/left">left</a><br>' +
      '<a href="/onoff/right">right</a><br>' +
      '<a href="/onoff/stop">stop</a><br>');
  //res.sendRaw('test');
});

server.get('/steer/:x/:y', (req,res,next)=>{
    const {x,y} = req.params;
    //console.log(`steerin ${x} ${y}`);
    res.send(req.params);
    setSteering(req.params);
});

server.get('/*', restify.plugins.serveStatic({
directory:`${__dirname}/public`,
default:'index.html'
}));
server.listen(8080, ()=>{});
console.log('server on 8080');


