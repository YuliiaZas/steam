const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  friendsRequests: {
    received: [
      {
        from: {
          type: mongoose.Schema.Types.ObjectId,
          // required: true,
        },
        status: {
          enum: ['pending', 'accepted', 'rejected'],
        },
        createdDate: {
          type: Date,
          default: Date.now(),
        },
      }
    ],
    sent: [
      {
        to: {
          type: mongoose.Schema.Types.ObjectId,
          // required: true,
        },
        status: {
          enum: ['pending', 'accepted', 'rejected'],
        },
        createdDate: {
          type: Date,
          default: Date.now(),
        },
      }
    ]
  }
});

module.exports = {
  User,
};
