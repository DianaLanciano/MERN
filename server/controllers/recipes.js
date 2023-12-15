import User from '../models/User.js';
import Recipe from '../models/Recipe.js';

/* CREATE */
export const createRecipe = async (req, res) => {
    try {
        const { requesterId, title, description, ingredients, level, picturePath } = req.body;
        const user = await User.findById(requesterId);

        const newRecipe = new Recipe({
            createdBy: requesterId,
            title,
            description,
            picturePath,
            userPicturePath: user.userPicturePath,
            ingredients,
            level,
            likes: {},
            comments: [],
        });

        await newRecipe.save();
        await user.recipeList.push(newRecipe._id);
        const recipe = await Recipe.find();// return list of the updated reciped array
        res.status(201).json(recipe);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

/* READ */
export const getFeedRecipes = async (req, res) => {
    try {
        const recipe = await Recipe.find();// return list of the updated reciped array
        res.status(200).json(recipe);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const getUserRecipes = async (req, res) => {

    try {
        const { userId } = req.body;
        const userRecipes = await Recipe.find({ createdBy: userId });
        res.status(200).json(userRecipes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
/* UPDATE */
export const likeRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const recipe = await Recipe.findById(id);
        const isLiked = recipe.likes.ger(userId);

        if (isLiked) {
            recipe.likes.delete(userId);
        } else {
            recipe.likes.set(userId, true);
        }
    } catch (error) {
        
    }
};