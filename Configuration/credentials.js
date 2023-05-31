const mongoose = require('mongoose');
const {User} = require('../Models/User');

const uri = 'mongodb://localhost:27017/verification';

module.exports = mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
  console.log('Successfully Connected!')
})
.catch(error => console.log(error));



module.exports = User;