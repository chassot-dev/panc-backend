import express from 'express';
import UserController from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();
const userController = new UserController();

router.post('/signup', (req, res, next) => userController.userSignUp(req, res, next));
router.post('/signin', (req, res, next) => userController.userSignIn(req, res, next));
router.patch('/update',  authenticateToken, (req, res, next) => userController.userSignIn(req, res, next));
router.get('/:id', authenticateToken, (req, res, next) => userController.userFindById(req, res, next));


export default router;