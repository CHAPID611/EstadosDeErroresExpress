import express, { Request, Response, NextFunction } from 'express';
//import mysql from 'mysql2'

const app = express(); // Crea una instancia de la aplicación Express
const port = 3001; // Define el puerto

//bd configurada incorrectamente para error 500
/*
const db = mysql.createConnection({
  host: 'falsohost',
  user: 'root',
  password: '1234',
  database: 'testdb',
});
*/

// Middleware para capturar errores
function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) : void {
  console.error(err.stack);
  res.status(500).send({ error: '500: Internal Server Error' });
}

// Middleware para validar parámetros de la URL
function validateParams(req: Request, res: Response, next: NextFunction) : void {
  const { number } = req.params;

  if (isNaN(Number(number))) {
    // Si el parámetro no es un número, responde con 400
     res.status(400).send({ error: '400: Bad Request: el parámetro debe ser un número' });
  }else{
    next();

  }
}

// Ruta con validación de parámetros y manejo de errores
app.get('/:number', validateParams, (req: Request, res: Response) => {
  const { name, lastname, age } = req.query;

  if (!name || !lastname || !age) {
    // Si faltan parámetros en la consulta, responde con 400
     res.status(400).send({ error: '400: Bad Request: faltan parámetros en la consulta' });
  }

  res.send(`¡Hola, ${name} ${lastname}, tu edad es ${age} años!`);
});

// Ruta 404 para solicitudes a rutas no definidas
app.use((_req: Request, res: Response) => {
  res.status(404).send({ error: '404: Not Found' });
});

//frozar error 500 con conexion a base de dato no disponible
/**
 app.get('/db-error', (_req: Request, res: Response) => {
  const dbConnection = null; // Simulando que no hay conexión
  dbConnection.query('SELECT * FROM users', (err: any, results: any) => {
    if (err) {
      throw new Error('Database query failed');
    }
    res.send(results);
  });
});
 */

// Middleware de manejo de errores
app.use(errorHandler);

// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
