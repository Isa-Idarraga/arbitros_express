const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/partidos:
 *   get:
 *     summary: Obtener todos los partidos
 *     tags: [Partidos]
 *     responses:
 *       200:
 *         description: Lista de partidos
 */
router.get('/', (req, res) => {
  const partidos = [
    {
      id: 1,
      fecha: "2025-11-10",
      hora: "15:00",
      equipoLocal: "Millonarios",
      equipoVisitante: "Nacional",
      estadio: "El Campín",
      ciudad: "Bogotá",
      arbitroPrincipal: "Carlos Mendoza",
      estado: "Programado"
    },
    {
      id: 2,
      fecha: "2025-11-15",
      hora: "18:00",
      equipoLocal: "América",
      equipoVisitante: "Junior",
      estadio: "Pascual Guerrero",
      ciudad: "Cali",
      arbitroPrincipal: "Ana Martínez",
      estado: "Programado"
    },
    {
      id: 3,
      fecha: "2025-11-20",
      hora: "20:00",
      equipoLocal: "Medellín",
      equipoVisitante: "Cali",
      estadio: "Atanasio Girardot",
      ciudad: "Medellín",
      arbitroPrincipal: "Luis Rodríguez",
      estado: "Programado"
    }
  ];

  res.json({
    success: true,
    total: partidos.length,
    data: partidos,
    containerId: process.env.HOSTNAME || 'local',
    timestamp: new Date().toISOString()
  });
});

/**
 * @swagger
 * /api/partidos/{id}:
 *   get:
 *     summary: Obtener un partido por ID
 *     tags: [Partidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del partido
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const partido = {
    id: parseInt(id),
    fecha: "2025-11-10",
    hora: "15:00",
    equipoLocal: "Millonarios",
    equipoVisitante: "Nacional",
    estadio: "El Campín",
    ciudad: "Bogotá",
    arbitroPrincipal: {
      id: 1,
      nombre: "Carlos Mendoza",
      imagen: "https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro1.jpg"
    },
    arbitrosAsistentes: [
      {
        id: 2,
        nombre: "Ana Martínez",
        imagen: "https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro2.jpg"
      },
      {
        id: 3,
        nombre: "Luis Rodríguez",
        imagen: "https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro3.jpg"
      }
    ],
    estado: "Programado"
  };

  res.json({
    success: true,
    data: partido,
    containerId: process.env.HOSTNAME || 'local',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;