const express = require('express');
const router = new express.Router();

const {
  getAllFriendsByUserId,
  getNewFriendsBySearchData,
  getNewFriendById,
  addFriendRequestToUser,
  getRequestsArrayByUserId,
  setRequestStatusToUser,
  deleteFriendFromUser,
} = require('../services/friendsService');

const {tryCatchWrapper} = require('../utils/apiUtils');

const {
  DataError,
  InvalidRequestError,
} = require('../utils/errors');

router.get('/', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const friendsInfo = await getAllFriendsByUserId(userId);
  if (!friendsInfo) {
    throw new InvalidRequestError(`Invalid request`);
  }
  res.json(friendsInfo);
}));

router.delete('/:id', tryCatchWrapper(async (req, res) => {
    const {userId} = req.user;
    const friendId = req.params.id;
    await deleteFriendFromUser(friendId, userId);
    res.json({message: 'Friend deleted successfully'});
  }),
);

router.get('/search/:searchData', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const searchData = req.params.searchData;
  // const {searchData} = req.body;
  const newfriendsArray = await getNewFriendsBySearchData(searchData, userId);
  if (!newfriendsArray) {
    throw new InvalidRequestError(`Invalid request`);
  }
  res.json(newfriendsArray);
}));

router.patch('/search/:id', tryCatchWrapper(async (req, res) => {
  const newFriendId = req.params.id;
  const {userId} = req.user;
  const newFriend = await getNewFriendById(newFriendId);
  if (!newFriend) {
    throw new InvalidRequestError(`Invalid request`);
  }
  try {
    await addFriendRequestToUser(newFriendId, 'received', 'from', userId);
    await addFriendRequestToUser(userId, 'sent', 'to', newFriendId);
  } catch (error) {
    throw new DataError(`Friend request wasn't sent. Error: ${error}`);
  }
  res.json({'request': `User with id ${userId} sent request to user with id ${newFriendId}`});
}));

router.get('/requests/received', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const receivedRequestsArray = await getRequestsArrayByUserId(userId, 'received', 'pending');
  if (!receivedRequestsArray) {
    throw new InvalidRequestError(`Invalid request`);
  }
  res.json(receivedRequestsArray);
}));

router.patch('/requests/received/:friendId', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  // const friendId = req.params.friendId;
  const {friendId, status} = req.body;
  try {
    await setRequestStatusToUser(friendId, 'received', 'from', userId, status);
    await setRequestStatusToUser(userId, 'sent', 'to', friendId, status);
  } catch (error) {
    throw new DataError(`Friend request wasn't set as ${status}. Error: ${error}`);
  }
  res.json({'request': `Status for request from user with id ${userId} to user with id ${newFriendId} was set as ${status}`});
}));

module.exports = {
  friendsRouther: router,
};
