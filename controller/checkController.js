const CheckIn = require('../model/checkModel');
exports.checkIn = async (req,res) =>{
    const {name, check} = req.body;
    const checked = new CheckIn({
        user: req.user._id,
        name,
        check
    })
    const data = await checked.save();
    if(data){
        res.json(data);
    }
}

exports.getMyCheck = async (req, res) => {
    // console.log(req)
    const checkData = await CheckIn.find({ user: req.user._id });
    res.json(checkData)
    // console.log(orders);
};

exports.getAdminCheckData = async (req, res) => {
    const checkAll = await CheckIn.find({})
    res.json(checkAll)
};
