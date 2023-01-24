const UsersModel       = require("../models/UsersModel");
const jwt              = require("jsonwebtoken");
const OTPModel         = require("../models/OTPModel");
const SendEmailUtility = require("../utility/SendEmailUtility");

// Registration
exports.registration = (req, res) => {
    let reqBody = req.body;
    UsersModel.create(reqBody, (error, result) => {
        if (error) {
            res.status(200).json({status: 'fail', data: error});
        } else {
            res.status(200).json({status: 'success', data: result});
        }
    });
}

exports.login = (req, res) => {
    let reqBody = req.body;
    UsersModel.aggregate([
        {$match: reqBody},
        {$project: {_id: 0, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1}}
    ], (error, result) => {
        if (error) {
            res.status(400).json({status: 'fail', data: error});
        } else {
            if (result.length > 0) {
                let Payload = {exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: result[0]['email']};
                let token   = jwt.sign(Payload, 'SecretKey123456789');
                res.status(200).json({status: 'success', token: token, data: result[0]});
            } else {
                res.status(401).json({status: 'unauthorized'});
            }
        }
    })
}

exports.profileUpdate = (req, res) => {
    let email   = req.headers['email'];
    let reqBody = req.body;
    let Query   = {email: email};
    UsersModel.updateOne(Query, reqBody, (error, result) => {
        if (error) {
            res.status(400).json({status: 'fail', data: error});
        } else {
            res.status(200).json({status: 'success', data: result});
        }
    });
}

exports.profileDetails = (req, res) => {
    let email = req.headers['email'];
    UsersModel.aggregate([
        {$match: {email: email}},
        {$project: {_id: 1, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1, password: 1}}
    ], (err, data) => {
        if (err) {
            res.status(400).json({status: "fail", data: err})
        } else {
            res.status(200).json({status: "success", data: data})
        }
    });
}

exports.RecoverVerifyEmail = async (req, res) => {
    let email   = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);
    try {
        // Email Account Query
        let UserCount = (await UsersModel.aggregate([{$match: {email: email}}, {$count: "total"}]));
        if (UserCount.length > 0) {
            // OTP Insert
            let CreateOTP = await OTPModel.create({email: email, otp: OTPCode});
            // Email Send
            let SendEmail = await SendEmailUtility(email, "Your PIN Code is= " + OTPCode, "Task Manager PIN Verification");
            res.status(200).json({status: "success", data: SendEmail});
        } else {
            res.status(200).json({status: "fail", data: "No User Found"});
        }
    } catch (err) {
        res.status(200).json({status: "fail", data: err});
    }
}

exports.RecoverVerifyOTP = async (req, res) => {
    let email        = req.params.email;
    let OTPCode      = req.params.otp;
    let status       = 0;
    let statusUpdate = 1;
    try {
        let OTPCount = await OTPModel.aggregate([{
            $match: {
                email : email,
                otp   : OTPCode,
                status: status
            }
        }, {$count: "total"}])
        if (OTPCount.length > 0) {
            let OTPUpdate = await OTPModel.updateOne({email: email, otp: OTPCode, status: status}, {
                email : email,
                otp   : OTPCode,
                status: statusUpdate
            })
            res.status(200).json({status: "success", data: OTPUpdate});
        } else {
            res.status(200).json({status: "fail", data: "Invalid OTP Code"});
        }
    } catch (e) {
        res.status(200).json({status: "fail", data: e});
    }
}

exports.RecoverResetPass = async (req, res) => {
    let email        = req.body['email'];
    let OTPCode      = req.body['OTP'];
    let NewPass      = req.body['password'];
    let statusUpdate = 1;

    try {
        let OTPUsedCount = await OTPModel.aggregate([{
            $match: {
                email : email,
                otp   : OTPCode,
                status: statusUpdate
            }
        }, {$count: "total"}])
        if (OTPUsedCount.length > 0) {
            let PassUpdate = await UsersModel.updateOne({email: email}, {
                password: NewPass
            })
            res.status(200).json({status: "success", data: PassUpdate});
        } else {
            res.status(200).json({status: "fail", data: "Invalid Request"});
        }
    } catch (e) {
        res.status(200).json({status: "fail", data: e});
    }
}