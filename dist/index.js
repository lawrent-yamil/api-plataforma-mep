"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, express_1.default)();
/* Middlewares */
app.use(express_1.default.json());
app.set('port', config_1.config.PORT);
app.use((0, cors_1.default)());
/* Routes */
app.use('/user', user_routes_1.default);
app.get('/', async (req, res) => {
    return res.status(200).json({
        message: 'Bienvenido a la API REST de la Plataforma del MEP, desarrollada en NodeJS y Typescript',
    });
});
/* Server */
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')} 🚀`);
    console.log(`http://localhost:${app.get('port')}`);
});
// ✈️ 🏢🏢
