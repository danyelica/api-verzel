const knex = require("../connection/connection");

const listingCars = async (req, res) => {
  try {
    const cars = await knex("carros");

    return res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const carRegister = async (req, res) => {
  const { nome, marca, modelo, foto } = req.body;
  const user = req.user;

  try {
    if (!user.admin) {
      throw new Error("Você não tem permissão", { statusCode: 401 });
    }

    const car = await knex("carros")
      .insert({ nome, marca, modelo, foto })
      .returning(["nome", "marca", "modelo", "foto"]);

    return res.status(201).json(car[0]);
  } catch (error) {
    return res.json({ mensagem: error.message });
  }
};

module.exports = {
  listingCars,
  carRegister,
};
