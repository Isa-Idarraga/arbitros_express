const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de árbitro
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simulación de login
  if (email && password) {
    res.json({
      success: true,
      message: 'Login exitoso',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      arbitro: {
        id: 1,
        nombre: 'Carlos Mendoza',
        email: email
      },
      containerId: process.env.HOSTNAME || 'local'
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Credenciales inválidas',
      containerId: process.env.HOSTNAME || 'local'
    });
  }
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registro de nuevo árbitro
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               documento:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro exitoso
 */
router.post('/register', (req, res) => {
  const { nombre, email, password, documento } = req.body;
  
  res.status(201).json({
    success: true,
    message: 'Árbitro registrado exitosamente',
    arbitro: {
      id: Math.floor(Math.random() * 1000),
      nombre,
      email,
      documento
    },
    containerId: process.env.HOSTNAME || 'local'
  });
});

module.exports = router;