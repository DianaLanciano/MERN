import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet  from 'helmet'; //Helmet helps secure Express apps by setting HTTP response headers.
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import recipesRoutes from './routes/recipes.js';
import { register } from './controllers/auth.js';
import { createRecipe } from './controllers/recipes.js';
import { verifyToken } from './middleware/auth.js';
import User from './models/User.js';
import Recipe from './models/Recipe.js';
import { users, recipes} from './data/index.js';


/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/.assets', express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null. file.originalname);
    }
});


const upload = multer({ storage: storage })
/* ROUTES WITH FILES */
app.post('/auth/register', upload.single('picture'), register);
/*
for allow a user to upload a picture when creating a recipe.
the 'picture' is where the img located in the http call
so the "upload.single('picture')" will take it and upload it to local storage
*/
app.post('/recipes', verifyToken,  upload.single('picture'), createRecipe); 

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/recipes', recipesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server Port Is Runnig On: ${PORT}`));
    console.log('Inserting Data...');
    
     if (!User.find() && !Recipe.find()) {
        User.insertMany(users);
        Recipe.insertMany(recipes);
     }
}).catch(error => console.log(`${error} did not connect`));