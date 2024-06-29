const express = require('express')
const innerRouter = require("./user")
const accountRouter = require('./account')


const router = express.Router();


router.use('/user', innerRouter);
router.use('/account', accountRouter);



module.exports = router;