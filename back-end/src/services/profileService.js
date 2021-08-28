const {User} = require('../models/userModel');
const {InvalidRequestError} = require('../utils/errors')

const getUserById = async (_id) => {
  const user = await User.findOne({_id}, {__v: 0, password: 0});
  if (!user) {
    throw new InvalidRequestError('User is absent');
  }
  return user;
};

const updateUserById = async (userInfo, _id) => {
  const updatedUser = await User.findOneAndUpdate({_id},
    {$set: userInfo}, {new: true},
    (err, doc) => {
      console.log('_DOC_', doc)
      if (err) {
        throw new InvalidRequestError(`Invalid request: ${err}`);
      }
    });
  return updatedUser;
};

module.exports = {
  getUserById,
  updateUserById,
};