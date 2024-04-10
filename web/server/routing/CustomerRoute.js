import express from 'express';
import { customerAddController } from '../controller/customer/customerAddController.js';
import { customerlistController } from '../controller/customer/customerlistController.js';
import { customerUpdateController } from '../controller/customer/customerUpdateController.js';
import { deleteCustomerController } from '../controller/customer/deleteCustomerController.js';
const router = express.Router();

router.post('/add',customerAddController);
router.post('/list',customerlistController);
router.put('/update',customerUpdateController);
router.delete('/delete',deleteCustomerController);

export default router;