const mongoose = require('mongoose')
const mongoPath = 'mongodb+srv://Discord-Bot:yash4954@cluster0.510gr.mongodb.net/bot'

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  return mongoose
}


