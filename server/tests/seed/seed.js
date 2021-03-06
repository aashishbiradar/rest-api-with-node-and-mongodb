const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

var userOneID = new ObjectID();
var userTwoID = new ObjectID();

const users = [{
    _id : userOneID,
    email : 'raju@gmail.com',
    password : 'userOnePass',
    tokens : [{
        access : 'auth',
        token : jwt.sign({_id : userOneID, access : 'auth'}, process.env.JWT_SECRET).toString()
    }]
},{
    _id : userTwoID,
    email : 'mohan@gmail.com',
    password : 'userTwoPass',
    tokens : [{
        access : 'auth',
        token : jwt.sign({_id : userTwoID, access : 'auth'}, process.env.JWT_SECRET).toString()
    }]
}];

const populateUsers = (done) => {
    User.remove({}).then(()=>{
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne,userTwo]);
    }).then(() => done());
};
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneID
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    _creator: userTwoID,
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {
    Todo.remove({}).then(()=> {
        Todo.insertMany(todos).then(()=> done());
    });
    
};

module.exports = {todos,populateTodos,users,populateUsers};