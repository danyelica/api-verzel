const joi = require("joi");

const schemaCar = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
  }),
  marca: joi.string().required().messages({
    "any.required": "O campo marca é obrigatório",
    "string.empty": "O campo marca é obrigatório",
  }),
  modelo: joi.string().required().messages({
    "any.required": "O campo modelo é obrigatório",
    "string.empty": "O campo modelo é obrigatório",
  }),
  foto: joi.string().required().messages({
    "any.required": "O campo foto é obrigatório",
    "string.empty": "O campo foto é obrigatório",
  }),
});

module.exports = schemaCar;
