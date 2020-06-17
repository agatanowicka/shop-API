const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authorizationHeader = req.get('Authorization');
    if (!authorizationHeader) {
        return next();
    }
    const token = authorizationHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.KEY);
    } catch (err) {
        res.send(401);
        return;
    }
    if (!decodedToken) {
        res.send(401);
        return;
    }
    req.userId = decodedToken.userId;
    next();
};