import express from 'express'
import { postDataHandler } from '../controllers/data-handler.controller.js';

const router = express.Router();

router.post('/incoming_data', postDataHandler);

router.all('/incoming_data', (req, res) => {
    res.status(405).json({ error: "Invalid Method" });
});

export default router;
