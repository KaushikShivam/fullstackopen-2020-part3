/* eslint-disable no-undef */
require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')

const Person = require('./models/person')

app.use(express.json())

// morgan
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :response-time ms - :body'))

app.use(express.static('build'))

app.get('/info', (req, res) => {
  res
    .status(200)
    .send(
      `<p>Phonebook has info for ${
        persons.length
      } people.</p><p>${new Date()}</p>`
    )
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons.map((person) => person.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({
      error: 'name/number missing',
    })
  }

  Person.create({
    name,
    number,
  })
    .then((newPerson) => {
      res.status(201).json(newPerson)
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  const person = {
    name,
    number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson.toJSON())
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err))
})

// unhandled routes
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// global error handling middleware
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})
