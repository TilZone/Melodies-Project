import { Request, Response } from 'express';
import Song from '../models/song.model';

// GET /api/songs/:songId
export const getSongDetails = async (req: Request, res: Response) => {
  try {
    const song = await Song.findById(req.params.songId).populate('artist', 'name avatarUrl');
    if (!song) {
      return res.status(404).json({ message: 'Không tìm thấy bài hát' });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};