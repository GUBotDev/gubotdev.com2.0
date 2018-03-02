const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

const mongojs = require('mongojs');
const db = mongojs('projectside', ['projects']);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
  res.send('Please use /api/projects');
});

// Get projects - GET
app.get('/api/projects', (req, res, next) => {
  db.projects.find().sort({id:1}, (err, projects) => {
    if(err){
      res.send(err);
    }
    res.json(projects);
  });
});

// Add project - POST
app.post('/api/projects', (req, res, next) => {
  db.projects.insert(req.body, (err, project) => {
    if(err){
      res.send(err);
    }
    res.json(project);
  });
});

// Update project - PUT
app.put('/api/projects/:id', (req, res, next) => {
  const id = req.params.id;
  db.projects.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {
      $set: {
        name: req.body.name,
        type: req.body.type,
        img: req.body.img
      }},
      new: true
    }, (err, project) => {
      res.json(project);
    });
});

// Delete project - Delete
app.delete('/api/project/:id', (req, res, next) => {
  const id = req.params.id;
  db.projects.remove({_id: mongojs.ObjectId(id)}, (err, project) => {
    if(err){
      res.send(err);
    }
    res.json(project);
  });
});

app.listen(port, () => {
  console.log('Server started on port '+port);
});
