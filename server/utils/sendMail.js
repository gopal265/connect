const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
const sendEmail = () => {
        
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                port:465,
                secure:true,
                secureConnection:false,
    
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS,
                },
                tls :{
                    rejectUnauthorized:true
                }
            });
            return transporter;
        }
module.exports = sendEmail;