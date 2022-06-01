import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({

    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'user'
    },

    bio: {
        type: String,
        required: true
    },

    image: {
        type: Buffer,
        required: true
    },

    

    favoriteBeer: {
        type: String,
        required: true
    },

    favoriteBrewery: {
        type: String,
        required: true
    },

    favoriteTypeOfBeer: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    zipCode: {
        type: String,
        required: true
    },

    occupation: {
        type: String,
        required: true
    },

    favorites: [
        {
            beer: {
                type: String,
                required: true
            },

            brewery: {
                type: String,
                required: true
            },

            typeOfBeer: {
                type: String,
                required: true
            }

        }
    ],

    friends: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ]
})

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;