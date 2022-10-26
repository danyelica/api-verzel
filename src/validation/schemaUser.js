const joi = require("joi");

const schemaUser = joi.object({
  nome: joi.string().required().min(3).max(20).messages({
    "any.required": "O campo nome é obrigatório",
    "string.empty": "O campo nome é obrigatório",
    "string.max": "O campo nome deve ter no minino 20 caracters",
    "string.min": "O campo nome deve ter no maximo 3 caracters",
  }),

  senha: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(3)
    .required()
    .messages({
      "any.required": "O campo senha é obrigatório",
      "string.empty": "O campo senha é obrigatório",
      "string.pattern.base":
        "A senha precisa conter, no mínimo, 3 caracteres e ter somente números e letras",
    }),

  admin: joi.boolean(),
});

module.exports = schemaUser;
