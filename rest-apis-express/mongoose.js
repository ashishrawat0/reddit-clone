const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testDb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  //connection established
  console.log("Mongoose Connected");
});
//const User =require("../schema/Userprofile")
module.exports = {mongoose};