import { FastifyInstance } from 'fastify';
import { systemConfigDb } from '../db/index.js';

export async function publicConfigRoutes(fastify: FastifyInstance) {
  fastify.get('/system-settings', async () => {
    const cfg = systemConfigDb.get('allow_registration');
    return { allowRegistration: !(cfg && cfg.value === 'false') };
  });
}

