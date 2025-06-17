const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  // Core Content
  title: { 
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [150, 'Title cannot exceed 150 characters']
  },
  body: { 
    type: String, 
    required: [true, 'Question body is required'],
    maxlength: [5000, 'Question too long (max 5000 chars)']
  },

  // Metadata 
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true  
  },
  tags: [{ 
    type: String, 
    enum: [
      'quantum', 'aerospace', 'electronics', 
      'thermodynamics', 'material-science', 'computational'
    ],
    validate: {
      validator: (tags) => tags.length >= 5,
      message: 'Maximum 5 tags allowed'
    } 
  }], 

  // Engagement Metrics 
  upvotes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  downvotes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }], 

  views: { 
    type: Number, 
    default: 0  
  },

  // Moderation
  isClosed: { 
    type: Boolean, 
    default: false 
  },
  acceptedAnswers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer' // Reference to the Answer model
  }],

  // Timestamps
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date 
  }
});

// Update 'updatedAt' on save
questionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Text index for search
questionSchema.index({ title: 'text', body: 'text', tags: 'text' });

module.exports = mongoose.model('Question', questionSchema);