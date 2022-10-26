const express = require("express");
const bodyValidation = require("../middleware/bodyValidation");
const schemaUser = require("../validation/schemaUser");
const { userRegister, userLogin } = require("../controllers/usuarios");
const router = express.Router();

router.post("/sign-up", bodyValidation(schemaUser), userRegister);
router.post("/sign-in", userLogin);

module.exports = router;
