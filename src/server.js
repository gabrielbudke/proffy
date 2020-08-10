const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages');

const server = express();

nunjucks.configure('src/views', {
   express: server,
   noCache: true, 
}); 

server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));

server.get('/', pageLanding);
server.get('/study', pageStudy);
server.get('/give-classes', pageGiveClasses);
server.post('/save-class', saveClasses);

server.listen(5500, () => 
   console.log('[server] Server listening port 5500'));