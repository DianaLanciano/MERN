import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // make multiple api calls to the DB sp we using promise.all
    const recipes = await Promise.all(
      user.recipeList.map((recipeId) => Recipe.findById(recipeId))
    );

    console.log(recipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* UPDATE */
export const removeRecipesFromUserList = async (req, res) => {
  const { userId, recipeId } = req.params;
  const user = await User.findById(userId);

  try {
    user.recipeList = user.recipeList.filter(
      (recipeIdFromUserList) => recipeIdFromUserList !== recipeId
    );
    await user.save();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
