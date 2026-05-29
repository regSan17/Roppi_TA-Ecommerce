require('dotenv').config({ path: '../.env' }); // Por si agregan variables en la raiz luego
const APIServer = require('./api.server');

async function main() {
  try {
    const server = new APIServer();
    await server.startServer();
  } catch (error) {
    console.error('No se pudo inicializar la API:', error);
    process.exit(1);
  }
}

main();
