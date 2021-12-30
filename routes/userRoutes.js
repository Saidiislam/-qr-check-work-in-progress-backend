const express = require('express');
const { checkIn, getMyCheck, getAdminCheckData } = require('../controller/checkController');
const router = express.Router();
const {
        registerUser,
        loginUser,
        getUserProfile, 
        updateUserProfile, 
        getUsers, 
        deleteUsers, 
        getUserById, 
        updateUser, 
        getAllUsersForOptions
} = require('../controller/userController');
const {protect, admin} = require('../middleware/authUserMiddleware');

router.route('/check').get(protect, getMyCheck)
router.route('/select').get(protect, getAllUsersForOptions).post(protect, checkIn);
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/adcheck').get(protect,admin, getAdminCheckData)
router.route('/profile').get(protect,getUserProfile).post(protect, updateUserProfile);
router.route('/login').post(loginUser);
router.route('/:id')
.delete(protect, admin, deleteUsers)
.get(protect, admin, getUserById)
.put(protect, admin, updateUser);

module.exports = router;