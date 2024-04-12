import express from 'express';
import { eligibiltyCheckController } from '../controller/payments/eligibiltyCheckController.js';
import { subscribePlan } from '../controller/payments/subscribePlan.js';
import { updateSubscribeController } from '../controller/payments/updateSubscribeController.js';
import { activeSubscriptions } from '../controller/payments/activeSubscriptions.js';
const router = express.Router();

router.get("/eligibility_check",eligibiltyCheckController);
router.post("/subscribe",subscribePlan);
router.put("/update_subscribe",updateSubscribeController);
router.get("/active_subscriptions",activeSubscriptions);

export default router;