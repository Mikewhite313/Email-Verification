const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../Models/User'); // Assuming you have an index file exporting User and VerificationCode models

const UserController = {
  signup: async (req, res) => {
    
    const { email, username, password, confirm_password, dob } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    
    try {
      // Check if the user already exists in the database
      
      const oldUser = await User.findOne({ email });
      
      if (oldUser) {
        if(oldUser.status === false){
          return res.status(402).json({ message: 'User already exists. Please verify your OTP sent to your email.' });

        }
        else{
          return res.status(200).json({ message: 'User Already Verified! ' });

        }
        
      }

      // Generate a random verification code
      const otp = Math.floor(100000 + Math.random() * 900000);

      // Create a new verification code entry in the database
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
        confirm_password: hashedPassword,
        dob,
        code: otp,
        status: false,
      });

      await newUser.save();

      // Send verification email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'syedanasahmed15@gmail.com',
          pass: 'gbehdylhhrxacfxl',
        },
      });

      const mailOptions = {
        from: 'syedanasahmed15@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Your verification code is: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ error: 'Failed to send verification email' });
        } else {
          res.status(200).json({ message: 'Verification email sent' });
        }
      });
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json({ error: 'Failed to sign up' });
    }
  },

 verify: async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    // Retrieve the user's email and verification code from the database
    const user = await User.findOne({ email });
    if (!user && user===null) {
      res.status(400).json({ error: 'User not found' });
      return;
    }

    if (parseInt(verificationCode) === user.code) {
      // Verification successful
      try {
        // Update the user's status to true
        user.status = true;
        await user.save();

        res.status(200).json({ message: 'Verification successful. User signed up successfully.' });
      } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ error: 'Failed to update user status' });
      }
    } else {
      // Verification failed

      // Delete the user record from the database
      await User.deleteOne({ email });

      res.status(400).json({ error: 'Invalid verification code' });
    }
  } catch (error) {
    console.error('Error verifying:', error);
    res.status(500).json({ error: 'Failed to verify' });
  }
}

  
};

module.exports = UserController;
