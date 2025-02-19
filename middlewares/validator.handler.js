const boom = require('@hapi/boom');

function validatorHandler(schema, property){
  return (req, res, next) =>{
    const data = req[property]; //para saber dinámicamente si la info viene en el body, params o query
    
    const {error} = schema.validate(data, { abortEarly: false});
    if (error) {
      next(boom.badRequest(error));
    }else next();
  }
};

module.exports = validatorHandler;
