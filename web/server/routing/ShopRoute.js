import  express from 'express';
import { updateShopDetails } from '../controller/shopDetails/updateShopDetails.js';
import { editShopDetails } from '../controller/shopDetails/editShopDetails.js';
import { getShopDetails } from '../controller/shopDetails/getShopDetails.js';

const router =  express.Router();
router.get("/update",updateShopDetails);
router.post("/edit",editShopDetails);
router.get("/details",getShopDetails);
export default router;