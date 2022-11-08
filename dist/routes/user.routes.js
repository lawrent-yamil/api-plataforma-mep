"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
// Login with firebase
router.post("/login", user_controller_1.login);
// Sign up with firebase
router.post("/signup", user_controller_1.signup);
exports.default = router;
