const express = require('express');
const router = new express.Router();

const {
  getUserById,
  updateUserById,
} = require('../services/profileService');

const {tryCatchWrapper} = require('../utils/apiUtils');

const {
  DataError,
} = require('../utils/errors');

router.get('/', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const user = await getUserById(userId);
  res.json(user);
}));


router.put('/', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const userInfo = req.body;
  try {
    await updateUserById(userInfo, userId);
  } catch (error) {
    throw new DataError(`User ${userId} wasn't updated. Error: ${error}`);
  }
  res.json({message: 'User updated successfully'});
}));

module.exports = {
  profileRouther: router,
};
