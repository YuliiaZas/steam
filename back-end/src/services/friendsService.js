const {User} = require('../models/userModel');

const getAllFriendsByUserId = async (_id) => {
  const friends = await User.find({friends: _id}, {__v: 0});
  console.log(friends)
  return friends || [];
};

const getNewFriendsBySearchData = async (searchData, userId) => {

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

const addFriendToUser = async (friendId, userId) => {

};

const deleteFriendFromUser = async (friendId, userId) => {

};

// setRequestStatusToUser(userId, 'sent', 'to', friendId, status)
module.exports = {
  getAllFriendsByUserId,
  getNewFriendsBySearchData,
  getNewFriendById,
  addFriendRequestToUser,
  getRequestsArrayByUserId,
  setRequestStatusToUser,
  removeRequestFromUser,
  addFriendToUser,
  deleteFriendFromUser,
};
