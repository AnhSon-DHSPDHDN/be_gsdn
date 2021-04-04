const bcript = require('bcryptjs')
const Users = require('./models/Users')

const mongoose = require('mongoose');
const Role = require('./models/Role');
const { uuid } = require('uuidv4');
const Teacher = require('./models/Teacher');
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
const teacherSeeds = [
  {
    _id: uuid(),
    avatar: `${process.env.BASE_BE}avatar/avatarSon1.jpg`,
    description: 'Sinh viên Đại học Sư phạm - Đại học Đà Nẵng',
    fullName: 'Trần Văn Anh Sơn 1',
    age: 22,
    address: 'Tiểu La - Hải Châu - Đà Nẵng',
    email: 'a@gmail.com',
    education: 'Đại học',
    phone: '0334965080',
    experience: '+1 Year developer at Acexis Company, 2 Month QC leader',
    subject: ['Toán', 'Lý', 'Hóa'],
    sex: true,
    salary: 1500000,
    createBy: 'admin'
  },
  {
    _id: uuid(),
    avatar: `${process.env.BASE_BE}avatar/avatarSon2.jpg`,
    description: 'Sinh viên Đại học Sư phạm - Đại học Đà Nẵng',
    fullName: 'Trần Văn Anh Sơn 2',
    age: 22,
    address: 'Tiểu La - Hải Châu - Đà Nẵng',
    email: 'a@gmail.com',
    education: 'Đại học',
    phone: '0334965080',
    experience: '+1 Year developer at Acexis Company, 2 Month QC leader',
    subject: ['Toán', 'Lý', 'Hóa'],
    sex: true,
    salary: 1500000,
    createBy: 'admin'
  },
  {
    _id: uuid(),
    avatar: `${process.env.BASE_BE}avatar/avatarSon3.jpg`,
    description: 'Sinh viên Đại học Sư phạm - Đại học Đà Nẵng',
    fullName: 'Trần Văn Anh Sơn 3',
    age: 22,
    address: 'Tiểu La - Hải Châu - Đà Nẵng',
    email: 'a@gmail.com',
    education: 'Đại học',
    phone: '0334965080',
    experience: '+1 Year developer at Acexis Company, 2 Month QC leader',
    subject: ['Toán', 'Lý', 'Hóa'],
    sex: true,
    salary: 1500000,
    createBy: 'admin'
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
    // for await (const userSeed of userSeeds) {
    //   console.log(userSeed);
    //   const user = new Users(userSeed);
    //   await user.save();
    // }
    // console.log("seeded user");
    // for await (const roleSeed of roleSeeds) {
    //   const role = new Role(roleSeed);
    //   await role.save()
    // }
    for await (const teacherSeed of teacherSeeds) {
      const teacher = new Teacher(teacherSeed);
      await teacher.save()
    }
  } catch (error) {
    console.log(error);
  }
  process.exit(0)
}

main();

// return
