const express = require('express');


const signup = (req,res) =>{
    res.render('signup', {title: 'Signup'});
    
}

const verify = (req,res) => {
    res.render('verification',{title: 'Verification'});
}
module.exports = {signup,verify}