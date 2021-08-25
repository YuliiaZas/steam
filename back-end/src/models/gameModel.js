const mongoose = require('mongoose');

const Game = mongoose.model('Game', {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  tags: [
    {
      enum: [
        'Action',
        'Shooter',
        'Strategy',
        'Sandbox',
        'Simulation',
        'City Builder',
        'Board Game',
        'Indie',
        'Casual',
        'Free to Play',
        'RPG',
        'Economy',
        'MMO',
        'Space',
        'Fantasy',
      ],
      required: true,
    }
  ],
});

module.exports = {
  Game,
};
