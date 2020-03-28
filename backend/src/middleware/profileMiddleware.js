const { 
  celebrate, 
  Segments, 
  Joi } = require('celebrate')

const withAth = celebrate({
                  [Segments.HEADERS]: Joi.object({
                    authorization: Joi.string().required()
                  }).unknown()
                })

module.exports = { withAth }