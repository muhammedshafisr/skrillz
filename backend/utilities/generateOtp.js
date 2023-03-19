const nodemailer = require("nodemailer");
require("dotenv").config();
const bcrypt = require("bcrypt");
const OtpVerification = require("../models/userOtpVerification");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
})


module.exports =  async ( _id, email ) => {
    try {
        const otp = `${ Math.floor(1000 + Math.random() * 9000) }`;

        // mail option
        const mailOptions = {
            from : process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify your Email",
            html: `<p>Enter ${otp}</b> in the app to verify your email address and complete your signup</p>
            <p>This code <b>expires in 5 minutes</b>.</p>`
        }

        // hash the otp 
        const saltRounds = 10;

        const hashedOtp = await bcrypt.hash(otp, saltRounds);

        const newOtpVerification = await OtpVerification.create({
            userId: _id,
            otp: hashedOtp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 300000
        })

       const response = await transporter.sendMail(mailOptions, (err) => {
            if(err) {
                console.log(err)
            } else {
                console.log("email has send")
            }

            return response;

        })


    } catch (error) {
        console.log(error)
    }
}