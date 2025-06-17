import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import PermissionController from '../controllers/permissions.controller';

const router = express.Router();
const permissionController = new PermissionController();

router.get('/:id', authenticateToken, (req, res, next) => permissionController.findById(req, res, next));

export default router;