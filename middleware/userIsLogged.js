const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // const authorizationHeader = req.get('Authorization');
    // if (!authorizationHeader) {
    //     error.statusCode = 401;
    // }
    // const token = authorizationHeader.split(' ')[1];
    // let decodedToken;
    // try {
    //     decodedToken = jwt.verify(token, 'extrasupersecretkey');
    // } catch (err) {
    //     err.statusCode = 500;
    // }
    // if (!decodedToken) {
    //     error.statusCode = 401;
    // }
    // req.userId = decodedToken.userId;
    // 5e85ee4fa3c5f903185170c1
    req.userId = '5e876ffcb5eb4f109866a10d';
    next();
};