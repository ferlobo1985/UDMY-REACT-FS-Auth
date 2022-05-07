// const {MD5} = require('crypto-js');
// const secret = 'superSecretPassword';
// const secretHashed = 'ljhsdklbfskdljbfksdbjfksdjbfkjbdf'

// const user = {
//     id:1,
//     token: MD5('francis@gmail.com').toString() + secretHashed
// }

// console.log(user)

const jwt = require('jsonwebtoken');

let id = '100';
const secret = 'supersecret';

//// user login/register 
const token = jwt.sign(id,secret);
// store token, cookie, LS;

////// USER > NEEDS VALIDATION
const decodeToken = jwt.verify('eyJhbGciOiJIUzI1NiJ9.MTAw._p4CTP9MejT8kntvqaJI0HR_jo2DLfuLaRqCIahBf52',secret)

console.log(decodeToken)
