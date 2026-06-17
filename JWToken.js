const jwt = require('jsonwebtoken')
const SECRET = "mysecretkey"

const token =jwt.sign({userID:1,username:"ayaz"},SECRET)

console.log(token);

const decoded =jwt.verify(token,SECRET)
console.log(decoded)