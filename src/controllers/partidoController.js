const partidoController = {
  async getAllPartidos(req, res) {
    try {
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
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        containerId: process.env.HOSTNAME || 'local'
      });
    }
  },

  async getPartidoById(req, res) {
    try {
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
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        containerId: process.env.HOSTNAME || 'local'
      });
    }
  }
};

module.exports = partidoController;