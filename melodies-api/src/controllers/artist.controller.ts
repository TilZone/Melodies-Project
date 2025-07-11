import { Request, Response } from 'express';
import Artist from '../models/artist.model';
import Song from '../models/song.model';

// GET /api/artists/:artistId
export const getArtistDetails = async (req: Request, res: Response) => {
  try {
    const artist = await Artist.findById(req.params.artistId);
    if (!artist) {
      return res.status(404).json({ message: 'Không tìm thấy nghệ sĩ' });
    }
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// GET /api/artists/:artistId/songs
export const getSongsByArtist = async (req: Request, res: Response) => {
    try {
        const songs = await Song.find({ artist: req.params.artistId }).populate('artist', 'name');
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};