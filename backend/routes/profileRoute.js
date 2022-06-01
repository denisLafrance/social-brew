import express from 'express';
import {showAllProfiles, createNewProfile} from '../controllers/profileController.js';
import {authUser} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/allprofiles').get(authUser, showAllProfiles);
router.route('/').post(authUser, createNewProfile);

export default router;