const { 
  celebrate, 
  Segments, 
  Joi } = require('celebrate')
 
  const page = celebrate({
                  [Segments.QUERY]: Joi.object().keys({
                    page: Joi.number()
                  })
                })

  const withAuthAndBody = celebrate({
                            [Segments.HEADERS]: Joi.object({
                              authorization: Joi.string().required()
                            }).unknown(),
                          
                            [Segments.BODY]: Joi.object().keys({
                              title: Joi.string().required(),
                              description: Joi.string().required(),
                              value: Joi.number().required()
                            })
                          })
  const withIncidentId = celebrate({
                            [Segments.PARAMS]: Joi.object().keys({
                              id: Joi.number().required()
                            })
                          })

module.exports = { page, withAuthAndBody, withIncidentId }