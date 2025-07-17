import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    bio: { type: String, default: '' },
    imageUrl: {
      type: String,
      default: 'https://placehold.co/300x300/535353/FFFFFF?text=Artist',
    },
    genres: [{ type: String, trim: true }],
    monthlyListeners: { type: Number, default: 0 },
    // We can also add direct references to songs and albums if needed for specific queries,
    // but populating from the Song/Album models is often more efficient.
  },
  {
    timestamps: true,
  },
);

// Virtual for artist's songs - dynamically populated
artistSchema.virtual('songs', {
  ref: 'Song',
  localField: '_id',
  foreignField: 'artist',
});

// Virtual for artist's albums - dynamically populated
artistSchema.virtual('albums', {
  ref: 'Album',
  localField: '_id',
  foreignField: 'artist',
});

// Ensure virtual fields are included when converting to JSON
artistSchema.set('toJSON', { virtuals: true });
artistSchema.set('toObject', { virtuals: true });

const Artist = mongoose.model('Artist', artistSchema);
export default Artist;
