const axios = require('axios');

const SPRINGBOOT_API = process.env.SPRINGBOOT_API_URL || 'http://tu-api-springboot:8080/api';

const springbootService = {
  async getArbitros() {
    const response = await axios.get(`${SPRINGBOOT_API}/arbitros`);
    return response.data;
  },

  async getArbitroById(id) {
    const response = await axios.get(`${SPRINGBOOT_API}/arbitros/${id}`);
    return response.data;
  },

  async getPartidosArbitro(arbitroId) {
    const response = await axios.get(`${SPRINGBOOT_API}/arbitros/${arbitroId}/partidos`);
    return response.data;
  },

  async getLiquidaciones(arbitroId) {
    const response = await axios.get(`${SPRINGBOOT_API}/arbitros/${arbitroId}/liquidaciones`);
    return response.data;
  },

  async login(credentials) {
    const response = await axios.post(`${SPRINGBOOT_API}/auth/login`, credentials);
    return response.data;
  }
};

module.exports = springbootService;