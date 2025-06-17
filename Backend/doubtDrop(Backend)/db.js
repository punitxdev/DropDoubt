// getting-started.js
const mongoose = require('mongoose');

connectToDatabase().catch(err => console.log(err));
 
async function connectToDatabase() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dropdoubt');

  console.log("database connected successfully...");

}

module.exports = connectToDatabase