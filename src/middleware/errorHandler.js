const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Error interno del servidor',
    containerId: process.env.HOSTNAME || 'local',
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;