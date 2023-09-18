import nodemailer from "nodemailer"


  
const sendEmail = async (email, subject,otp) => {
    try {
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

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: `Your OTP for password reset is: ${otp}`,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};
export default   sendEmail;