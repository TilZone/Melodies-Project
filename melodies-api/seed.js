import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './src/config/db.js';
import Song from './src/models/song.js';
import Artist from './src/models/artist.js';
import Album from './src/models/album.js';

const seedData = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    console.log('Clearing old data...');
    await Song.deleteMany({});
    await Artist.deleteMany({});
    await Album.deleteMany({});
    console.log('Old data cleared.');

    // --- Create Artists ---
    console.log('Seeding artists...');
    const artists = await Artist.create([
      {
        name: 'Sơn Tùng M-TP',
        bio: 'Sơn Tùng M-TP is a Vietnamese singer, songwriter, and actor. He is known for his unique style and many V-pop hits.',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb8b4f3434c1b9bfa5d1a7a578',
        monthlyListeners: 15000000, // Example: High monthly listeners
      },
      {
        name: 'Bích Phương',
        bio: 'Bích Phương is a Vietnamese singer known for her pop ballads and quirky music videos.',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb1f4f0e6a4c4e4e4e4e4e4e4e',
        monthlyListeners: 8000000, // Example: Medium monthly listeners
      },
      {
        name: 'Đen Vâu',
        bio: 'Đen Vâu is a popular Vietnamese rapper and songwriter, famous for his poetic and story-telling lyrics.',
        imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebc5a7c5a7c5a7c5a7c5a7c5a7',
        monthlyListeners: 12000000, // Example: High monthly listeners
      },
    ]);
    const [sonTung, bichPhuong, denVau] = artists;
    console.log('Artists seeded.');

    // --- Create Albums ---
    console.log('Seeding albums...');
    const albums = await Album.create([
      {
        title: 'm-tp',
        artist: sonTung._id,
        releaseDate: new Date('2017-04-01'),
        coverArt: 'https://i.scdn.co/image/ab67616d0000b2738b4f3434c1b9bfa5d1a7a578',
        genre: 'V-Pop',
      },
      {
        title: 'Dramatic',
        artist: bichPhuong._id,
        releaseDate: new Date('2018-11-22'),
        coverArt: 'https://i.scdn.co/image/ab67616d0000b2731f4f0e6a4c4e4e4e4e4e4e4e',
        genre: 'V-Pop',
      },
    ]);
    const [mtpAlbum, dramaticAlbum] = albums;
    console.log('Albums seeded.');

    // --- Create Songs ---
    console.log('Seeding songs...');
    const songs = await Song.create([
      // Sơn Tùng M-TP
      {
        title: 'Nơi Này Có Anh',
        artist: sonTung._id,
        album: mtpAlbum._id,
        duration: 255, // 4:15
        coverArt: 'https://i.scdn.co/image/ab67616d0000b2738b4f3434c1b9bfa5d1a7a578',
        audioUrl:
          'https://archive.org/download/NoiNayCoAnh-SonTungMTP-4829513/NoiNayCoAnh-SonTungMTP-4829513.mp3',
        lyrics: `[00:15.45]Em là ai từ đâu bước đến nơi đây dịu dàng chân phương\n[00:21.95]Em là ai tựa như ánh nắng ban mai ngọt ngào trong sương\n[00:28.70]Ngắm em thật lâu con tim anh yếu mềm\n[00:35.20]Đắm say từ phút đó từng giây trôi yêu thêm`,
        genre: 'V-Pop',
        playCount: 150000000,
        releaseDate: new Date('2017-02-14'),
      },

      {
        title: 'Lạc Trôi',
        artist: sonTung._id,
        album: mtpAlbum._id,
        duration: 260, // 4:20
        coverArt: 'https://i.scdn.co/image/ab67616d0000b2738b4f3434c1b9bfa5d1a7a578',
        audioUrl:
          'https://archive.org/download/LacTroi-SonTungMTP-4725909/LacTroi-SonTungMTP-4725909.mp3',
        lyrics: `[00:30.12]Người theo hương hoa mây mù giăng lối\n[00:36.62]Làn sương khói phôi phai đưa bước ai xa rồi\n[00:43.37]Đơn côi mình ta vấn vương hồi ức trong men say chiều mưa buồn\n[00:50.12]Ngăn giọt lệ ngừng khiến khóe mi sầu bi`,
        genre: 'V-Pop',
        playCount: 180000000,
        releaseDate: new Date('2017-01-01'),
      },

      // Bích Phương
      {
        title: 'Bùa Yêu',
        artist: bichPhuong._id,
        album: dramaticAlbum._id,
        duration: 248, // 4:08
        coverArt: 'https://i.scdn.co/image/ab67616d0000b2731f4f0e6a4c4e4e4e4e4e4e4e',
        audioUrl:
          'https://archive.org/download/BuaYeu-BichPhuong-5463523/BuaYeu-BichPhuong-5463523.mp3',
        lyrics: `[00:25.50]Yêu hay không yêu không yêu hay yêu nói một lời\n[00:31.75]Bên nhau hay thôi chỉ một lời thôi\n[00:38.00]Sao anh cứ làm em rối bời\n[00:44.25]Yêu hay không yêu không yêu hay yêu nói đi nào`,
        genre: 'V-Pop',
        playCount: 120000000,
        releaseDate: new Date('2018-05-12'),
      },

      // Đen Vâu
      {
        title: 'Anh Đếch Cần Gì Nhiều Ngoài Em',
        artist: denVau._id,
        duration: 270, // 4:30
        coverArt: 'https://i.scdn.co/image/ab67616d0000b273c5a7c5a7c5a7c5a7c5a7c5a7',
        audioUrl:
          'https://archive.org/download/AnhDechCanGiNhieuNgoaiEm-DenVauVuThanhDong-5749511/AnhDechCanGiNhieuNgoaiEm-DenVauVuThanhDong-5749511.mp3',
        lyrics: `[00:10.00]Anh đếch cần gì nhiều ngoài em\n[00:13.00]Và điếu thuốc lá để mà hút khi mà tai em kề bên\n[00:16.00]Kể lể bao câu chuyện trên trời dưới đất\n[00:19.00]Để em thấy anh cũng là thằng hề có thực`,
        genre: 'Rap/Hip-Hop',
        playCount: 90000000,
        releaseDate: new Date('2018-11-15'),
      },
    ]);

    // New Song for New Releases
    const newSong = await Song.create({
      title: 'Bài Hát Mới Nhất',
      artist: sonTung._id,
      duration: 200,
      coverArt: 'https://i.scdn.co/image/ab67616d0000b2738b4f3434c1b9bfa5d1a7a578',
      audioUrl:
        'https://archive.org/download/NoiNayCoAnh-SonTungMTP-4829513/NoiNayCoAnh-SonTungMTP-4829513.mp3', // Reusing for demo
      lyrics: '[00:00.00]Đây là bài hát mới nhất',
      genre: 'V-Pop',
      playCount: 100000,
      releaseDate: new Date(), // Today's date
    });
    songs.push(newSong);

    console.log('Songs seeded.');

    // --- Link data ---
    console.log('Linking data...');
    // Add songs to albums
    mtpAlbum.songs = songs.filter((s) => s.album?.equals(mtpAlbum._id)).map((s) => s._id);
    dramaticAlbum.songs = songs.filter((s) => s.album?.equals(dramaticAlbum._id)).map((s) => s._id);
    await Promise.all([mtpAlbum.save(), dramaticAlbum.save()]);

    // Add top songs and albums to artists
    sonTung.topSongs = songs.filter((s) => s.artist.equals(sonTung._id)).map((s) => s._id);
    sonTung.albums = [mtpAlbum._id];
    bichPhuong.topSongs = songs.filter((s) => s.artist.equals(bichPhuong._id)).map((s) => s._id);
    bichPhuong.albums = [dramaticAlbum._id];
    denVau.topSongs = songs.filter((s) => s.artist.equals(denVau._id)).map((s) => s._id);
    await Promise.all([sonTung.save(), bichPhuong.save(), denVau.save()]);
    console.log('Data linking complete.');

    console.log('Seeding finished successfully!');
  } catch (error) {
    console.error('Error while seeding data:', error);
    process.exit(1);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

seedData();
