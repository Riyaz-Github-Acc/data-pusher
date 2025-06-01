import express from 'express'
import { createDestination, getDestination, updateDestination, deleteDestination, getDestinationsForAccountId } from '../controllers/destination.controller.js';

const router = express.Router();

router.post('/', createDestination);
router.put('/:id', updateDestination);
router.delete('/:id', deleteDestination);

router.get('/:id', getDestination);
router.get('/get-all/:accountId', getDestinationsForAccountId);

export default router;
