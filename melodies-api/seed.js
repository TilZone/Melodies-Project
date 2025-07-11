require('dotenv').config();
const mongoose = require('mongoose');

const Song = require('./src/models/song.js');
const Artist = require('./src/models/artist.js');
const Album = require('./src/models/album.js');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    // Clear existing data (be careful in production)
    await Song.deleteMany({});
    await Artist.deleteMany({});
    await Album.deleteMany({});
    console.log('Old data cleared');

    // Create sample artists
    const artist1 = new Artist({
      name: 'Sơn Tùng M-TP',
      bio: 'Sơn Tùng M-TP là một ca sĩ, nhạc sĩ, rapper và diễn viên người Việt Nam. Anh được mệnh danh là "Hoàng tử V-Pop" và là một trong những nghệ sĩ thành công nhất Việt Nam.',
      imageUrl: 'https://placehold.co/200x200/1DB954/FFFFFF?text=ST',
    });
    const artist2 = new Artist({
      name: 'Bích Phương',
      bio: 'Bích Phương là một nữ ca sĩ người Việt Nam, nổi tiếng với các bản hit pop ballad và dance-pop.',
      imageUrl: 'https://placehold.co/200x200/1DB954/FFFFFF?text=BP',
    });
    const artist3 = new Artist({
      name: 'Đen Vâu',
      bio: 'Đen Vâu là một rapper, nhạc sĩ người Việt Nam, được biết đến với phong cách âm nhạc mộc mạc, gần gũi và những ca từ sâu sắc.',
      imageUrl: 'https://placehold.co/200x200/1DB954/FFFFFF?text=DV',
    });
    await Promise.all([artist1.save(), artist2.save(), artist3.save()]);
    console.log('Artists seeded');

    // Create sample albums
    const album1 = new Album({
      title: 'Tuyển Tập Sơn Tùng M-TP',
      artist: artist1._id,
      releaseYear: 2020,
      coverArt: 'https://placehold.co/150x150/1DB954/FFFFFF?text=AlbumST',
    });
    const album2 = new Album({
      title: 'Có Khi Nào Rời Xa',
      artist: artist2._id,
      releaseYear: 2017,
      coverArt: 'https://placehold.co/150x150/1DB954/FFFFFF?text=AlbumBP',
    });
    await Promise.all([album1.save(), album2.save()]);
    console.log('Albums seeded');

    // Create sample songs
    const song1 = new Song({
      title: 'Nơi Này Có Anh',
      artist: artist1._id,
      album: album1._id,
      duration: '04:15',
      coverArt: 'https://placehold.co/150x150/1DB954/FFFFFF?text=NNCA',
      audioUrl: 'mock_audio_url_1.mp3',
      lyrics: `Nơi này có anh, nơi này có anh\nChẳng cần đi đâu xa, nơi này có anh\nNơi này có anh, nơi này có anh\nCứ ở đây thôi, nơi này có anh...`,
      genre: 'V-Pop',
      playCount: 150000000,
      createdAt: new Date('2023-01-15'),
    });
    const song2 = new Song({
      title: 'Em Gái Mưa',
      artist: artist2._id,
      album: album2._id,
      duration: '05:00',
      coverArt: 'https://placehold.co/150x150/1DB954/FFFFFF?text=EGM',
      audioUrl: 'mock_audio_url_2.mp3',
      lyrics: `Ngoài kia mưa rơi, em gái mưa ơi\nCó phải em đang khóc, vì anh không?\nNgoài kia mưa rơi, em gái mưa ơi\nCó phải em đang nhớ, về anh không?`,
      genre: 'V-Pop',
      playCount: 120000000,
      createdAt: new Date('2023-02-20'),
    });
    const song3 = new Song({
      title: 'Anh Đếch Cần Gì Nhiều Ngoài Em',
      artist: artist3._id,
      duration: '04:30',
      coverArt: 'https://placehold.co/150x150/1DB954/FFFFFF?text=ADCGNGE',
      audioUrl: 'mock_audio_url_3.mp3',
      lyrics: `Anh đếch cần gì nhiều ngoài em\nNgoài em ra thì anh đếch cần gì nhiều\nNgoài em ra thì anh đếch cần gì nhiều\nNgoài em ra thì anh đếch cần gì nhiều`,
      genre: 'Rap/Hip-Hop',
      playCount: 90000000,
      createdAt: new Date('2023-03-01'),
    });
    const song4 = new Song({
      title: 'Lạc Trôi',
      artist: artist1._id,
      album: album1._id,
      duration: '04:20',
      coverArt: 'https://placehold.co/150x150/1DB954/FFFFFF?text=LT',
      audioUrl: 'mock_audio_url_4.mp3',
      lyrics: `Lạc trôi giữa đời, lạc trôi giữa đời\nTa tìm nhau giữa dòng đời trôi\nLạc trôi giữa đời, lạc trôi giữa đời\nTa tìm nhau giữa dòng đời trôi`,
      genre: 'V-Pop',
      playCount: 180000000,
      createdAt: new Date('2023-04-10'),
    });
    await Promise.all([song1.save(), song2.save(), song3.save(), song4.save()]);
    console.log('Songs seeded');

    mongoose.connection.close();
    console.log('MongoDB connection closed');
  })
  .catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
