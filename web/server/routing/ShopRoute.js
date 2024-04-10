import  express from 'express';
import { updateShopDetails } from '../controller/shopDetails/updateShopDetails.js';
import { editShopDetails } from '../controller/shopDetails/EditShopDetails.js';
const router =  express.Router();
router.get("/update",updateShopDetails);
router.post("/edit",editShopDetails);
export default router;