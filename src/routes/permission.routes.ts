import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import PermissionController from '../controllers/permissions.controller';
import { idParamSchema } from '../schemas/basic.schemas';
import { validateParams } from '../middlewares/schema.middleware';

const router = express.Router();
const permissionController = new PermissionController();

router.get('/', authenticateToken, (req, res, next) => permissionController.getAll(req, res, next));
router.get('/:id', authenticateToken, validateParams(idParamSchema), (req, res, next) => permissionController.findById(req, res, next));

export default router;