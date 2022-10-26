const knex = require("../connection/connection");

const listingCars = async (req, res) => {
  try {
    const cars = await knex("carros");

    return res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const registeringCar = async (req, res) => {
  const { nome, marca, modelo, foto } = req.body;

  try {
    const car = await knex("carros")
      .insert({ nome, marca, modelo, foto })
      .returning(["nome", "marca", "modelo", "foto"]);

    return res.status(201).json(car[0]);
  } catch (error) {
    return res.json({ mensagem: error.message });
  }
};

const updatingCar = async (req, res) => {
  const { nome, marca, modelo, foto } = req.body;
  const { id } = req.params;

  try {
    await knex("carros").where({ id }).update({ nome, marca, modelo, foto });

    return res.status(204).send();
  } catch (error) {
    return res.json({ mensagem: error.message });
  }
};

const deletingCar = async (req, res) => {
  const { id } = req.params;

  try {
    await knex("carros").where({ id }).delete();

    return res.status(204).send();
  } catch (error) {
    return res.json({ mensagem: error.message });
  }
};

module.exports = {
  listingCars,
  registeringCar,
  updatingCar,
  deletingCar,
};
