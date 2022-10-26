const bcrypt = require("bcrypt");
const knex = require("../connection/connection");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  const { nome, senha, admin } = req.body;
  let isAdmin = false;

  try {
    if (admin) {
      isAdmin = admin;
    }

    const username = await knex("usuarios").where({ nome }).first();
    if (username) {
      throw new Error("Esse nome de usuário já existe", { statusCode: 400 });
    }

    const encriptPassword = await bcrypt.hash(senha, 10);

    const user = await knex("usuarios")
      .insert({
        nome,
        senha: encriptPassword,
        admin: isAdmin,
      })
      .returning(["nome", "admin"]);

    return res.status(201).json(user[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  userRegister,
};
