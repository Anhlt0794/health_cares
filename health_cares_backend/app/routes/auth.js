import express from 'express';

const router = express.Router();
import {signin, signup} from '../controllers/auth';

router.post('/signup',signup);
router.get('/signin', signin);
export default router;