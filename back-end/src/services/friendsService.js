const getAllFriendsByUserId = (userId) => {

};

const getNewFriendsBySearchData = (searchData, userId) => {

};

const getNewFriendById = (newFriendId) => {

};

const addFriendRequestToUser = (newFriendId, receivedSentCase, fromToCase, userId) => {

};

// addFriendRequestToUser(userId, 'sent', 'to', newFriendId)
const getRequestsArrayByUserId = (userId, receivedSentCase, status) => {

};

const setRequestStatusToUser = (friendId, receivedSentCase, fromToCase, userId, status) => {

  if (status === 'accepted | rejected') {
    removeRequestFromUser(friendId, userId);
  }
  if (status === 'accepted') {
    addFriendToUser(friendId, userId)
  }
};

const removeRequestFromUser = (friendId, userId) => {

};

const addFriendToUser = (friendId, userId) => {

};

const deleteFriendFromUser = (friendId, userId) => {

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
