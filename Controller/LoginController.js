const express = require('express');
const bodyParser = require('body-parser');
// const Provider = require('../models/provider');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mongoose = require('mongoose');

const login = (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide an email and password.'
      });
    }
  
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: 'Authentication failed. User not found.'
          });
        }
  
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: 'Authentication failed. Passwords do not match.',
              error: err
            });
          }
  
          if (result) {
            const token = jwt.sign({ email: user.email, userId: user._id }, process.env.authKey, { expiresIn: '1h' });
            res.cookie(token,"jwt");
            return res.status(200).json({
              message: 'Authentication successful.',
              token: token
            });
          }
  
          res.status(401).json({
            message: 'Authentication failed. Passwords do not match.'
          });
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred while checking the database for the user.',
          error: error
        });
      });
    };

    module.exports = {login}