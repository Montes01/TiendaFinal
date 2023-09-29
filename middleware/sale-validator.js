const { check, validationResult } = require('express-validator');


let validatorParams = [
            check('productId').isInt({ min: 1}),
            check('cantidad').isInt({min:1})
      ];

      
function validator(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          
          return res.status(422).json({ errors: errors.array() });
        }
        next();
    };


module.exports = {
  validatorParams,
  validator
}
