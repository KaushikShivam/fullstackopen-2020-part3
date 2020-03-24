const express = require('express');
const app = express();
const uuid = require('uuid/v4');

app.use(express.json());

let persons = [
  {
    name: 'Arto Hellas',
    number: '982939393',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '5353453453',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '3534534534',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '4535345343',
    id: 4
  }
];

app.get('/api/persons', (req, res) => {
  res.status(200).json(persons);
});

app.get('/info', (req, res) => {
  res
    .status(200)
    .send(
      `<p>Phonebook has info for ${
        persons.length
      } people.</p><p>${new Date()}</p>`
    );
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id * 1;
  const person = persons.find(el => el.id === id);
  if (person) {
    res.status(200).json(person);
  } else {
    res.status(400).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id * 1;
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;
  const newPerson = {
    name,
    number,
    id: uuid() // used uuid instead of Math.random for more robustness
  };
  persons = [...persons, newPerson];

  res.status(201).json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
