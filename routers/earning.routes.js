import express from 'express';
import { addPurchase } from '../controllers/earningController.js';

const router = express.Router();

router.post('/purchases', addPurchase);

export default router;
