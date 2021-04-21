const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
const userRouter = require('./routes/users')
const teacherRouter = require('./routes/teacher')
const customerRouter = require('./routes/customer')
const feedbackRouter = require('./routes/feedback')
const newRouter = require('./routes/new')
const loginRouter = require('./routes/login')
const developerRouter = require('./routes/developer')
const adminRouter = require('./routes/admin')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.static('images'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

app.use('/api/users', userRouter);
app.use('/api/teachers', teacherRouter);
app.use('/api/customers', customerRouter);
app.use('/api/feedbacks', feedbackRouter);
app.use('/api/news', newRouter);
app.use('/api/login', loginRouter)
app.use('/api/developer', developerRouter)
app.use('/api/admin', adminRouter)

app.get('/api/', (req, res) => {
  res.send('hihi')
})

app.listen(4000)