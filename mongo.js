const mongoose = require('mongoose');

if (process.argv.length < 3) {
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://shivamkaushik91:${password}@cluster0-9jygl.mongodb.net/phonebook-app?retryWrites=true&w=majority
`;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected'));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (!name || !number) {
  // Fetch all people when only password is given
  Person.find({}).then((res) => {
    console.log('Phonebook:');
    res.forEach(({ name, number }) => console.log(`${name} ${number}`));
    mongoose.connection.close();
  });
} else {
  // 1. Create person

  const person = new Person({
    name,
    number,
  });

  person.save().then((response) => {
    const { name, number } = response;
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
