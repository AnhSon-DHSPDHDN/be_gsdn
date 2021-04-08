const bcript = require('bcryptjs')
const Users = require('./models/Users')

const mongoose = require('mongoose');
const Role = require('./models/Role');
const { uuid } = require('uuidv4');
const Teacher = require('./models/Teacher');
const Developer = require('./models/Developer');
const New = require('./models/New');
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

const seedDeveloper = [
  {
    _id: uuid(),
    avatar: "http://localhost:4000/avatar/avatarSon1.jpg",
    fullName: "Trần Văn Anh Sơn",
    description: "Developer tại Acexis Company"
  },
  {
    _id: uuid(),
    avatar: "http://localhost:4000/avatar/avatarSon2.jpg",
    fullName: "Trần Văn Anh Sơn",
    description: "Developer tại Acexis Company"
  },
  {
    _id: uuid(),
    avatar: "http://localhost:4000/avatar/avatarSon3.jpg",
    fullName: "Trần Văn Anh Sơn",
    description: "Developer tại Acexis Company"
  },
  {
    _id: uuid(),
    avatar: "http://localhost:4000/avatar/avatarSon1.jpg",
    fullName: "Trần Văn Anh Sơn",
    description: "Developer tại Acexis Company"
  }
]

const seedNews = [
  {
    _id: uuid(),
    title: "Xôn xao chuyện rich kid 2k4 đi học thêm: Quên mang thước, lấy thẻ đen 2 tỷ đồng ra kẻ tạm?",
    image: "https://kenh14cdn.com/203336854389633024/2021/3/18/0-16160825118881600259615.jpg",
    description: "Ai cũng biết rich kid là dàn thiếu gia, tiểu thư đến từ những gia đình cực giàu. Nhưng giàu cỡ nào thì không có con số cụ thể, tất cả chỉ được thể hiện qua ảnh check-in hàng hiệu, siêu xe hay biệt thự siêu to khổng lồ thôi.",
    link: "https://kenh14.vn/xon-xao-chuyen-rich-kid-2k4-di-hoc-them-quen-mang-thuoc-lay-the-den-2-ty-dong-ra-ke-tam-20210318234730033.chn"
  },
  {
    _id: uuid(),
    title: "Không học thêm, nữ sinh lớp 10 'chinh phục' các cuộc thi toán quốc tế thế nào?",
    image: "https://cdn.tuoitre.vn/2021/3/30/nguyen-hang-linh-30-3-2-1read-only-16171116182601036625103.jpg",
    description: "Nguyễn Hằng Linh (học sinh lớp 10A2 Trường THPT chuyên Khoa học tự nhiên - Trường ĐH Khoa học tự nhiên, Đại học Quốc gia Hà Nội) vừa được trao học bổng Kovalevskaia, là người trẻ nhất nhận học bổng này trong năm 2021.",
    link: "https://tuoitre.vn/khong-hoc-them-nu-sinh-lop-10-chinh-phuc-cac-cuoc-thi-toan-quoc-te-the-nao-20210330204340818.htm"
  },
  {
    _id: uuid(),
    title: "Nhóm ngành kinh tế: Những ngành nào đang 'hot'?",
    image: "https://cdn.tuoitre.vn/thumb_w/586/2021/4/6/tiengiang-1617682017969606238104.jpg",
    description: "Khi hoạt động xuất nhập khẩu của Việt Nam ngày một tăng trưởng và dòng vốn đầu tư quốc tế chảy vào ồ ạt, doanh nghiệp và tổ chức nước ngoài cũng đến Việt Nam làm ăn ngày càng nhiều hơn thì nhu cầu lao động liên quan đến kinh tế đầu tư, kinh doanh quốc tế, kinh doanh thương mại và logistic - quản lý chuỗi cung ứng cũng tăng lên mạnh mẽ. ",
    link: "https://tuoitre.vn/nhom-nganh-kinh-te-nhung-nganh-nao-dang-hot-20210406110851929.htm"
  },
  {
    _id: uuid(),
    title: "Trại hè - giải pháp toàn vẹn cho trẻ vừa học vừa chơi",
    image: "https://cdn.tuoitre.vn/thumb_w/586/2021/4/7/photo-1-1617793345688227156473.jpg",
    description: "Sau 2 năm học nhiều biến động do những ảnh hưởng của COVID-19, mùa hè năm nay là thời điểm lý tưởng để cho trẻ tham gia các hoạt động ngoài trời, khám phá thiên nhiên, phát triển năng khiếu và kỹ năng sống qua các Trại hè Anh ngữ.",
    link: "https://tuoitre.vn/trai-he-giai-phap-toan-ven-cho-tre-vua-hoc-vua-choi-20210407180628847.htm"
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
    // for await (const teacherSeed of teacherSeeds) {
    //   const teacher = new Teacher(teacherSeed);
    //   await teacher.save()
    // }
    // for await (const developerSeed of seedDeveloper) {
    //   const developer = new Developer(developerSeed)
    //   await developer.save()
    // }
    for await (const newSeed of seedNews) {
      const newItem = new New(newSeed)
      await newItem.save()
    }
  } catch (error) {
    console.log(error);
  }
  process.exit(0)
}

main();

// return
