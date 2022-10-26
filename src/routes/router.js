const express = require("express");
const bodyValidation = require("../middleware/bodyValidation");
const schemaUser = require("../validation/schemaUser");
const { userRegister, userLogin } = require("../controllers/usuarios");
const schemaCar = require("../validation/schemaCar");
const verifyingLogin = require("../middleware/verifyingLogin");
const {
  listingCars,
  carRegister,
  updatingCar,
} = require("../controllers/carros");
const router = express.Router();

router.post("/sign-up", bodyValidation(schemaUser), userRegister);
router.post("/sign-in", userLogin);

router.get("/cars", listingCars);

router.use(verifyingLogin);
router.post("/cars", bodyValidation(schemaCar), carRegister);
router.put("/cars/:id", bodyValidation(schemaCar), updatingCar);

module.exports = router;
