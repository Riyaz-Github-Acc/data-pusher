import express from 'express'
import { createAccount, deleteAccount, getAccount, updateAccount } from '../controllers/account.controller.js';

const router = express.Router();

router.get('/:id', getAccount);
router.post('/', createAccount);
router.put('/:id', updateAccount);
router.delete('/:id', deleteAccount);

export default router;
