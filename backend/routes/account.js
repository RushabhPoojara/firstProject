const express = require('express')
const { authMiddleware } = require('./../middlewares');
const {default : mongoose} = require("mongoose")
const { Account} = require('./../db');

const router = express.Router();

router.get('/balance', authMiddleware,async (req,res)=> {

    const user = req.user;
    const account = await Account.findOne({
        user : user
    })
    if (account) {
        return res.json({
          balance: account.balance
        });
      } else {
        return res.status(404).json({ error: 'Account not found' });
      }

});


router.post('./transfer',authMiddleware,async (req,res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    const {to, amount} = req.body;

    const fromAccount = await Account.findOne({
        userId : req.userId
    }).session(session);

    if(!fromAccount || fromAccount.balance <=0){
        session.abortTransaction();
        return res.status(400).json({
            msg: 'User Account does not exist or have insufficient balance'
        })
    }
    const toAccount = Account.findOne({
        userId : to
    }).session(session)

    if(!toAccount){
        session.abortTransaction();
        return res.json({
            msg: 'Sending Account does not exist'
        })
    }

    //transfer logic
    //first subtracting from sender account then incrementing into receiver account
    await Account.updateOne({
        userId : fromAccount},{ '$inc' : {balance:  - amount}
    }).session(session);

    await Account.updateOne({
        userId : toAccount} , {
            '$inc' : { balance : amount }
        }).session(session)
    
    //ending transaction
    await session.commitTransaction();

    res.json({
        msg: "Transfer successful"
    })

})

module.exports = router;