"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => {
    const { email, password } = req.body;
    /* Hacer busqueda en la base de datos */
    if (email === 'admin' && password === 'admin') {
        const token = jsonwebtoken_1.default.sign({ email }, 'secretKey', {
            expiresIn: '1h',
        });
        return res.json({ token });
    }
    else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
};
exports.login = login;
