const mongoose = require('mongoose');

// Album schema definition
const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  releaseYear: { type: Number },
  coverArt: {
    type: String,
    default: 'https://placehold.co/150x150/535353/FFFFFF?text=Album',
  },
});

module.exports = mongoose.model('Album', albumSchema);
