const jwt = require("jsonwebtoken");
const knex = require("../connection/connection");

const verifyingLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      throw new Error("Não autorizado", { statusCode: 401 });
    }

    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, process.env.PASS_JWT);

    const user = await knex("usuarios").where({ id }).first();

    if (!user) {
      throw new Error("Esse nome de usuário já existe", { statusCode: 404 });
    }

    const { senha, ...newUser } = user;

    req.user = newUser;

    next();
  } catch (error) {
    return res.json({ mensagem: error.message });
  }
};

module.exports = verifyingLogin;
