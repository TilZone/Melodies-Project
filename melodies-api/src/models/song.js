const mongoose = require('mongoose');

// Song schema definition
const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: true,
      index: true, // Add index for faster queries by artist
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
      index: true, // Add index for faster queries by album
    },
    duration: { type: Number, required: true, default: 0 }, // Duration in seconds
    coverArt: {
      type: String,
      default: 'https://placehold.co/300x300/535353/FFFFFF?text=Song',
    },
    audioUrl: { type: String, required: true }, // URL to the audio file
    lyrics: { type: String, default: '' }, // LRC format lyrics: [mm:ss.xx] text
    genre: { type: String, trim: true },
    playCount: { type: Number, default: 0 },
    releaseDate: { type: Date, default: Date.now }, // Actual release date of the song
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

module.exports = mongoose.model('Song', songSchema);
