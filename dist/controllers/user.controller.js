"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const password_1 = require("../utils/password");
async function login(req, res) {
    const { email, password } = req.body;
    try {
        // Selecct the user from the database
        const user = await config_1.pool.query('SELECT * FROM tb_users WHERE email = $1', [
            email,
        ]);
        // Check if the user exists
        if (!user.rows[0]) {
            return res.status(401).json("Email or passwor doesn't match");
        }
        // Check if the password is correct
        const validPassword = await (0, password_1.comparePassword)(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json("Email or passwor doesn't match");
        }
        // Create a token email and password
        const token = jsonwebtoken_1.default.sign({
            email: user.rows[0].email,
            password: user.rows[0].password,
        }, 'tokentest');
        console.log(user.rows[0].password);
        // Return the token
        return res.status(200).json({ token });
    }
    catch (err) {
        console.error(err?.message);
    }
}
exports.login = login;
async function signup(req, res) {
    const { email, password } = req.body;
    try {
        // Selecct the user from the database
        const user = await config_1.pool.query('SELECT * FROM tb_users WHERE email = $1', [
            email,
        ]);
        // Check if the user exists
        if (user.rows[0]) {
            return res.status(401).json('User already exists');
        }
        // Hash the password
        const hashedPassword = await (0, password_1.hashPassword)(password);
        // Insert the user into the database
        await config_1.pool.query('INSERT INTO tb_users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
        // Generate the token with the email and password
        const token = jsonwebtoken_1.default.sign({ email, hashedPassword }, 'secret');
        // Send the token to the client
        return res.json({ token });
    }
    catch (err) {
        console.error(err?.message);
    }
}
exports.signup = signup;
