import express from 'express';
import { eligibiltyCheckController } from '../controller/payments/eligibiltyCheckController.js';
const router = express.Router();

router.get("/eligibility_check",eligibiltyCheckController);

export default router;