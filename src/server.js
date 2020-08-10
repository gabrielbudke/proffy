const proffys = [
   {
      name: "Diego Fernandes",
      avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
      whatsapp: "47985476548", 
      bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiência. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
      subject: "Química", 
      cost: "20", 
      weekday: [
         0
      ], 
      time_from: [720], 
      time_to: [1220] 
   },
   {
      name: "Gabriel Sousa",
      avatar: "https://avatars3.githubusercontent.com/u/38558555?s=460&u=0aaf070c4610369334f28bc0ef86f2c8063302fb&v=4", 
      whatsapp: "47999001251", 
      bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiência. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
      subject: "Português", 
      cost: "35", 
      weekday: [
         1
      ], 
      time_from: [720], 
      time_to: [1220] 
   }
];

const subjects = [
   "Artes",
   "Biologia",
   "Ciências",
   "Educação Física",
   "Física",
   "Geografia",
   "História",
   "Matemática",
   "Português",
   "Química",
];

const weekdays = [
   "Domingo",
   "Segunda-feira",
   "Terça-feira",
   "Quarta-feira",
   "Quinta-feira",
   "Sexta-feira",
   "Sábado",
];

function getSubject(subjectNumber) {
   const position = +subjectNumber - 1;
   return subjects[position];
}

const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const server = express();

nunjucks.configure('src/views', {
   express: server,
   noCache: true, 
});

server.use(express.static('public'));

server.get('/', (request, response) => {
   return response.render('index.html');
});

server.get('/study', (request, response) => {
   const filters = request.query;
   return response.render('study.html', { proffys, filters, subjects, weekdays });
});

server.get('/give-classes', (request, response) => {
   const data = request.query;
   
   const isNotEmpty = Object.keys(data).length > 0;

   if(isNotEmpty) {

      data.subject = getSubject(data.subject);
      
      proffys.push(data);

      return response.redirect('/study');
   }

   return response.render('give-classes.html', { subjects, weekdays });
});

server.listen(5500, () => 
   console.log('[server] Server listening port 5500'));