const User = require("../../../models/users");
const jwt = require('jsonwebtoken')

//signInUser
module.exports.signInUser = async function (req,res) {
    try {
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message:"Invalid username or password"
            })
        }
        return res.json(200,{
            message:"here is your token please keept is safe",
            data:{token:jwt.sign(user.toJSON(),"secret",{expiresIn:'1000000'})}
            })

        
    } catch (error) {
        console.log(error);
        return res.json(500,{
            message:"Internal Server Error"
        })
    }
    
}