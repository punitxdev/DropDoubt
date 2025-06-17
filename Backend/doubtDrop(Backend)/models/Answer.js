const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  // Content
  body: {
    type: String,
    required: [true, 'Answer body is required'],
    maxlength: 5000
  },

  // Relationships
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: [true, 'Answer must belong to a question']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Answer must have an author']
  },

  // Engagement
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Moderation
  isFlagged: {
    type: Boolean,
    default: false
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

// Update timestamp on edit
answerSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Indexes for faster queries
answerSchema.index({ question: 1 });
answerSchema.index({ author: 1 });

module.exports = mongoose.model('Answer', answerSchema);