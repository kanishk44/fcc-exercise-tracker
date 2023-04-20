const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose')

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const { Schema } = mongoose
mongoose.connect(process.env.DB_URI)

const UserSchema = new Schema({
  username: String,
})

const ExerciseSchema = new Schema({
  username: String,
  date: Date,
  description: String,
  duration: Number,
  user_id: { type: String, required: true }
})

const User = mongoose.model('User', UserSchema)
const Exercise = mongoose.model('Exercise', ExerciseSchema)

app.post('/api/users', async (req, res) => {
  const { username } = req.body
  const userObj = new User({
    username: username
  })
  try {
    const user = await userObj.save()
    res.json(user)
  } catch (err) {
    console.log(err)
  }
}).get('/api/users', async (req, res) => {
  const users = await User.find({}).select("_id username")
  if (!users) {
    res.send('No users found!')
  }
  res.json(users)
})

app.post('/api/users/:_id/exercises', async (req, res) => {
  const id = req.params._id;
  const { description, duration, date } = req.body;

  try {
    const user = await User.findById(id)
    if (!user) {
      res.send("User not found!")
    }
    const exerciseObj = new Exercise({
      user_id: user._id,
      username: user.username,
      description,
      duration,
      date: date ? new Date(date) : new Date()
    })
    const exercise = await exerciseObj.save()
    res.json({
      _id: user._id,
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toDateString()
    })
  } catch (err) {
    console.log(err)
  }
})

app.get('/api/users/:_id/logs', async (req, res) => {
  const { from, to, limit } = req.query
  const id = req.params._id
  const user = await User.findById(id)
  
  if(!user) {
    res.send('User not found!')
    return
  }
  const dateObj = {}
  if(from) {
    dateObj['$gte'] = new Date(from)
  }
  if(to) {
    dateObj['$lte'] = new Date(to)
  }
  const filter = {
    user_id: id
  }
  if (from || to) {
    filter.date = dateObj
  }
  
  const exercises = await Exercise
    .find(filter)
    .limit(+limit ?? 500)
  
  const log = exercises.map(e => ({
    description: e.description,
    duration: e.duration,
    date: e.date.toDateString()
  }))
  
  res.json({
    username: user.username,
    count: exercises.length,
    _id: user._id,
    log
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
