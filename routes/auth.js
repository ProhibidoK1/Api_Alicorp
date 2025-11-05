const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Generar token JWT con usuario y contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/', (req, res) => {
    const { user, password } = req.body;
    if (user === process.env.LOGIN_USER && password === process.env.LOGIN_PASSWORD) {
        const token = jwt.sign({ user }, 'clave_super_secreta', { expiresIn: '5m' });
        return res.json({ token });
    }
    return res.status(401).json({ error: 'Credenciales inválidas' });
});

module.exports = router;
