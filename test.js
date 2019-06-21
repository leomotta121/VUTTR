const validator = require('validator');

console.log(validator['isEmail']);

const validator_method = validator['isEmail'];

console.log(validator_method('leo'));
