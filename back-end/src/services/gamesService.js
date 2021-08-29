const {Game} = require('../models/gameModel');
const {User} = require('../models/userModel');

const getNewGames = async (_id) => {
  const newGames = await Game.find({users: {$ne: _id}}, {__v: 0});
  if (!newGames) {
    throw new InvalidRequestError('It seems that you have all our games! Or something went wrong...');
  }
  return newGames;
};

const getGameById = async (_id) => {
  const game = await Game.findOne({_id});
  if (!game) {
    throw new InvalidRequestError(`Game with id ${_id} is absent`);
  }
  return game;
};

const getNewGamesByQuery = async (queryType, queryValue, userId) => {
  if (queryValue === '') {
    return getNewGames(userId);
  }
  let searchParam;
  if (queryType === 'name') {
    searchParam = {name: {$regex: `${queryValue}`, $options: 'i'}};
  } else {
    searchParam = {[queryType]: queryValue};
  }
  console.log(searchParam)
  const games = await Game.find({...searchParam, users: {$ne: {_id: userId}}});
  return games || [];
}

const getLibraryGames = async (_id) => {
  const libraryGames = await Game.find({users: _id}, {__v: 0});
  return libraryGames || [];
};

const putGameToUser = async (gameId, userId) => {
  User.findOneAndUpdate({_id: userId}, 
    {$push: {games: gameId}}, {new: true},
    (err, doc) => {
      if (err) {
        throw new InvalidRequestError(`Invalid request: ${err}`);
      }
    });
};

const putUserToGame = async (gameId, userId) => {
  Game.findOneAndUpdate({_id: gameId}, 
    {$push: {users: userId}}, {new: true},
    (err, doc) => {
      if (err) {
        throw new InvalidRequestError(`Invalid request: ${err}`);
      }
    });
};

module.exports = {
  getNewGames,
  getGameById,
  getNewGamesByQuery,
  getLibraryGames,
  putGameToUser,
  putUserToGame,
};
