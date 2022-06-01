import asyncHandler from 'express-async-handler';
import Profile from '../models/Profile.js';


// DESC   - show all user profiles
// ROUTE  - /api/v1/profiles
// ACCESS - private

const showAllProfiles = asyncHandler(async(req, res) => {
    
    const profiles = await Profile.find();

    if(!profiles) {
        res.status(401)
        throw new Error("There are no current users, please check back later")
    } else {
        res.json(profiles)
    }

    
})

const createNewProfile = asyncHandler(async(req, res) => {

    const {
        bio, 
        profileImage, 
        favoriteBeer, 
        favoriteBrewery, 
        city,
        state,
        zipcode,
        occupation

    } = req.body;

    const profile = new Profile({
        user: req.user.id,
        bio: bio,
        profileImage: profileImage,
        favoriteBeer: favoriteBeer,
        favoriteBrewery: favoriteBrewery,
        city: city,
        state: state,
        zipcode: zipcode,
        occupation: occupation
    })

   await profile.save();

    res.send(profile);

})







export {
    showAllProfiles,
    createNewProfile
    
}