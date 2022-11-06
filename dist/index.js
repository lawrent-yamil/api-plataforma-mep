"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, express_1.default)();
/* Middlewares */
app.use(express_1.default.json());
app.set('port', config_1.config.PORT);
/* Routes */
app.use('/user', user_routes_1.default);
app.get('/', (req, res) => {
    return res.json({
        message: 'Bienvenido a la API de NodeJS + TypeScript del MEP',
    });
});
/* Server */
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')} 🚀`);
    console.log(`http://localhost:${app.get('port')}`);
});
