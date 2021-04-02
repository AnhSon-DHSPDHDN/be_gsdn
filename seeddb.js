const bcript = require('bcryptjs')
const Users = require('./models/Users')

const mongoose = require('mongoose');
const Role = require('./models/Role');
require('dotenv/config')

const userSeeds = [
  {
    username: "admin",
    password: bcript.hashSync("123456", 10),
    email: "admin@gmai.com",
    _idRole: "admin"
  }
]
const roleSeeds = [
  {
    _id: "admin",
    name: "admin"
  },
  {
    _id: "user",
    name: "user"
  }
]

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const main = async () => {
  console.log("seeded usesssr")
  try {
    for await (const userSeed of userSeeds) {
      console.log(userSeed);
      const user = new Users(userSeed);
      await user.save();
    }
    console.log("seeded user");
    for await (const roleSeed of roleSeeds) {
      const role = new Role(roleSeed);
      await role.save()
    }
  } catch (error) {
    console.log(error);
  }
  process.exit(0)
}

main();

// return
