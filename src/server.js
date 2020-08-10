const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const { pageLanding, pageStudy, pageGiveClasses } = require('./pages');

const server = express();

nunjucks.configure('src/views', {
   express: server,
   noCache: true, 
}); 

server.use(express.static('public'));

server.get('/', pageLanding);
server.get('/study', pageStudy);
server.get('/give-classes', pageGiveClasses);

server.listen(5500, () => 
   console.log('[server] Server listening port 5500'));