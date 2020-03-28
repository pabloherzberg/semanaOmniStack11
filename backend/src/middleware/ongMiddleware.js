const { 
  celebrate, 
  Segments, 
  Joi } = require('celebrate')

const withBody = celebrate({
                    [Segments.BODY]: Joi.object().keys({
                      name: Joi.string().required(),
                      email: Joi.string().required().email(),
                      city: Joi.string().required(),
                      whatsapp: Joi.string().required().min(10).max(13),
                      uf: Joi.string().required().length(2)
                    })
                  })

module.exports = { withBody }