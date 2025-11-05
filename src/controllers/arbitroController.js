const springbootService = require('../services/springbootService');

// URLs de las imágenes en S3 - 10 árbitros
const arbitrosData = [
  {
    id: 1,
    nombre: "Carlos Mendoza",
    documento: "123456789",
    email: "carlos.mendoza@arbitros.com",
    telefono: "+57 300 1234567",
    categoria: "Nacional",
    experiencia: "5 años",
    imagen: "https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro1.jpg"
  },
  {
    id: 2,
    nombre: "Ana Martínez",
    documento: "987654321",
    email: "ana.martinez@arbitros.com",
    telefono: "+57 301 2345678",
    categoria: "Nacional",
    experiencia: "8 años",
    imagen: "https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro2.jpg"
  },
  {
    id: 3,
    nombre: "Luis Rodríguez",
    documento: "456789123",
    email: "luis.rodriguez@arbitros.com",
    telefono: "+57 302 3456789",
    categoria: "Internacional",
    experiencia: "10 años",
    imagen: "https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro3.jpg"
  },
  {
    id: 4,
    nombre: "María González",
    documento: "789123456",
    email: "maria.gonzalez@arbitros.com",
    telefono: "+57 303 4567890",
    categoria: "Regional",
    experiencia: "3 años",
    imagen: "https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro4.jpg"
  },
  {
    id: 5,
    nombre: "Jorge Hernández",
    documento: "321654987",
    email: "jorge.hernandez@arbitros.com",
    telefono: "+57 304 5678901",
    categoria: "Nacional",
    experiencia: "7 años",
    imagen: "https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro5.jpg"
  },
  {
    id: 6,
    nombre: "Patricia Silva",
    documento: "654987321",
    email: "patricia.silva@arbitros.com",
    telefono: "+57 305 6789012",
    categoria: "Internacional",
    experiencia: "12 años",
    imagen: "https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro6.jpg"
  },
  {
    id: 7,
    nombre: "Ricardo Pérez",
    documento: "147258369",
    email: "ricardo.perez@arbitros.com",
    telefono: "+57 306 7890123",
    categoria: "Nacional",
    experiencia: "6 años",
    imagen: "https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro7.jpg"
  },
  {
    id: 8,
    nombre: "Sandra Torres",
    documento: "369258147",
    email: "sandra.torres@arbitros.com",
    telefono: "+57 307 8901234",
    categoria: "Regional",
    experiencia: "4 años",
    imagen: "https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro8.jpg"
  },
  {
    id: 9,
    nombre: "Miguel Ángel Vargas",
    documento: "258147369",
    email: "miguel.vargas@arbitros.com",
    telefono: "+57 308 9012345",
    categoria: "Nacional",
    experiencia: "9 años",
    imagen: "https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro9.jpg"
  },
  {
    id: 10,
    nombre: "Laura Ramírez",
    documento: "741852963",
    email: "laura.ramirez@arbitros.com",
    telefono: "+57 309 0123456",
    categoria: "Internacional",
    experiencia: "11 años",
    imagen: "https://arbitros-imagenes-2025.s3.us-east-1.amazonaws.com/arbitro10.jpg"
  }
];

