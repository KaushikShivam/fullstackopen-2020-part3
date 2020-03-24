const express = require('express');
const app = express();

const persons = [
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
