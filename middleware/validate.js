const validator = require('../helpers/validate');
const saveVehicles = (req, res, next)=>{

    const validationRule = {
        brand: 'required|string',
        model: 'required|string',
        year: 'required|string',
        type: 'required|string',
        color: 'string',
        price:'required|string'
    }

    validator(req.body, validationRule, {}, (err, status) =>{
      if (!status) {
        res.status (412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      }else {
        next ();
      }
        })
      }
    
  module.exports = {
    saveVehicles
  }
  