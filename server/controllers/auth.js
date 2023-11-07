import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        //destructuring params from request body
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            recipeList,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            recipeList,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });

        const savedUser = await newUser.save(); //document inserted into the collection
        res.status(201).json(savedUser); //send status to front
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};


/* LOGIN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ emai: email });
        if (!user) return  res.status(400).json({msg: 'User does not exsit.'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) res.status(400).json({msg: 'Invalid credentials.'});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password; //prevent send to front
        res.status(200).json({ token, user });

    } catch (error) {
        res.status(500).json({error: err.message});
    }
};