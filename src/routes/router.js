const express = require("express");
const bodyValidation = require("../middleware/bodyValidation");
const schemaUser = require("../validation/schemaUser");
const { userRegister, userLogin } = require("../controllers/usuarios");
const schemaCar = require("../validation/schemaCar");
const verifyingLogin = require("../middleware/verifyingLogin");
const { listingCars, carRegister } = require("../controllers/carros");
const router = express.Router();

router.post("/sign-up", bodyValidation(schemaUser), userRegister);
router.post("/sign-in", userLogin);

router.get("/cars", listingCars);
router.post("/cars", bodyValidation(schemaCar), verifyingLogin, carRegister);

module.exports = router;
