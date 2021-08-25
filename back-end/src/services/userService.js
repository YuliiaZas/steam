const {User} = require('../models/userModel');
const {registration} = require('./authService');

const {
  // DataError,
  InvalidRequestError,
} = require('../utils/errors');

const usersRegistration = async (userData) => {
  let userInDB = await User.findOne({email: userData.email});
  if (!userInDB) {
    console.log(userData.email, 'is absent');
    registration(userData)
  }
};

// const getUserInfo = async (_id) => {
//   const user = await User.find({_id}, {__v: 0});
//   if (!user) {
//     throw new InvalidRequestError('User is absent');
//   }
//   return user;
// };

// const deleteUserInfo = async (_id) => {
//   await User.findOneAndRemove({_id});
// };

module.exports = {
  // getUserInfo,
  usersRegistration,
};
