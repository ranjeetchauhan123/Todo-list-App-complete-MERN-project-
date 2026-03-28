const mongoose = require("mongoose");

const mySchema = new mongoose.Schema({
    title: String,
    discription: String
})

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password: String
})

const collection = mongoose.model('todos', mySchema);
const newUser = mongoose.model('userlists', userSchema);

module.exports = {collection, newUser};
