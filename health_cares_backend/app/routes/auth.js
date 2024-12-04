import express from 'express';

const router = express.Router();
import {authenticateToken, signin, signup} from '../controllers/auth';

router.post('/signup',signup);
router.post('/signin', signin);
router.get('/auth-state', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});
export default router;