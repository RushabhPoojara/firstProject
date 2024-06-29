const express = require('express');
const zod = require('zod')
const jwt = require('jsonwebtoken')


const { JWT_SECRET } = require( './../config');
const { User , Account} = require('./../db');
const { authMiddleware } = require( './../middlewares');
const router = express.Router();

// //zod schema
const signupSchema = zod.object({
    username : zod.string().email(),
    firstName: zod.string(),
    lastName : zod.string(),
    password : zod.string().min(6),
})

//sign up
router.post('/signup', async function(req,res){


    //Input validation
    const ParsedInput = signupSchema.safeParse(req.body);

    if(!(ParsedInput.success)){
        return res.status(411). json({
            msg : "Inputs are of invalid formate"
        })
    }
    const user = await User.findOne({
        username : req.body.username
    })
    
    if(user) {
        return res.status(411).json({
                msg: 'Email already taken'
        })
    }
    
    const dbUser = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

    const userId = dbUser._id
    //account random balance allocation
    await Account.create({
        user : userId,
        balance: 1 + Math.random()*10000
    })

    const token = jwt.sign(userId.toJSON(), JWT_SECRET)
    res.status(200).json({
        msg: 'Created successfully',
        token : token
    })

})


const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

//sign in
router.post('/signin', async (req,res)=>{
   
    const ParsedSignin = signinBody.safeParse(req.body)

    if(!(ParsedSignin.success)){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }


    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    });

    if (user) {
        const userID = user._id
        const response = jwt.sign({
            userId: userID
            }, JWT_SECRET);

         return res.json({
                token: response
        })
    }

    else{
        return res.status(411).json({
            msg : 'Error while logging'
        })
    }
})

//zod validation for update
const updateschema = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

//Update
router.put('/update',authMiddleware, async (req,res) => {

    const Parsedata = updateschema.safeParse(req.body)
    
    if(!Parsedata.success){
        res.status(411).json({
            msg: "Error"
        })
    }
    
    await User.updateOne(req.body,{
        id: req.userId
    })
    

    res.json({
        msg: 'Updation successful'
    })
})

router.get('/bulk', async (req,res) => {
        const match = req.query.filter;

        const response = await User.find({
            $or : [{
                    firstName : { '$regex' : 'match'
                    }
                },{
                    lastName : { '$regex'  : 'match'}
                }]
            })

        return res.json({
            user : response.map(user => ({
                    username : user.username,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    _id: user._id
            }))
        })
})

module.exports = router;