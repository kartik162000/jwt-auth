const bcrypt = require("bcrypt")
const db=require('../models');
const jwt = require("jsonwebtoken");

const addUser = async (name,password) => {
    password = await bcrypt.hash(password, 10);
    return await db.User.create({name, password});
};
const login = async ({name, password}) => {
    const user = await db.User.findOne({where: {name}});
    console.log(user);
    if(!user) throw new Error("User not found");
    else
    {
        const match = await bcrypt.compare(password, user.password);
        if(!match) throw new Error("Password does not match");
        else
        {
            const token=jwt.sign({name}, "secretkey", {expiresIn: "1h"});
            return {success: true, token};
        }
    }

}

const verifyToken = async (token) => {
        const bearerToken = token.split(" ")[1];
        const decoded = jwt.verify(bearerToken, "secretkey");
        if(decoded) 
        {
                const user = await db.User.findOne({where: {name: decoded.name}});
                if(!user) throw new Error("User not found");
                else
                return {success: true, user};
        }
        else
        throw new Error("Token not verified");
}


module.exports = {
    addUser,
    login,
    verifyToken
};
