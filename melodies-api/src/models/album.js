const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: true,
      index: true,
    },
    releaseDate: { type: Date, required: true },
    coverArt: {
      type: String,
      default: 'https://placehold.co/300x300/535353/FFFFFF?text=Album',
    },
    genre: { type: String, trim: true },
    // Songs are referenced from the Song model via the 'album' field
  },
  {
    timestamps: true,
  },
);

// Virtual for album's songs
albumSchema.virtual('songs', {
  ref: 'Song',
  localField: '_id',
  foreignField: 'album',
});

// Ensure virtual fields are included when converting to JSON
albumSchema.set('toJSON', { virtuals: true });
albumSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Album', albumSchema);
