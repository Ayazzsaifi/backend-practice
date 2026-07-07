const mongoose = require("mongoose");
const schema = mongoose.schema;
const ObjectId = mongoose.ObjectId;

const user = new schema({
    name: String,
    email: String,
    password: String
});

const todo = new schema({
    title: String,
    done: Boolean,
    userID: ObjectId
})

const userModel = mongoose.model('users', user);
const todoModel = mongoose.model('todo', todo);

module.exports = {
    userModel: userModel,
    todoModel: todoModel
}