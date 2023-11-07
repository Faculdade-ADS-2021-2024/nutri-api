import express from 'express';
import { pool } from '../config/dbConfig.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {

    const query = 'SELECT ID, NOME, LOGIN, SENHA FROM USUARIO';

    try {
        const response = await pool.query(query);
        return res.status(200).send(response.rows);
    }
    catch (error) {
        console.error(error);
        throw (error);
    }
});

router.get('/:id', auth, async (req, res) => {

    const query = 'SELECT ID, NOME, LOGIN, SENHA FROM USUARIO WHERE ID = $1';

    try {
        const response = await pool.query(query, [req.params.id]);
        return res.status(200).send(response.rows[0]);
    } catch (error) {
        console.error(error);
        throw (error);
    }
});

router.post('/', async (req, res) => {

    const usuario = {
        Nome: req.body.nome,
        Login: req.body.login,
        Senha: req.body.senha,
    }

    const query = 'INSERT INTO usuario (nome, login, senha) VALUES ($1, $2, $3)';
    const verificaUsuario = 'SELECT login FROM usuario WHERE login = $1';

    try {
        const responseUser = await pool.query(verificaUsuario, [usuario.Login]);

        if (responseUser.rows.length > 0) {
            return res.status(409).send({ Message: "Usuario já existe." });
        } else {
            bcrypt.hash(usuario.Senha, 12, async (err, hash) => {
                if (err) {
                    return res.status(500).send({ err });
                }

                await pool.query(query, [usuario.Nome, usuario.Login, hash]);
                
                return res.status(200).send({ Message: "Usuario cadastrado com sucesso." });
            });
        }
    } catch (error) {
        console.error(error);
    }
});

router.post('/auth', async (req, res) => {
    const usuario = {
        Login: req.body.login,
        Senha: req.body.senha
    }

    const query = 'SELECT ID, NOME, LOGIN, SENHA FROM USUARIO WHERE LOGIN = $1';

    try {
        const response = await pool.query(query, [usuario.Login]);

        if (response.rows.length < 1) {
            return res.status(401).send({ Message: "Usuário ou senha invalidos." });
        }

        bcrypt.compare(usuario.Senha, response.rows[0].senha, (error, result) => {

            if (error)
                return res.status(401).send({ Message: "Usuário ou senha invalidos. 222" });

            if (result) {

                const secret = "" + process.env.JWT_KEY;

                const payload = {
                    id: response.rows[0].id,
                    usuario: response.rows[0].login,
                    nome: response.rows[0].nome
                }

                const options = {
                    expiresIn: "12h"
                }

                const token = jwt.sign(payload, secret, options);

                return res.status(200).send({ payload, token });
            }

            return res.status(401).send({ Message: "Usuário ou senha invalidos." });
        })
    }
    catch (error) {
        console.log(error);
    }
});

router.patch('/:id', auth, async (req, res) => {

    const usuario = {
        Nome: req.body.nome,
        Login: req.body.login,
        Senha: req.body.senha
    }

    const query = 'UPDATE usuario SET nome = $1, login = $2, senha = $3 WHERE id = $4';

    try {
        bcrypt.hash(usuario.Senha, 12, async (err, hash) => {
            if (err) {
                return res.status(500).send({ err });
            }

            const response = await pool.query(query, [usuario.Nome, usuario.Login, hash, req.params.id]);
            return res.status(204).send(response);
        });
    }
    catch (error) {
        console.error(error);
    }
});

router.delete('/:id', auth, async (req, res) => {

    const query = 'DELETE FROM USUARIO WHERE ID = $1';

    try {
        const response = await pool.query(query, [req.params.id]);
        return res.status(204).send(response);
    }
    catch (error) {
        console.error(error);
    }
});

export default router;
