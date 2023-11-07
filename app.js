import express from 'express';

import morgan from "morgan";
import bodyParser from 'body-parser';

import agendamento from './src/routes/Agendamento.js';
import anamnese from './src/routes/Anamnese.js';
import paciente from './src/routes/Paciente.js';
import usuario from './src/routes/Usuario.js';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
      "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR");
    if (req.headers.origin) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
    if (req.method === 'OPTIONS') {
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
      return res.status(200).json({});
    }
    next();
});

app.use('/agendamento', agendamento);
app.use('/anamnese', anamnese);
app.use('/paciente', paciente);
app.use('/usuario', usuario);

app.use((req, res, next) => {
    const error = new Error('Não encontrado');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({ erro: error.message });
});

export default app;