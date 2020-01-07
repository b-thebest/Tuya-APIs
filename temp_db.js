
var crypto = require('crypto'); 

salt = crypto.randomBytes(8).toString('hex'); 
hash = crypto.pbkdf2Sync('Admin1', 'vN9A6rY', 1000, 64, `crc32`).toString(`hex`); 

console.log(hash)
// Method to set salt and hash the password for a user 
// setPassword method first creates a salt unique for every user 
// then it hashes the salt with user password and creates a hash 
// this hash is stored in the database as user password 
 
// valid password method checks whether the user 
// password is correct or not 
// It takes the user password from the request  
// and salt from user database entry 
// It then hashes user password and salt 
// then checks if this generated hash is equal 
// to user's hash in the database or not 
// If the user's hash is equal to generated hash  
// then the password is correct otherwise not

//hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
//console.log(hash === hash)
