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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
