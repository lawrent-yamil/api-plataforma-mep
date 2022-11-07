"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Selecct the user from the database
        const user = await config_1.pool.query("SELECT * FROM tb_users WHERE email = $1", [
            email,
        ]);
        // Check if the user exists
        if (!user.rows[0]) {
            return res.status(401).json("Email or passwor doesn't match");
        }
        // Check if the password is correct
        if (password !== user.rows[0].password) {
            return res.status(401).json("Email or password is incorrect");
        }
        // Generate the token with the email and password
        const token = jsonwebtoken_1.default.sign({ email: user.rows[0]?.email, password: user.rows[0]?.password }, "secret");
        // Send the token to the client
        return res.json({ token });
    }
    catch (err) {
        console.error(err?.message);
    }
};
exports.login = login;
