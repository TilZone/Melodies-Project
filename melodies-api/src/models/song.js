const mongoose = require('mongoose');

// Song schema definition
const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
  duration: { type: String, default: '00:00' }, // Format: "mm:ss"
  coverArt: {
    type: String,
    default: 'https://placehold.co/150x150/535353/FFFFFF?text=Song',
  },
  audioUrl: { type: String, default: '' }, // URL to the audio file
  lyrics: { type: String, default: 'No lyrics available.' },
  genre: { type: String, default: 'Pop' },
  playCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }, // Used for new releases
});

module.exports = mongoose.model('Song', songSchema);
