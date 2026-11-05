/**
 * Vercel Serverless Function Entry Point for LOOT PERFUMES API
 * Proxies requests to the core server requestHandler
 */
const path = require('path');
const serverHandler = require('../server.js');

module.exports = async (req, res) => {
  return serverHandler(req, res);
};

