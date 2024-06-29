const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')

const authMiddleware = (req,res,next)=> {

    const auth = req.headers.authorization;

    if(!auth || !(auth.startsWith('Bearer '))){
        return res.status(403).json({
            msg: 'Invalid user input'
        })
    }
    const token = auth.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded.user;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
}

module.exports = {authMiddleware};