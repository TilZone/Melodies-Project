import mongoose, { Schema, Document } from 'mongoose';

// Interface định nghĩa kiểu dữ liệu cho một Artist document
export interface IArtist extends Document {
  name: string;
  avatarUrl?: string;
  bio?: string;
}

const ArtistSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  bio: { type: String },
});

export default mongoose.model<IArtist>('Artist', ArtistSchema);