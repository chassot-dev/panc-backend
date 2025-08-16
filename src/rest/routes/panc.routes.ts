import express from 'express';
import PancController from '../controllers/panc.controller';
import multer from 'multer';

const router = express.Router();
const pancController = new PancController();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/',  (req, res, next) => pancController.getAll(req, res, next));
router.post('/detect', upload.single('image'), (req, res) => { 
	console.log(req.file); 
	pancController.detect(req, res) })
router.get('/:id', (req, res, next) => pancController.findById(req, res, next));
router.patch('/update/:id', (req, res, next) => pancController.updateInfo(req, res, next));

export default router;
