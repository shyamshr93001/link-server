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

export default router;