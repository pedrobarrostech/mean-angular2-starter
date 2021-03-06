import express from 'express';
import userRoutes from './user';
import clientRoutes from './client';
import authRoutes from './auth';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount user routes at /clients
router.use('/clients', clientRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
