const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const authRoutes = require('./routes/authRoutes');
const arbitroRoutes = require('./routes/arbitroRoutes');
const partidoRoutes = require('./routes/partidoRoutes');

const app = express();

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Árbitros Express',
      version: '1.0.0',
      description: 'API REST para gestión de árbitros con imágenes en S3',
      contact: {
        name: 'API Support',
        email: 'soporte@arbitros.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ],
    tags: [
      {
        name: 'Auth',
        description: 'Autenticación de árbitros'
      },
      {
        name: 'Arbitros',
        description: 'Gestión de árbitros'
      },
      {
        name: 'Partidos',
        description: 'Gestión de partidos'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz con información de la API
app.get('/', (req, res) => {
  res.json({
    message: '🏆 API de Árbitros - Express',
    version: '1.0.0',
    containerId: process.env.HOSTNAME || 'local',
    timestamp: new Date().toISOString(),
    endpoints: {
      swagger: '/api-docs',
      health: '/health',
      arbitros: '/api/arbitros',
      auth: '/api/auth',
      partidos: '/api/partidos'
    }
  });
});

// Ruta de salud con ID del contenedor (importante para verificar Docker Swarm)
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Arbitros API',
    containerId: process.env.HOSTNAME || 'local',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Árbitros - Documentación'
}));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/arbitros', arbitroRoutes);
app.use('/api/partidos', partidoRoutes);

// Ruta para verificar las imágenes de S3
app.get('/api/imagenes', (req, res) => {
  const imagenes = [
    'https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro1.jpg',
    'https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro2.jpg',
    'https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro3.jpg',
    'https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro4.jpg',
    'https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro5.jpg',
    'https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro6.jpg',
    'https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro7.jpg',
    'https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro8.jpg',
    'https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro9.jpg',
    'https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro10.jpg'
  ];

  res.json({
    success: true,
    total: imagenes.length,
    data: imagenes,
    containerId: process.env.HOSTNAME || 'local'
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    path: req.path,
    containerId: process.env.HOSTNAME || 'local'
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Error interno del servidor',
    containerId: process.env.HOSTNAME || 'local'
  });
});

module.exports = app;