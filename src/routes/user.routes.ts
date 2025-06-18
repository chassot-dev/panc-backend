import express from 'express';
import UserController from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { validateBody, validateParams } from '../middlewares/schema.middleware';
import {userSignUpSchema, userSignInSchema, userUpdateSchema } from '../schemas/user.schemas';
import { idParamSchema } from '../schemas/basic.schemas';

const router = express.Router();
const userController = new UserController();

router.get('/', authenticateToken, (req, res, next) => userController.getAllUsers(req, res, next));

router.get('/:id', authenticateToken, validateParams(idParamSchema), (req, res, next) => userController.userFindById(req, res, next));

router.post('/signup', validateBody(userSignUpSchema), (req, res, next) => userController.userSignUp(req, res, next)
);

router.post('/signin', validateBody(userSignInSchema), (req, res, next) => userController.userSignIn(req, res, next)
);

router.patch('/update/:id', authenticateToken, validateParams(idParamSchema), validateBody(userUpdateSchema), (req, res, next) => userController.userUpdateInfo(req, res, next)
);

export default router;
