const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Token no proporcionado',
      containerId: process.env.HOSTNAME || 'local'
    });
  }

  // Simulación de validación de token
  // En producción aquí validarías el JWT
  next();
};

module.exports = authMiddleware;