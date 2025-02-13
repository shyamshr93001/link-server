import express from 'express';
import {
  addResource,
  getResource,
  updateResource,
  deleteResource
} from '../controllers/resources.controller.js';

const router = express.Router();

router.post('/resources', addResource);
router.get('/resources', getResource);
router.put('/resources/:id', updateResource);
router.delete('/resources/:id', deleteResource);

export default router;