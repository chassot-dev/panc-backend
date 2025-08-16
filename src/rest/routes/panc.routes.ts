import express from 'express';
import PancController from '../controllers/panc.controller';
import multer from 'multer';

const router = express.Router();
const pancController = new PancController();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/',  (req, res, next) => pancController.getAll(req, res, next));
router.post('/detect', upload.single('image'), (req, res, next) => { pancController.detect(req, res, next) })
router.post('/', (req, res, next) => pancController.create(req, res, next));
router.get('/:id', (req, res, next) => pancController.findById(req, res, next));
router.put('/:id', (req, res, next) => pancController.updateInfo(req, res, next));

export default router;
