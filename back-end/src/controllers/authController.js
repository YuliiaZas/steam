const express = require('express');
const router = new express.Router();

const {
  usersRegistration,
  login,
  // resetPassword,
} = require('../services/authService');

const {tryCatchWrapper} = require('../utils/apiUtils');

router.post('/login', tryCatchWrapper(async (req, res, next) => {
  const {email, password} = req.body;
  console.log("🚀 ~ file: authController.js ~ line 37 ~ router.post ~ req.body", req.body)
  try {
    const token = await login({email, password});
    console.log({token});
    res.json({token});
  } catch (error) {
    console.log('--authController - login - error')
    console.log(error);
    console.log(error.message);
    return next(error);
  }
}));

module.exports = {
  authRouter: router,
};