const arbitroController = {
  // Obtener todos los árbitros con sus imágenes
  async getAllArbitros(req, res) {
    try {
      res.json({
        success: true,
        total: arbitrosData.length,
        data: arbitrosData,
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

  // Obtener un árbitro por ID
  async getArbitroById(req, res) {
    try {
      const { id } = req.params;
      const arbitro = arbitrosData.find(a => a.id === parseInt(id));
      
      if (!arbitro) {
        return res.status(404).json({ 
          success: false, 
          error: 'Árbitro no encontrado',
          containerId: process.env.HOSTNAME || 'local'
        });
      }

      res.json({
        success: true,
        data: arbitro,
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

  // Dashboard del árbitro con estadísticas
  async getDashboard(req, res) {
    try {
      const { arbitroId } = req.params;
      const arbitro = arbitrosData.find(a => a.id === parseInt(arbitroId));
      
      if (!arbitro) {
        return res.status(404).json({ 
          success: false, 
          error: 'Árbitro no encontrado',
          containerId: process.env.HOSTNAME || 'local'
        });
      }

      const dashboard = {
        arbitro: arbitro,
        estadisticas: {
          partidosArbitrados: Math.floor(Math.random() * 50) + 30,
          partidosPendientes: Math.floor(Math.random() * 5) + 1,
          liquidacionTotal: Math.floor(Math.random() * 3000000) + 1000000,
          promedioCalificacion: (Math.random() * 1.5 + 3.5).toFixed(1)
        },
        proximosPartidos: [
          {
            id: 1,
            fecha: "2025-11-10",
            hora: "15:00",
            equipoLocal: "Millonarios",
            equipoVisitante: "Nacional",
            estadio: "El Campín",
            ciudad: "Bogotá"
          },
          {
            id: 2,
            fecha: "2025-11-15",
            hora: "18:00",
            equipoLocal: "América",
            equipoVisitante: "Junior",
            estadio: "Pascual Guerrero",
            ciudad: "Cali"
          }
        ],
        ultimasLiquidaciones: [
          {
            id: 1,
            fecha: "2025-10-28",
            partido: "Millonarios vs Nacional",
            monto: 350000,
            estado: "Pagado"
          },
          {
            id: 2,
            fecha: "2025-10-20",
            partido: "Junior vs América",
            monto: 400000,
            estado: "Pagado"
          }
        ]
      };

      res.json({
        success: true,
        data: dashboard,
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

  // Obtener partidos asignados a un árbitro
  async getPartidosArbitro(req, res) {
    try {
      const { arbitroId } = req.params;
      const arbitro = arbitrosData.find(a => a.id === parseInt(arbitroId));
      
      if (!arbitro) {
        return res.status(404).json({ 
          success: false, 
          error: 'Árbitro no encontrado',
          containerId: process.env.HOSTNAME || 'local'
        });
      }

      const partidos = [
        {
          id: 1,
          fecha: "2025-11-10",
          hora: "15:00",
          equipoLocal: "Millonarios",
          equipoVisitante: "Nacional",
          estadio: "El Campín",
          ciudad: "Bogotá",
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
          estado: "Programado"
        },
        {
          id: 3,
          fecha: "2025-10-28",
          hora: "20:00",
          equipoLocal: "Santa Fe",
          equipoVisitante: "Tolima",
          estadio: "El Campín",
          ciudad: "Bogotá",
          estado: "Finalizado"
        }
      ];

      res.json({
        success: true,
        arbitro: arbitro,
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

  // Obtener liquidaciones de un árbitro
  async getLiquidaciones(req, res) {
    try {
      const { arbitroId } = req.params;
      const arbitro = arbitrosData.find(a => a.id === parseInt(arbitroId));
      
      if (!arbitro) {
        return res.status(404).json({ 
          success: false, 
          error: 'Árbitro no encontrado',
          containerId: process.env.HOSTNAME || 'local'
        });
      }

      const liquidaciones = [
        {
          id: 1,
          fecha: "2025-10-28",
          partido: "Santa Fe vs Tolima",
          categoria: "Liga BetPlay",
          montoBase: 300000,
          bonificacion: 50000,
          deducciones: 0,
          montoTotal: 350000,
          estado: "Pagado",
          fechaPago: "2025-10-30"
        },
        {
          id: 2,
          fecha: "2025-10-20",
          partido: "Junior vs América",
          categoria: "Liga BetPlay",
          montoBase: 350000,
          bonificacion: 50000,
          deducciones: 0,
          montoTotal: 400000,
          estado: "Pagado",
          fechaPago: "2025-10-22"
        },
        {
          id: 3,
          fecha: "2025-11-10",
          partido: "Millonarios vs Nacional",
          categoria: "Liga BetPlay",
          montoBase: 300000,
          bonificacion: 0,
          deducciones: 0,
          montoTotal: 300000,
          estado: "Pendiente",
          fechaPago: null
        }
      ];

      const resumen = {
        totalPagado: liquidaciones
          .filter(l => l.estado === "Pagado")
          .reduce((sum, l) => sum + l.montoTotal, 0),
        totalPendiente: liquidaciones
          .filter(l => l.estado === "Pendiente")
          .reduce((sum, l) => sum + l.montoTotal, 0),
        cantidadPagadas: liquidaciones.filter(l => l.estado === "Pagado").length,
        cantidadPendientes: liquidaciones.filter(l => l.estado === "Pendiente").length
      };

      res.json({
        success: true,
        arbitro: arbitro,
        resumen: resumen,
        data: liquidaciones,
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

module.exports = arbitroController;