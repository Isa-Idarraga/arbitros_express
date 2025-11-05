const express = require('express');
const router = express.Router();
const arbitroController = require('../controllers/arbitroController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Arbitro:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         documento:
 *           type: string
 *         email:
 *           type: string
 *         telefono:
 *           type: string
 *         categoria:
 *           type: string
 *         experiencia:
 *           type: string
 *         imagen:
 *           type: string
 */

/**
 * @swagger
 * /api/arbitros:
 *   get:
 *     summary: Obtener todos los árbitros
 *     tags: [Arbitros]
 *     responses:
 *       200:
 *         description: Lista de árbitros con sus imágenes
 */
router.get('/', arbitroController.getAllArbitros);

/**
 * @swagger
 * /api/arbitros/{id}:
 *   get:
 *     summary: Obtener un árbitro por ID
 *     tags: [Arbitros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del árbitro
 *       404:
 *         description: Árbitro no encontrado
 */
router.get('/:id', arbitroController.getArbitroById);

/**
 * @swagger
 * /api/arbitros/{arbitroId}/dashboard:
 *   get:
 *     summary: Obtener dashboard del árbitro
 *     tags: [Arbitros]
 *     parameters:
 *       - in: path
 *         name: arbitroId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dashboard con estadísticas del árbitro
 */
router.get('/:arbitroId/dashboard', arbitroController.getDashboard);

/**
 * @swagger
 * /api/arbitros/{arbitroId}/partidos:
 *   get:
 *     summary: Obtener partidos asignados al árbitro
 *     tags: [Arbitros]
 *     parameters:
 *       - in: path
 *         name: arbitroId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de partidos del árbitro
 */
router.get('/:arbitroId/partidos', arbitroController.getPartidosArbitro);

/**
 * @swagger
 * /api/arbitros/{arbitroId}/liquidaciones:
 *   get:
 *     summary: Obtener liquidaciones del árbitro
 *     tags: [Arbitros]
 *     parameters:
 *       - in: path
 *         name: arbitroId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de liquidaciones con resumen
 */
router.get('/:arbitroId/liquidaciones', arbitroController.getLiquidaciones);

module.exports = router;