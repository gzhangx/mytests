const restify = require('restify');

const server = restify.createServer();
server.use(restify.plugins.queryParser());
server.get('/', (req, res, next)=>{
  res.send('OK V1.0');
});

server.get('/onoff/:who/:onoff', (req,res,next)=>{
  res.send(req.params);
});
server.listen(8080, ()=>{});
