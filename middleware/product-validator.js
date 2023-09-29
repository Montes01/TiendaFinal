const { check, validationResult } = require('express-validator');


let validatorParams = [
  check('nombre').isLength({ min: 3, max: 15}),
  check('precio').isFloat()
];
   

function validator(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}


module.exports = {
    validatorParams,
    validator
}


