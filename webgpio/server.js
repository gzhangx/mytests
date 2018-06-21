const restify = require('restify');

const server = restify.createServer();
server.use(restify.plugins.queryParser());
server.get('/', (req, res, next)=>{
  res.header('content-type','text/html');
  res.contentType = 'text/html';
  res.sendRaw('OK V1.0 <a href="/onoff/left/1">left on</a>');
  //res.sendRaw('test');
});

server.get('/onoff/:who/:onoff', (req,res,next)=>{
  res.send(req.params);
});
server.listen(8080, ()=>{});
