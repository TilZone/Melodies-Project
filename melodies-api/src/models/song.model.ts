import mongoose, { Schema, Document } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: mongoose.Types.ObjectId; // Tham chiếu tới ID của Artist
  duration: number; // tính bằng giây
  thumbnailUrl: string;
  audioUrl: string;
  lyrics?: string;
}

const SongSchema: Schema = new Schema({
  title: { type: String, required: true },
  // Tạo tham chiếu đến model 'Artist'
  artist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
  duration: { type: Number, required: true },
  thumbnailUrl: { type: String, required: true },
  audioUrl: { type: String, required: true },
  lyrics: { type: String },
}, {
  timestamps: true
});

export default mongoose.model<ISong>('Song', SongSchema);