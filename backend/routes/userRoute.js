import express from 'express';
import {
    registerUser, 
    loginUser, 
    getUserById, 
    getAllUsers
} from '../controllers/userController.js'

import {authUser} from '../middleware/authMiddleware.js'

const router = express.Router();


router.route('/register').post(registerUser)
router.route('/login').post(loginUser);
router.route('/allusers').get(getAllUsers);
router.route('/:id').get(authUser, getUserById);




export default router;