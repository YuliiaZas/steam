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
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  friends_requests: {
    received: [
      {
        from: {
          type: mongoose.Schema.Types.ObjectId,
          // required: true,
        },
        status: {
          enum: ['pending', 'accepted', 'rejected'],
        },
        created_date: {
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
        created_date: {
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
