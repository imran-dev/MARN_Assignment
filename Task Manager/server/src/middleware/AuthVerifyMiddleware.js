let jwt        = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let Token = req.headers['token'];
    jwt.verify(Token, "SecretKey123456789", (err, decoded) => {
        if (err) {
            console.log(Token);
            res.status(401).json({status: "unauthorized"});
        } else {
            let email = decoded['data'];
            req.headers.email = email;
            next();
        }
    });
}