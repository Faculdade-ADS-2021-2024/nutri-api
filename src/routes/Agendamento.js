import express from 'express';

import { pool } from '../config/dbConfig.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {

    const query = `SELECT A.ID, A.PACIENTE_ID, A.START, A.END, A.TITLE, A.OBSERVACOES, P.NOME 
    FROM AGENDAMENTO A
    INNER JOIN PACIENTE P ON P.IDPACIENTE = A.PACIENTE_ID`;

    try {
        const response = await pool.query(query);
        return res.status(200).send(response.rows);
    } catch (error) {
        console.error(error);
    }
});

router.get('/:id', auth, async (req, res) => {

    const query = `SELECT A.ID, A.PACIENTE_ID, A.START, A.END, A.TITLE, A.OBSERVACOES, P.NOME 
    FROM AGENDAMENTO A
    INNER JOIN PACIENTE P ON P.IDPACIENTE = A.PACIENTE_ID WHERE IDAGENDAMENTO = $1`;

    try {
        const response = await pool.query(query, [req.params.id]);
        return res.status(200).send(response.rows);
    } catch (error) {
        console.error(error);
    }
});

router.post('/', auth, async (req, res) => {
    const agendamento = {
        Paciente_Id: req.body.paciente_id,
        Start: req.body.start,
        End: req.body.end,
        Title: req.body.title,
        Observacoes: req.body.observacoes,
    }

    console.log(agendamento);

    const query = 'INSERT INTO agendamento (PACIENTE_ID, START, "end", TITLE, OBSERVACOES) VALUES ($1, $2, $3, $4, $5)';

    try {
        const response = await pool.query(query, [agendamento.Paciente_Id, agendamento.Start, agendamento.End, agendamento.Title, agendamento.Observacoes]);
        return res.status(201).send(response.rows);
    } catch (error) {
        console.error(error);
    }
});

router.patch('/:id', auth, async (req, res) => {
    const agendamento = {
        Paciente_Id: req.body.paciente_id,
        Start: req.body.start,
        End: req.body.end,
        Title: req.body.title,
        Observacoes: req.body.observacoes,
    }

    const query = 'UPDATE agendamento SET PACIENTE_ID = $1, START = $2, "end" = $3, TITLE = $4, OBSERVACOES = $5 WHERE idagendamento = $6';

    try {
        await pool.query(query, [agendamento.Paciente_Id, agendamento.Start, agendamento.End, agendamento.Title, agendamento.Observacoes, req.params.id]);

        return res.status(204).send();
    } catch (error) {
        console.error(error);
    }
});

router.delete('/:id', auth, async (req, res) => {
    const query = 'DELETE FROM AGENDAMENTO WHERE IDAGENDAMENTO = $1';

    try {
        await pool.query(query, [req.params.id]);
        return res.status(204).send();
    } catch (error) {
        console.error(error);
    }
});

export default router;