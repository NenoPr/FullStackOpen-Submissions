require("dotenv").config();

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use(express.static(path.join(__dirname, "dist")));

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token("body", (request) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  }
  return "";
});

app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body"),
);

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch(next);
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "name missing" });
  }
  if (!body.number) {
    return response.status(400).json({ error: "missing number" });
  }

  // persons.map((person) => {
  //   if (person.name === body.name) {
  //     return response
  //       .status(400)
  //       .json({ error: "the name already exists in phonebook" });
  //   }
  // });

  const person = new Person({
    // id: String(Math.floor(Math.random() * 10000)),
    name: body.name,
    number: body.number,
  });

  // persons = persons.concat(person);
  // response.json(person);
  person
    .save()
    .then((savedPerson) => {
      response.status(201).json(savedPerson);
    })
    .catch(next);
  console.log(persons, person);
});

app.get("/info", (request, response) => {
  response.send(
    `<div>
      <div>Phonebook has info for ${persons.length} people</div>
      <br />
      <div>${new Date()}</div>
    </div>`,
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  // persons = persons.filter((person) => person.id !== id);

  Person.findByIdAndDelete(id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);
