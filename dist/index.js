"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const config_2 = require("./config");
const app = (0, express_1.default)();
/* Middlewares */
app.use(express_1.default.json());
app.set('port', config_1.config.PORT);
app.use((0, cors_1.default)());
/* Routes */
app.use('/user', user_routes_1.default);
app.get('/', async (req, res) => {
    const response = await config_2.pool.query('SELECT * FROM tb_users');
    return res.json(response.rows);
});
/* Server */
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')} 🚀`);
    console.log(`http://localhost:${app.get('port')}`);
});
// ✈️ 🏢🏢
