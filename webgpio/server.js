const restify = require('restify');

const server = restify.createServer();
const {states, setState} = require('./drive');
server.use(restify.plugins.queryParser());
server.get('/', (req, res, next)=>{
  res.header('content-type','text/html');
  res.contentType = 'text/html';
  res.sendRaw('OK V1.0 <a href="/onoff/forward">forward</a><br>' +
      '<a href="/onoff/left">left</a><br>' +
      '<a href="/onoff/right">right</a><br>' +
      '<a href="/onoff/stop">stop</a><br>');
  //res.sendRaw('test');
});

server.get('/onoff/:what', (req,res,next)=>{
  res.send(req.params);
  setState(req.params.what);
});
server.listen(8080, ()=>{});
