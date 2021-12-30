const User = require('../model/userModel');
const generateToken = require('../utils/genarateToken');

// user register api/users/register

exports.registerUser = async (req,res) =>{
    const {name, email, password } = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    };
    const user = await User.create({name, email, password});
    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
}

exports.loginUser = async (req, res) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id : user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
}

exports.getUserProfile = async (req, res) =>{
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(404);
        throw new Error('User not found');
    }
}

exports.updateUserProfile = async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password
        }
        const updateUser = await user.save();
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id)
        })
    }else{
        res.status(404);
        throw new Error('User Not found');
    }
}

exports.getUsers = async (req, res)=>{
    const users = await User.find({});
    res.json(users);
}

exports.deleteUsers = async(req, res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        await user.remove();
        res.json({message: "User removed"});
    }else{
        res.status(404)
        throw new Error("User not found");
    }
}

exports.getUserById = async (req, res)=>{
    const user = await User.findById(req.params.id).select('-password');
    if(user){
        res.json(user);
    }else{
        res.status(404)
        throw new Error('User not found');
    }
}

exports.updateUser = async (req, res) =>{
    const user = await User.findById(req.params.id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin;
        const updateUser = await user.save();
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        })
    }else{
        res.status(404);
        throw new Error('User Not found');
    }
}

exports.getAllUsersForOptions = async (req, res)=>{
    const users = await User.find({});
    // const id = users._id;
    // const name = users.name;
    // const data = users.forEach(d => {
    //     return d;
    // });
    // for (let i = 0; i < users.length; i++) {
    //     const element = users[i];
    //     console.log(element);
    // }
    const data = users.map(user => {
        const id = user._id;
        const name = user.name
        return {id,name};
    })
    // console.log(data);
    res.json(data);
}
