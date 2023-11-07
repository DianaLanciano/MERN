import express from 'express';
import {
    getUser,
    getUserLikedRecipes,
    addRemoveLikedRecipes
} from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';

const routes = express.Router();

routes.get('/:id', verifyToken, getUser);
routes.get('/:id/likedRecipes', verifyToken, getUserLikedRecipes);

router.patch('/:id/:recipeId', verifyToken, addRemoveLikedRecipes);

export default routes;