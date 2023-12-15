import express from 'express';
import {
    getUser,
    getUserRecipes,
    removeRecipesFromUserList
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/:id', verifyToken, getUser);
router.get('/:id/likedRecipes', verifyToken, getUserRecipes);
/* UPDATE */
router.patch('/:id/:recipeId', verifyToken, removeRecipesFromUserList);

export default router;