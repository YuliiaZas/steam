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
  const allGames = await getAllGames();
  res.json(allGames);
}));

router.get('/my', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const allGames = await getAllGamesByUserId(userId);
  if (!allGames) {
    throw new InvalidRequestError(`Invalid request`);
  }
  res.json(allGames);
}));

router.patch('/:gameId', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const gameId = req.params.gameId;
  try {
    await putGameToUser(gameId, userId);
    await putUserToGame(gameId, userId);
  } catch (error) {
    throw new DataError(`Game ${gameId} wasn't added to user ${userId} library. Error: ${error}`);
  }
  res.json({'request': `Game ${gameId} wasn added to user ${userId} library`});
}));

module.exports = {
  gamesRouther: router,
};
