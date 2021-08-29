const {User} = require('../models/userModel');

const getAllFriendsByUserId = async (_id) => {
  const friends = await User.find({friends: _id}, {__v: 0});
  console.log(friends)
  return friends || [];
};

const searchUsersByNameOrEmail = async (value, userId) => {
  const users = await User.find({
    $or: [
      {username: {$regex: `${value}`, $options: 'i'}},
      {email: {$regex: `${value}`, $options: 'i'}}
    ],
    friends: {$ne: {_id: userId}}
  });
  return users || [];
};

const getNewFriendById = async (newFriendId) => {

};

const addFriendRequestToUser = async (newFriendId, receivedSentCase, fromToCase, userId) => {

};

// addFriendRequestToUser(userId, 'sent', 'to', newFriendId)
const getRequestsArrayByUserId = async (userId, receivedSentCase, status) => {

};

const setRequestStatusToUser = async (friendId, receivedSentCase, fromToCase, userId, status) => {

  if (status === 'accepted | rejected') {
    removeRequestFromUser(friendId, userId);
  }
  if (status === 'accepted') {
    addFriendToUser(friendId, userId)
  }
};

const removeRequestFromUser = async (friendId, userId) => {

};

const deleteFriendFromUser = async (friendId, userId) => {
  User.findOneAndUpdate({_id: userId, friends: friendId}, 
    {$pull: {friends: friendId}}, {new: true},
    (err, doc) => {
      if (err) {
        throw new InvalidRequestError(`Invalid request: ${err}`);
      }
    });
};

const addFriendToUser = async (friendId, userId) => {
  User.findOneAndUpdate({_id: userId, friends: {$ne: friendId}}, 
    {$push: {friends: friendId}}, {new: true},
    (err, doc) => {
      if (err) {
        throw new InvalidRequestError(`Invalid request: ${err}`);
      }
    });
}

// setRequestStatusToUser(userId, 'sent', 'to', friendId, status)
module.exports = {
  getAllFriendsByUserId,
  searchUsersByNameOrEmail,
  getNewFriendById,
  addFriendRequestToUser,
  getRequestsArrayByUserId,
  setRequestStatusToUser,
  removeRequestFromUser,
  deleteFriendFromUser,
  addFriendToUser,
};
