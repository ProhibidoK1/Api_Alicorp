const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { listarArchivosCSV, leerCSV } = require('../utils/azureBlob');

/**
 * @openapi
 * /api/blob/list:
 *   get:
 *     summary: Lista los archivos CSV disponibles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de archivos CSV
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/list', authMiddleware, async (req, res) => {
    const archivos = await listarArchivosCSV();
    res.json(archivos);
});

/**
 * @openapi
 * /api/blob/data/{filename}:
 *   get:
 *     summary: Leer contenido de un archivo CSV
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del archivo CSV
 *     responses:
 *       200:
 *         description: Contenido del CSV
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/data/:filename', authMiddleware, async (req, res) => {
    const data = await leerCSV(req.params.filename);
    res.json(data);
});

module.exports = router;
