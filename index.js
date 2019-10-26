/** 
 * Importando o Express
 */
const express = require('express');

/** 
 * Importando o Express
 */
const server = express(); 

server.use(express.json());

const projects = [];

/** 
 * Middleware para verificar se o projeto com determinado ID existe.
 */
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find( p => p.id == id);
  
  if(!project){
    return res.status(400).json( { error: 'Project is not exist'} );
  }

  return next();
}
/** 
 * Middleware, que da log no número de requisições.
 */
function logRequisitions(req, res, next) {

  console.count('Number of Requests');

  return next();
}

server.use(logRequisitions);

/**
 * Retorna todos os projetos 
 */
server.get('/projects', (req,res) => {
  return res.json(projects);
})

/**
 * Cadastra um novo projeto 
 */
server.post('/projects', (req, res) => {
  const {id, title} = req.body;
  
  const project = {
    id,
    title,
    tasks:[]
  }
  
  projects.push(project);
  return res.json(projects);
})

/**
 * Altera o titulo do projeto através do ID 
 */
server.put('/projects/:id', checkProjectExists, (req, res) => {
   const {id} = req.params;
   const {title} = req.body;

   projects[id] = title;

   return res.json(projects);
})

/**
 * Deleta o projeto através do ID
 */
server.delete('/projects/:id',checkProjectExists, (req, res) => {
   const {id} = req.params;
  
   projects.splice(id, 1);

   return res.json(projects);
})

/**
 * Adiciona uma nova tarefa em um projeto através do ID.
 */
server.post('/projects/:id/tasks',checkProjectExists, (req, res)=>{
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find( p => p.id == id );
    project.tasks.push( title );

    return res.json( project );

  });



server.listen(3000);

