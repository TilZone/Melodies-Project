import { Request, Response } from 'express';
import Song from '../models/song.model';

// GET /api/discover/featured
// Lấy ngẫu nhiên một số bài hát làm nổi bật
export const getFeatured = async (req: Request, res: Response) => {
  try {
    // Lấy ngẫu nhiên 5 bài hát
    const featuredSongs = await Song.aggregate([
        { $sample: { size: 5 } },
        // Sau khi lấy sample, ta cần populate thủ công
        {
            $lookup: {
                from: 'artists', // Tên collection của artists trong mongodb
                localField: 'artist',
                foreignField: '_id',
                as: 'artistInfo'
            }
        },
        { $unwind: '$artistInfo' },
        { $addFields: { artist: '$artistInfo' } },
        { $project: { artistInfo: 0 } }
    ]);

    res.status(200).json(featuredSongs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// GET /api/discover/new-releases
// Lấy các bài hát được thêm vào gần đây nhất
export const getNewReleases = async (req: Request, res: Response) => {
    try {
        const newSongs = await Song.find()
            .sort({ createdAt: -1 }) // Sắp xếp theo ngày tạo mới nhất
            .limit(10) // Giới hạn 10 bài
            .populate('artist', 'name'); // Lấy thông tin nghệ sĩ

        res.status(200).json(newSongs);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

// GET /api/discover/top-charts
// Tạm thời lấy ngẫu nhiên, thực tế sẽ dựa trên lượt nghe
export const getTopCharts = async (req: Request, res: Response) => {
    try {
        // Trong một ứng dụng thực tế, bạn sẽ có một trường `playCount` và sắp xếp theo nó.
        // Ở đây chúng ta tạm thời lấy ngẫu nhiên 10 bài hát khác.
        const topSongs = await Song.aggregate([
            { $sample: { size: 10 } }
        ]).then(songs => Song.populate(songs, { path: 'artist', select: 'name' }));
        
        res.status(200).json(topSongs);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};