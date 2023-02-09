const userServices = require('../services/userServices');

const addUser = async (req, res) => {
    try
    {
        const {name, password} = req.body;
        const newUser=await userServices.addUser(name, password);
        res.status(200).json({message: "User added successfully", newUser});
    }
    catch(err)
    {
        res.status(400).json({message: "User not added", err});
    }
};

const login = async (req, res) => {
    try
    {
       const matchUser=await userServices.login({...req.body});
         res.status(200).json({message: "User logged in successfully", matchUser});
    }
    catch(err)
    {
        res.status(400).json({message: "User not logged in", err});
    }
}

const verifyToken = async (req, res) => {
    try
    {
        const verifyToken=await userServices.verifyToken(req.headers.authorization);
        res.status(200).json({message: "Token verified successfully", verifyToken});
    }
    catch(err)
    {
        res.status(400).json({err});
    }
};

module.exports = {
    addUser,
    login,
    verifyToken
};
