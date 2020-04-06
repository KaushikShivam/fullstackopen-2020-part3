require('dotenv').config();

const express = require('express');
const app = express();
const uuid = require('uuid/v4');
const morgan = require('morgan');

const Person = require('./models/person');

app.use(express.json());

// morgan
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :response-time ms - :body'));

app.use(express.static('build'));

let persons = [
  {
    name: 'Arto Hellas',
    number: '982939393',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '5353453453',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '3534534534',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '4535345343',
    id: 4,
  },
];

app.get('/info', (req, res) => {
  res
    .status(200)
    .send(
      `<p>Phonebook has info for ${
        persons.length
      } people.</p><p>${new Date()}</p>`
    );
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons.map((person) => person.toJSON()));
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person.toJSON());
  });
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      error: 'name/number missing',
    });
  }

  Person.create({
    name,
    number,
  }).then((newPerson) => {
    res.status(201).json(newPerson);
  });
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id * 1;
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
