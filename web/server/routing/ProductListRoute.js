import express from 'express';
import { productlistController } from '../controller/products/productlistController.js';

const router = express.Router();

router.post("/productlist",productlistController);

export default router;