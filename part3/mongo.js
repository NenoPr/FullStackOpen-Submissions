const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide the database password");
  process.exit(1);
}
const password = process.argv[2];

const url = `mongodb+srv://neno:${password}@cluster0.br8qpxw.mongodb.net/`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  console.log("phonebook:");
  Person.find({})
    .then((persons) => {
      persons.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
    })
    .then(() => mongoose.connection.close());
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({ name, number });
  person.save().then((result) => {
    console.log(`added ${result.name} ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
