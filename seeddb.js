const bcript = require('bcryptjs')
const Users = require('./models/Users')

const mongoose = require('mongoose');
require('dotenv/config')

const userSeeds = [
  {
    _id: new mongoose.Types.ObjectId,
    username: "admin",
    password: bcript.hashSync("123456", 10),
    email: "admin@gmai.com"
  }
]

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const main = async () => {
  console.log("seeded usesssr");

  try {
    for await (const userSeed of userSeeds) {
      console.log(userSeed);
      const user = new Users(userSeed);
      await user.save();
    }
    console.log("seeded user");
  } catch (error) {
    console.log(error);
  }
  process.exit(0)
}

main();

// return
