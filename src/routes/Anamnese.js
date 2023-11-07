import express from 'express';

import { pool } from '../config/dbConfig.js'
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {

    const query = `
        SELECT 
            IDANAMNESE, PACIENTE_ID, DATA_CONSULTA, OBJETIVO_CONSULTA, FOI_NUTRICIONISTA, EXPERIENCIA_ANTERIOR,
            DOENCA_CRONICA, PAIS_IRMAOS_DOENCA_CRONICA, CIRURGIA_RECENTE, DATA_CIRURGIA, USO_MEDICAMENTO_SUPLEMENTO,
            QUEM_RECEITOU, CONSOME_ALCOOL, FUMA, DESCONFORTO_FREQUENTE, EXAMES_LABORATORIAIS, ALERGIA_ALIMENTO,
            INTOLERANCIA_ALIMENTO, ESTADO_CABELOS, ESTADO_UNHAS, ESTADO_OLHOS, INGESTAO_AGUA, 
            URINA_FREQUENTE, EVACUACAO_DIARIA, ATIVIDADE_FISICA, TIPO_ATIVIDADE, FREQUENCIA_ATIVIDADE, HORARIO_ATIVIDADE,
            INTENSIDADE_ATIVIDADE, TRABALHA, PROFISSAO, DIAS_TRABALHO, HORARIO_TRABALHO, HORA_SONO, ORIENTACOES
        FROM ANAMNESE
    `;

    try {
        const response = await pool.query(query);
        return res.status(200).send(response.rows);
    } catch (error) {
        console.error(error);
    }
});

router.get('/:id', auth, async (req, res) => {

    const query = `
        SELECT 
            IDANAMNESE, PACIENTE_ID, DATA_CONSULTA, OBJETIVO_CONSULTA, FOI_NUTRICIONISTA, EXPERIENCIA_ANTERIOR,
            DOENCA_CRONICA, PAIS_IRMAOS_DOENCA_CRONICA, CIRURGIA_RECENTE, DATA_CIRURGIA, USO_MEDICAMENTO_SUPLEMENTO,
            QUEM_RECEITOU, CONSOME_ALCOOL, FUMA, DESCONFORTO_FREQUENTE, EXAMES_LABORATORIAIS, ALERGIA_ALIMENTO,
            INTOLERANCIA_ALIMENTO, ESTADO_CABELOS, ESTADO_UNHAS, ESTADO_OLHOS, INGESTAO_AGUA, 
            URINA_FREQUENTE, EVACUACAO_DIARIA, ATIVIDADE_FISICA, TIPO_ATIVIDADE, FREQUENCIA_ATIVIDADE, HORARIO_ATIVIDADE,
            INTENSIDADE_ATIVIDADE, TRABALHA, PROFISSAO, DIAS_TRABALHO, HORARIO_TRABALHO, HORA_SONO, ORIENTACOES
        FROM ANAMNESE
        WHERE IDANAMNESE = $1
    `;

    try {
        const response = await pool.query(query, [req.params.id]);
        return res.status(200).send(response.rows);
    } catch (error) {
        console.error(error);
    }
});

router.get('/paciente/:paciente_id', auth, async (req, res) => {

    const query = `
        SELECT 
            IDANAMNESE, PACIENTE_ID, DATA_CONSULTA, OBJETIVO_CONSULTA, FOI_NUTRICIONISTA, EXPERIENCIA_ANTERIOR,
            DOENCA_CRONICA, PAIS_IRMAOS_DOENCA_CRONICA, CIRURGIA_RECENTE, DATA_CIRURGIA, USO_MEDICAMENTO_SUPLEMENTO,
            QUEM_RECEITOU, CONSOME_ALCOOL, FUMA, DESCONFORTO_FREQUENTE, EXAMES_LABORATORIAIS, ALERGIA_ALIMENTO,
            INTOLERANCIA_ALIMENTO, ESTADO_CABELOS, ESTADO_UNHAS, ESTADO_OLHOS, INGESTAO_AGUA, 
            URINA_FREQUENTE, EVACUACAO_DIARIA, ATIVIDADE_FISICA, TIPO_ATIVIDADE, FREQUENCIA_ATIVIDADE, HORARIO_ATIVIDADE,
            INTENSIDADE_ATIVIDADE, TRABALHA, PROFISSAO, DIAS_TRABALHO, HORARIO_TRABALHO, HORA_SONO, ORIENTACOES
        FROM ANAMNESE
        WHERE PACIENTE_ID = $1 ORDER BY DATA_CONSULTA DESC
    `;

    try {
        const response = await pool.query(query, [req.params.paciente_id]);
        return res.status(200).send(response.rows);
    } catch (error) {
        console.error(error);
    }
});

