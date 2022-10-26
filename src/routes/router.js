const express = require("express");
const bodyValidation = require("../middleware/bodyValidation");
const schemaUser = require("../validation/schemaUser");
const { userRegister } = require("../controllers/usuarios");
const router = express.Router();

router.post("/usuario", bodyValidation(schemaUser), userRegister);

module.exports = router;
