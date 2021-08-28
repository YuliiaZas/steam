const express = require('express');
const router = new express.Router();

const {
  getNewGames,
  getGameById,
  getLibraryGames,
  putGameToUser,
  putUserToGame,
} = require('../services/gamesService');

const {tryCatchWrapper} = require('../utils/apiUtils');

const {
  DataError,
  InvalidRequestError,
} = require('../utils/errors');

router.get('/', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const newGames = await getNewGames(userId);
  res.json(newGames);
}));

router.get('/my', tryCatchWrapper(async (req, res) => {
  const {userId} = req.user;
  const libraryGames = await getLibraryGames(userId);
  res.json(libraryGames);
}));

router.get('/:gameId', tryCatchWrapper(async (req, res) => {
  const gameId = req.params.gameId;
  const game = await getGameById(gameId);
  res.json(game);
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
  res.json({message: `Game ${gameId} wasn added to user ${userId} library`});
}));

module.exports = {
  gamesRouther: router,
};
