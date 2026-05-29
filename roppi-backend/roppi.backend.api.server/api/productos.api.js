const express = require('express');

// Importamos los gateways existentes para consumirlos (Aunque no deberíamos hacerlo acá)
/**
 * De hecho, toda esta implementación, debería estar en la clase ProductosServer. Acá, se hace momentaneamente la
 * implementación para evitar más confusiones y para no tener que modificar tanto código de golpe. En una refactorización futura, se debería mover toda
 * esta lógica a ProductosServer, y dejar esta clase solo como un router que delega a ProductosServer.
 */
const genericosGateway = require('../../roppi.backend.modulos/roppi.backend.modulos.productos/genericos.bo.js');
const coloresGateway = require('../../roppi.backend.modulos/roppi.backend.modulos.productos/colores.bo.js');
const materialesGateway = require('../../roppi.backend.modulos/roppi.backend.modulos.productos/materiales.bo.js');
const tamanosGateway = require('../../roppi.backend.modulos/roppi.backend.modulos.productos/tamanos.bo.js');
const personalizacionesGateway = require('../../roppi.backend.modulos/roppi.backend.modulos.productos/personalizaciones.bo.js');
const personalizadosGateway = require('../../roppi.backend.modulos/roppi.backend.modulos.productos/personalizados.bo.js');

class ProductosAPI {
  constructor() {
    this.router = express.Router();
    this.port = null;
    this.ipAddress = null;

    this._configurarRutas();
  }

  // Método interno para mapear rutas hacia el procesarConsulta
  _configurarRutas() {
    this.router.get('/genericos', async (req, res) => this.procesarConsulta(req, res, 'listarGenericos'));
    this.router.get('/colores', async (req, res) => this.procesarConsulta(req, res, 'listarColores'));
    this.router.get('/materiales', async (req, res) => this.procesarConsulta(req, res, 'listarMateriales'));
    this.router.get('/tamanos', async (req, res) => this.procesarConsulta(req, res, 'listarTamanos'));
    this.router.get('/personalizaciones', async (req, res) => this.procesarConsulta(req, res, 'listarPersonalizaciones'));
    this.router.get('/personalizados', async (req, res) => this.procesarConsulta(req, res, 'listarPersonalizados'));
    this.router.get('/', async (req, res) => this.procesarConsulta(req, res, 'listarPersonalizados'));
  }

  async procesarConsulta(request, response, accion) {
    try {
      let resultado = null;

      switch (accion) {
        case 'listarGenericos':
          resultado = await genericosGateway.findAll();
          break;
        case 'listarColores':
          resultado = await coloresGateway.findAll();
          break;
        case 'listarMateriales':
          resultado = await materialesGateway.findAll();
          break;
        case 'listarTamanos':
          resultado = await tamanosGateway.findAll();
          break;
        case 'listarPersonalizaciones':
          resultado = await personalizacionesGateway.findAll();
          break;
        case 'listarPersonalizados':
          resultado = await personalizadosGateway.findAll();
          break;
        default:
          return this.devolverError(response, 400, 'Acción no válida');
      }

      this.retornarRespuesta(response, 200, resultado);

    } catch (error) {
      console.error(`[ProductosAPI Error] ${accion}:`, error);
      this.devolverError(response, 500, 'Error interno del servidor procesando la consulta.');
    }
  }

  devolverError(response, status, mensaje) {
    return response.status(status).json({
      exito: false,
      error: mensaje
    });
  }

  retornarRespuesta(response, status, data) {
    return response.status(status).json({
      exito: true,
      datos: data
    });
  }
}

module.exports = ProductosAPI;