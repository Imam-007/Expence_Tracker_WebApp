const mailjet = require('node-mailjet').Client.apiConnect(
    API_KEY = '79c2ca1ed13af597d3136cd8d4141b33',
    API_SECRET = '245117d43678fa3e6128f27109bd2027'
);
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const User = require('../models/user-model');
const ForgetPassword = require('../models/forget-password');
const inputValidator = require('../util/input-validator');

//----------------------------------------------------------------------------------------------------

exports.forgetPassword = async(req, res, next) => {
    try{
        const email = req.params.email;
        const user = await User.findOne({where: {email: email}});

        if(user){
            const id = uuid.v4();
            await user.createForget_password({id, active: true});   

            const request = await mailjet.post('send').request({
                FromEmail: process.env.SIB_SENDER_EMAIL,
                FromName: process.env.SIB_SENDER_NAME,
                Subject: 'PASSWORD-RESET: Expense Tracker',
                'Text-part':
                  'Dear passenger, welcome to Mailjet! May the delivery force be with you!',
                'Html-part': `
                    <h1>Expense Tracker - Password Reset</h1><br>
                    <br>
                    <h3>Dear ${user.username},</h3><br>
                    <br>
                    <p>Please use the following link to </p> <a href="${process.env.BACKEND_ADDR}/password/resetpassword/${id}">reset</a> <p> your password.</p><br>
                    <br><br>
                    <h5>Thank You<h5><br>
                `,
                Recipients: [{ Email: email }],
            });  
            if(request)   
                res.status(200).json({message: `We have sent the password reset link to ${email}. Please check your spam for the reset email`});   
        }
        else{
            res.status(404).json({error: `${email} is not a registered email`});
        }
    }
    catch(err){
        console.log('Error-getResetPassword: ',err);
        res.status(500).json({error: 'Internal server error while sending reset password email'});
    }

};


exports.resetPassword = async (req, res, next) => {
    try{
        const requestId = req.params.id;
        const passwordRequest = await ForgetPassword.findOne({where: {id: requestId}});
        if(passwordRequest && passwordRequest.active){
                await passwordRequest.update({active: false});
                res.status(200).sendFile('reset-password.html',{root: 'views'});
        }
        else{
            res.status(401).json({error: 'Invalid request recieved'});
        }
    }
    catch(err){
        console.error('Error-getResetPassword: ',err);
        res.status(500).json({error: 'Internal Server Error while fetching password reset form'});
    }
};



exports.updatePassword = async (req, res, next) => {
    try{
        const requestId = req.body.requestId;
        const newPassword = req.body.newPassword;

        if(inputValidator.text(requestId) || inputValidator.text(newPassword)){
            return res.status(400).json({ error: 'bad input parameters' });
        }

        const passwordRequest = await ForgetPassword.findOne({where: {id: requestId}});
        if(passwordRequest){
            const user = await User.findOne({where: {id:passwordRequest.userId}});
            if(user){
                user.password = await bcrypt.hash(newPassword, 10);
                await user.save();
                res.status(200).json({message: 'password reset successful. Kindly login again.'});
            }
            else{
                return res.status(404).json({error: "User doesn't exists"});
            }
        }
        else{
            return res.status(404).json({error: "Invalid resuestID for password reset"});
        }
    }
    catch(err){
        console.error('Error-updatePassword: ',err);
        res.status(500).json({error: 'Internal Server Error while updating the password'});
    }
};
