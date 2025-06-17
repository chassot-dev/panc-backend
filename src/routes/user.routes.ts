import express from 'express';
import UserController from '../controllers/user.controller';

const router = express.Router();
const userController = new UserController();

router.post('/signup', (req, res, next) => userController.userSignUp(req, res, next));
router.get('/findEmail', (req, res, next) => userController.userFindByEmail(req, res, next));
router.get('/:id', (req, res, next) => userController.userFindById(req, res, next));

export default router;