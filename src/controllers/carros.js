const knex = require("../connection/connection");

const listingCars = async (req, res) => {
  const { modelos, marcas } = req.query;

  if (modelos || marcas) {
    return filteringCars(res, modelos, marcas);
  }

  try {
    const cars = await knex("carros");

    return res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const filteringCars = async (res, modelos, marcas) => {
  try {
    let carsModel = [];
    let carsBrand = [];

    if (modelos) {
      for (let model of modelos) {
        const car = await knex("carros").where({ modelo: model });
        carsModel.push(...car);
      }
    }
    if (marcas) {
      for (let brand of marcas) {
        const car = await knex("carros").where({ marca: brand });
        carsBrand.push(...car);
      }
    }

    return res.status(200).json([...carsModel, ...carsBrand]);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const registeringCar = async (req, res) => {
  const { nome, marca, modelo, foto, preco } = req.body;
  let carPrice;

  try {
    if (preco) {
      carPrice = preco;
    }

    const car = await knex("carros")
      .insert({ nome, marca, modelo, foto, preco: carPrice })
      .returning(["nome", "marca", "modelo", "foto", "preco"]);

    return res.status(201).json(car[0]);
  } catch (error) {
    return res.json({ mensagem: error.message });
  }
};

const updatingCar = async (req, res) => {
  const { nome, marca, modelo, foto, preco } = req.body;
  const { id } = req.params;

  try {
    await knex("carros")
      .where({ id })
      .update({ nome, marca, modelo, foto, preco });

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
