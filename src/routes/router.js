const express = require("express");
const bodyValidation = require("../middleware/bodyValidation");
const schemaUser = require("../validation/schemaUser");
const { userRegister, userLogin } = require("../controllers/usuarios");
const schemaCar = require("../validation/schemaCar");
const verifyingLogin = require("../middleware/verifyingLogin");
const {
  listingCars,
  registeringCar,
  updatingCar,
  deletingCar,
} = require("../controllers/carros");
const router = express.Router();

router.post("/sign-up", bodyValidation(schemaUser), userRegister);
router.post("/sign-in", userLogin);

router.get("/cars", listingCars);

router.use(verifyingLogin);
router.post("/cars", bodyValidation(schemaCar), registeringCar);
router.put("/cars/:id", bodyValidation(schemaCar), updatingCar);
router.delete("/cars/:id", deletingCar);

module.exports = router;
