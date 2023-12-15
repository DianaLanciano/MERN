import mongoose from "mongoose";


const RecipeSchema = new mongoose.Schema(
    {
        createdBy:{
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
          min: 2,
          max: 50,
        },
        description: {
          type: String,
          required: true,
          min: 10,
          max: 1000,
        },
        picturePath: {
          type: String,
          default: "",
        },
        userPicturePath: {
          type: String,
          default: "",
        },
        ingredients: {
          type: Array,
          default: [],
        },
        level: {
          type: String,
          enum : ['EASY','MODERATE', 'HARD'],
          default: 'EASY',
        },
        likes: {
          type: Map,
          of: Boolean,
        },
        comments: {
          type: Array,
          default: [],
        }
      },
      { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;