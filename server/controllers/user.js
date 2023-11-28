const User = require("../models/User");
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv")
const jwt = require('jsonwebtoken');
const Post = require("../models/Post");
const { generateOTP } = require("../utils/generateOTP");
const VerificationToken = require("../models/VerificationToken");
const JWTSEC = "#2@!@$ndja45883 r7##";
const ResetToken = require("../models/ResetToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendMail")

dotenv.config();
exports.register = async (req, res) => {


    try {
        const { username, email, password, profile, phonenumber } = req.body;
        const user = await User.findOne({ email: email });

        if (user) {
            return res.status(200).json("Please login with correct password")
        };

        const salt = await bcrypt.genSalt(10);
        const encryptPass = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            username: username,
            email: email,
            password: encryptPass,
            profile: profile,
            phonenumber: phonenumber
        })

        const OTP = generateOTP();
        const verificationToken = await VerificationToken.create({
            user: newUser._id,
            token: OTP
        });

        verificationToken.save();
        await newUser.save();

        await sendEmail().sendMail({
            from: process.env.USER,
            to: newUser.email,
            subject: "Verify your email using OTP",
            html: `<h1>Your OTP CODE ${OTP}</h1>`
        })
        res.status(200).json({ Status: "Pending", msg: "Please check your email", user: newUser._id })

    } catch (error) {
        return res.status(500).json("Internal error occured")
    }
}

exports.verifyMail = async (req, res) => {

    try {

        const { user, OTP } = req.body;
        const findUser = await User.findById(user);

        if (!findUser) return res.status(400).json("User not found");

        if (findUser.verifed === true) {
            return res.status(400).json("User already verifed")
        };

        const token = await VerificationToken.findOne({ user: findUser._id });
        if (!token) {
            return res.status(400).json("Sorry token not found")
        }

        const isMatch = bcrypt.compareSync(OTP, token.token);
        if (!isMatch) { return res.status(400).json("Token is not valid") };

        findUser.verifed = true;
        await VerificationToken.findByIdAndDelete(token._id);
        await findUser.save();

        const accessToken = jwt.sign({
            id: findUser._id,
            username: findUser.username
        }, JWTSEC);

        const { password, ...other } = findUser._doc;

        await sendEmail().sendMail({
            from: "sociaMedia@gmail.com",
            to: findUser.email,
            subject: "Successfully verify your email",
            html: `Now you can login in social app`
        })
        return res.status(200).json({ other, accessToken })
    } catch (error) {
        return res.status(500).json({ message: "Internal Error" })
    }

}


exports.login = async (req, res) => {

   
    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ error : "User doesn't found"})
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if (!correctPassword) {
            return res.status(400).json({error  :"Password error"})
        }

        const accessToken = jwt.sign({
            id: user._id,
            username: user.username
        }, JWTSEC);

        const { password, ...other } = user._doc
        res.status(200).json({ user : other, token : accessToken });

    } catch (error) {
        res.status(500).json({error :"Internal error occured"})
    }

}

exports.forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json("User not found");
        }

        const token = await ResetToken.findOne({ user: user._id });
        if (token) {
            return res.status(400).json("After one hour you can request for another token");
        }

        const RandomTxt = crypto.randomBytes(20).toString('hex');
        const resetToken = new ResetToken({
            user: user._id,
            token: RandomTxt
        });

        await resetToken.save();
        await sendEmail().sendMail({
            from: process.env.USER,
            to: user.email,
            subject: "Reset Token",
            html: `http://localhost:3000/reset/password?token=${RandomTxt}&_id=${user._id}`
        })

        return res.status(200).json("Check your email to reset password")

    } catch (error) {
        return res.status(500).json({ message: "Internal Error" })
    }
}


exports.resetPassword = async (req, res) => {
    try {

        const { token, _id } = req.query;
        if (!token || !_id) {
            return res.status(400).json("Invalid req");
        }
        const user = await User.findOne({ _id: _id });

        if (!user) {
            return res.status(400).json("user not found")
        }

        const resetToken = await ResetToken.findOne({ user: user._id });
        if (!resetToken) {
            return res.status(400).json("Reset token is not found")
        }

        const isMatch =  bcrypt.compareSync(token, resetToken.token);
        if (!isMatch) {
            return res.status(400).json("Token is not valid");
        }

        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const encryptPass = await bcrypt.hash(password, salt);
        user.password =  encryptPass;
        await user.save();

        await sendEmail().sendMail({
            from: "sociaMedia@gmail.com",
            to: user.email,
            subject: "Your password reset successfully",
            html: `Now you can login with new password`
        })

        return res.status(200).json("Email has been send")
    } catch (error) {
        return res.status(500).json("Internal Error")
    }

}

exports.following = async (req, res) => {
    try {

    if (req.params.id !== req.body.user) {
        const user = await User.findById(req.params.id);
        const otheruser = await User.findById(req.body.user);

        if (!user.Followers.includes(req.body.user)) {
            await user.updateOne({ $push: { Followers: req.body.user } });
            await otheruser.updateOne({ $push: { Following: req.params.id } });
            return res.status(200).json("User has followed");
        } else {
            await user.updateOne({ $pull: { Followers: req.body.user } });
            await otheruser.updateOne({ $pull: { Following: req.params.id } });
            return res.status(200).json("User has Unfollowed");
        }
    } else {
        return res.status(400).json("You can't follow yourself")
    }
} catch (error) {
        return res.status(500).json({message:"Internal Error"})
}
}

exports.fetchPostofFollowing = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        const followersPost = await Promise.all(
            user.Following.map((item) => {
                return Post.find({ user: item })
            })
        )
        const userPost = await Post.find({ user: user._id });

        res.status(200).json(userPost.concat(...followersPost));
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}


exports.updateProfile = async (req, res) => {
    try {
        if (req.params.id === req.user.id) {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                const encryptPass = await bcrypt.hash(req.body.password, salt);
                req.body.password = encryptPass;
                const updateuser = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                },{new:true});
                await updateuser.save();
                res.status(200).json(updateuser);
            }
        } else {
            return res.status(400).json("Your are not allow to update this user details ")
        }
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        if (req.params.id !== req.user.id) {
            return res.status(400).json("Account doesn't match")
        } else {
            const user = await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("User account has been deleted")
        }
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

exports.userDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json("User not found")
        }
        const { email, password, phonenumber, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}

exports.users = async (req, res) => {
    try {
        const allUser = await User.find();
        const user = await User.findById(req.params.id);
        const followinguser = await Promise.all(
            user.Following.map((item) => {
                return item;
            })
        )
    
        let UserToFollow = allUser.filter((val) => {

            return    !followinguser.includes(val._id.toString()) && val._id.toString() !== req.params.id;
            
        })

        let filteruser = await Promise.all(
            UserToFollow.map((item) => {
                const { email, phonenumber, Followers, Following, password, ...others } = item._doc;
                return others
            })
        )
        res.status(200).json(filteruser)
    } catch (error) {
        return res.status(500).json({message : "Internal Error"})
    }
}