const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());
// app.use(morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms',
//       JSON.stringify(req.body)
//   ].join(' ')
// }));

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
];

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;
  if (name == null || number == null) {
    return res.status(400).json({ error: 'name and/or number are missing'});
  } else if ( name.trim() === '' || number.trim() === '') {
    return res.status(400).json({ error: 'name and/or number are missing'});
  } else if (persons.find(p => p.name === name.trim()) !== undefined) {
    return res.status(400).json({ error: 'there is already an entry with this name'});
  }
  const id = Math.floor(Math.random() * 10000000);
  const person = { name, number, id };
  persons.push(person);
  res.json(person);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    res.json(person);
  }
  else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    persons = persons.filter(person => person.id !== id);
    res.status(204).end(); // 204 === No Content (request succeeded but client doesn't need to navigate away from page)
  }   
  else {
    res.status(404).end();
  }
});

app.get('/info', (req, res) => {
  const html = `<p>There are ${persons.length} people in the phone book</p><p>${new Date()}</p>`;
  res.send(html);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
