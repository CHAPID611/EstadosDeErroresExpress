"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3001;
function errorHandler(err, _req, res, _next) {
    console.error(err.stack);
    res.status(500).send({ error: '500: Internal Server Error' });
}
function validateParams(req, res, next) {
    const { number } = req.params;
    if (isNaN(Number(number))) {
        res.status(400).send({ error: '400: Bad Request: el parámetro debe ser un número' });
    }
    else {
        next();
    }
}
app.get('/:number', validateParams, (req, res) => {
    const { name, lastname, age } = req.query;
    if (!name || !lastname || !age) {
        res.status(400).send({ error: '400: Bad Request: faltan parámetros en la consulta' });
    }
    res.send(`¡Hola, ${name} ${lastname}, tu edad es ${age} años!`);
});
app.use((_req, res) => {
    res.status(404).send({ error: '404: Not Found' });
});
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map