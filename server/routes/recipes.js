import express from 'express';
import { getFeedRecipes, getUserRecipes, likeRecipe } from '../controllers/recipes.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/', verifyToken, getFeedRecipes);
router.get('/:userId/recipes', verifyToken, getUserRecipes);
/* UPDATE */
router.patch('/:id/like', verifyToken, likeRecipe);

export default router;