router.post('/', auth, async (req, res) => {
    const query = `
        INSERT INTO ANAMNESE (
            PACIENTE_ID, DATA_CONSULTA, OBJETIVO_CONSULTA, FOI_NUTRICIONISTA, EXPERIENCIA_ANTERIOR,
            DOENCA_CRONICA, PAIS_IRMAOS_DOENCA_CRONICA, CIRURGIA_RECENTE, DATA_CIRURGIA, USO_MEDICAMENTO_SUPLEMENTO,
            QUEM_RECEITOU, CONSOME_ALCOOL, FUMA, DESCONFORTO_FREQUENTE, EXAMES_LABORATORIAIS, ALERGIA_ALIMENTO,
            INTOLERANCIA_ALIMENTO, ESTADO_CABELOS, ESTADO_UNHAS, ESTADO_OLHOS, INGESTAO_AGUA, 
            URINA_FREQUENTE, EVACUACAO_DIARIA, ATIVIDADE_FISICA, TIPO_ATIVIDADE, FREQUENCIA_ATIVIDADE, HORARIO_ATIVIDADE,
            INTENSIDADE_ATIVIDADE, TRABALHA, PROFISSAO, DIAS_TRABALHO, HORARIO_TRABALHO, HORA_SONO, ORIENTACOES
        )
        VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8,
            $9, $10, $11, $12, $13, $14, $15, $16,
            $17, $18, $19, $20, $21, $22, $23, $24,
            $25, $26, $27, $28, $29, $30, $31, $32, $33, $34
        )
    `;

    try {
        await pool.query(query, [
            req.body.paciente_id,
            req.body.data_consulta,
            req.body.objetivo_consulta,
            req.body.foi_nutricionista,
            req.body.experiencia_anterior,
            req.body.doenca_cronica,
            req.body.pais_irmaos_doenca_cronica,
            req.body.cirurgia_recente,
            req.body.data_cirurgia,
            req.body.uso_medicamento_suplemento,
            req.body.quem_receitou,
            req.body.bebe,
            req.body.fuma,
            req.body.desconforto_frequente,
            req.body.exames_laboratoriais,
            req.body.alergia_alimento,
            req.body.intolerancia_alimento,
            req.body.estado_cabelos,
            req.body.estado_unhas,
            req.body.estado_olhos,
            req.body.ingestao_agua,
            req.body.urina_frequente,
            req.body.evacuacao_diaria,
            req.body.atividade_fisica,
            req.body.tipo_atividade,
            req.body.frequencia_atividade,
            req.body.horario_atividade,
            req.body.intensidade_atividade,
            req.body.trabalha,
            req.body.profissao,
            req.body.dias_trabalho,
            req.body.horario_trabalho,
            req.body.hora_sono,
            req.body.orientacoes,
        ]);

        return res.status(201).send();
    } catch (error) {
        console.error(error);
    }
});

router.patch('/:id', auth, async (req, res) => { 
    const query = `
        UPDATE ANAMNESE
        SET
            DATA_CONSULTA = $1, OBJETIVO_CONSULTA = $2, FOI_NUTRICIONISTA = $3, EXPERIENCIA_ANTERIOR = $4,
            DOENCA_CRONICA = $5, PAIS_IRMAOS_DOENCA_CRONICA = $6, CIRURGIA_RECENTE = $7, DATA_CIRURGIA = $8, USO_MEDICAMENTO_SUPLEMENTO = $9,
            QUEM_RECEITOU = $10, CONSOME_ALCOOL = $11, FUMA = $12, DESCONFORTO_FREQUENTE = $13, EXAMES_LABORATORIAIS = $14, ALERGIA_ALIMENTO = $15,
            INTOLERANCIA_ALIMENTO = $16, ESTADO_CABELOS = $17, ESTADO_UNHAS = $18, ESTADO_OLHOS = $19, INGESTAO_AGUA = $20, 
            URINA_FREQUENTE = $21, EVACUACAO_DIARIA = $22, ATIVIDADE_FISICA = $23, TIPO_ATIVIDADE = $24, FREQUENCIA_ATIVIDADE = $25, HORARIO_ATIVIDADE = $26,
            INTENSIDADE_ATIVIDADE = $27, TRABALHA = $28, PROFISSAO = $29, DIAS_TRABALHO = $30, HORARIO_TRABALHO = $31, HORA_SONO = $32, ORIENTACOES = $33
        WHERE IDANAMNESE = $34
        `;

    try {
        await pool.query(query, [
            req.body.data_consulta,
            req.body.objetivo_consulta,
            req.body.foi_nutricionista,
            req.body.experiencia_anterior,
            req.body.doenca_cronica,
            req.body.pais_irmaos_doenca_cronica,
            req.body.cirurgia_recente,
            req.body.data_cirurgia,
            req.body.uso_medicamento_suplemento,
            req.body.quem_receitou,
            req.body.consome_alcool,
            req.body.fuma,
            req.body.desconforto_frequente,
            req.body.exames_laboratoriais,
            req.body.alergia_alimento,
            req.body.intolerancia_alimento,
            req.body.estado_cabelos,
            req.body.estado_unhas,
            req.body.estado_olhos,
            req.body.ingestao_agua,
            req.body.urina_frequente,
            req.body.evacuacao_diaria,
            req.body.atividade_fisica,
            req.body.tipo_atividade,
            req.body.frequencia_atividade,
            req.body.horario_atividade,
            req.body.intensidade_atividade,
            req.body.trabalha,
            req.body.profissao,
            req.body.dias_trabalho,
            req.body.horario_trabalho,
            req.body.hora_sonoro,
            req.body.orientacoes,
            req.params.id
         ]);

        return res.status(200).send();
    } catch (error) {
        console.error(error);
    }
});

router.delete('/:id', auth, async (req, res) => {
    const query = `
        DELETE FROM ANAMNESE WHERE IDANAMNESE = $1`;
    try {
        pool.query(query, [req.params.id]);
        return res.status(200).send();
    } catch (error) {
        console.error(error);
    }
 });

export default router;