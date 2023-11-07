import express from 'express';

import { pool } from '../config/dbConfig.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {

    const query = 'SELECT IDPACIENTE, NOME, TELEFONE, EMAIL FROM PACIENTE';

    try {
        const response = await pool.query(query);
        return res.status(200).send(response.rows);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/:id', auth, async (req, res) => {

    const query = 'SELECT IDPACIENTE, NOME, TELEFONE, EMAIL FROM PACIENTE WHERE IDPACIENTE = $1';

    try {
        const response = await pool.query(query, [req.params.id]);
        return res.status(200).send(response.rows[0]);
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    const paciente = {
        Nome: req.body.nome,
        Telefone: req.body.telefone,
        Email: req.body.email,
    }

    const query = 'INSERT INTO PACIENTE (NOME, TELEFONE, EMAIL) VALUES ($1, $2, $3)';

    try {
        await pool.query(query, [paciente.Nome, paciente.Telefone, paciente.Email]);

        return res.status(201).send();
    } catch (error) {
        console.log(error);
    }
});

router.patch('/:id', auth, async (req, res) => {
    const paciente = {
        Nome: req.body.nome,
        Telefone: req.body.telefone,
        Email: req.body.email,
    }

    const query = 'UPDATE PACIENTE SET NOME = $1, TELEFONE = $2, EMAIL = $3 WHERE IDPACIENTE = $4';

    try {
        await pool.query(query, [paciente.Nome, paciente.Telefone, paciente.Email, req.params.id]);

        return res.status(204).send();
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', auth, async (req, res) => {

    const query = 'DELETE FROM PACIENTE WHERE IDPACIENTE = $1';

    try {
        await pool.query(query, [req.params.id]);

        return res.status(200).send();
    } catch (error) {
        console.log(error);
    }
});

export default router;