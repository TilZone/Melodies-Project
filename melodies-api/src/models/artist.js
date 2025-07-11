const mongoose = require('mongoose');

// Artist schema definition
const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, default: '' },
  imageUrl: {
    type: String,
    default: 'https://placehold.co/200x200/535353/FFFFFF?text=Artist',
  },
});

module.exports = mongoose.model('Artist', artistSchema);
