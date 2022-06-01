import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import emailValidator from 'email-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';




// DESC   - Register a new user and store in DB
// ROUTE  - /api/v1/register
// ACCESS - PUBLIC
const registerUser = asyncHandler(async(req, res) => {

    // get the data from the body
    const {firstName, lastName, email, password} = req.body;


            // check if the user already exists
        let user = await User.findOne({email})

        // If user exists throw error
        if(user) {
            res.status(400)
            throw new Error('User already exists, please try to login instead');
        }

        // if the user exists validate the form
        if(firstName === '' || lastName === '' || email === '' || password === '') {
            res.status(400)
            throw new Error('Fields cannot be blank, please fill in all the fields')
        }

        // check if first name passes validation
        if(firstName.length <= 3) {
            res.status(400)
            throw new Error('First name must be at least 3 characters long')
        }

        //chack if last name passes validation
        if(lastName.length <= 3) {
            res.status(400) 
            throw new Error("Last name must be at least 3 characters long")
        }


        // if email passes validation
        if(emailValidator.validate(email) === false) {
            res.status(400)
            throw new Error('Please enter a valid email address')
        }  

        user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save the user to DB
       await user.save()

        //implement JWT
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: 35000}, 
            (err, token) => {
                if(err) throw err;
                res.json({
                    id: user._id,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    email: user.email,
                    token
                })
            }
        )


   

})



// DESC   - Login a user
// ROUTE  - /api/v1/login
// ACCESS - PUBLIC
const loginUser = asyncHandler(async(req, res) => {

    // the the req.body info
   const {email, password} = req.body;

   
    //VALIDATE THE EMAIL AND PASSWORD
    if(email === '' || password === '') {
        res.status(400)
        throw new Error("Fields cannot be blank please enter an email and password")
    }

    if(password.length <= 5) {
        res.status(400);
        throw new Error('Password must be at least 6 characters long')
    }

    //CHECK IF THE USER EXISTS
    const user = await User.findOne({email})

    if(!user) {
        res.status(400);
        throw new Error('User does not exist, please create a profile!')
    }

    //COMPARE THE BCRYPTED PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        res.status(400)
        throw new Error('Invalid credentails, please try again')
    }

    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: 35000},
        (err, token) => {
            if(err) throw err
            res.json({
                user: user._id,
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                token: token
            })
        }
    )

  //  console.log(req.user)
   

})


// DESC   - GET the user by id
// ROUTE  - /api/v1/user/:id
// ACCESS - PUBLIC
const getUserById = asyncHandler(async(req, res) => {
   
    const user = await User.findById(req.params.id).select('-password')
    console.log("User id is:" + req.user.id)
    const profile = await Profile.findById(req.user.id);
   

    if(!user) {
        res.status(500)
        throw new Error('User does not exist with that ID, please try again!')
    }

    if(!profile) {
        res.json({
            user: user._id,
            isAdmin: user.isAdmin,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profile: false
        })
    } else {
        res.json({
            user: user._id,
            isAdmin: user.isAdmin,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profile: true
        })
    }

  //  res.send(user)
})

// DESC - GET all the users
// ROUTE - /api/v1/users
// ACCESS - PUBLIC
const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find();

    res.json(users);
})

export {
    registerUser,
    loginUser,
    getUserById,
    getAllUsers
}



