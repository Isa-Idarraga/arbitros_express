const authController = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email y password son requeridos',
          containerId: process.env.HOSTNAME || 'local'
        });
      }

      // Simulación de login
      res.json({
        success: true,
        message: 'Login exitoso',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ejemplo',
        arbitro: {
          id: 1,
          nombre: 'Carlos Mendoza',
          email: email
        },
        containerId: process.env.HOSTNAME || 'local'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        containerId: process.env.HOSTNAME || 'local'
      });
    }
  },

  async register(req, res) {
    try {
      const { nombre, email, password, documento } = req.body;
      
      if (!nombre || !email || !password || !documento) {
        return res.status(400).json({
          success: false,
          error: 'Todos los campos son requeridos',
          containerId: process.env.HOSTNAME || 'local'
        });
      }

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
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        containerId: process.env.HOSTNAME || 'local'
      });
    }
  }
};

module.exports = authController;