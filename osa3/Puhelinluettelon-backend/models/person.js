const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  }).catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'name is required'],
    trim: true
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{2}-\d{6}/.test(v) || /\d{3}-\d{5}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    minlength: 8,
    required: [true, 'number is required'],
    trim: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)