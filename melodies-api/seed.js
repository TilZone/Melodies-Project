/**
 * Melodies Database Seeding Script
 *
 * This script populates the MongoDB database with initial data for development and testing.
 * It follows a structured process:
 * 1. Connect to the database.
 * 2. Clear all existing data to ensure a clean state.
 * 3. Create documents for Artists, Albums, and Songs.
 * 4. Link the documents together (e.g., adding song IDs to an album's song list).
 * 5. Close the database connection.
 *
 * To run this script: `node seed.js` from the `melodies-api` directory.
 */

import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './src/config/db.js';
import Song from './src/models/song.js';
import Artist from './src/models/artist.js';
import Album from './src/models/album.js';

// --- Mock Data ---
// In a larger project, this data would ideally be moved to separate JSON files
// for better organization and maintainability.
const ARTIST_DATA = [
  {
    name: 'Sơn Tùng M-TP',
    bio: 'Sơn Tùng M-TP is a Vietnamese singer, songwriter, and actor. He is known for his unique style and many V-pop hits.',
    imageUrl: 'https://picsum.photos/id/1005/200/200',
    monthlyListeners: 15000000,
  },
  {
    name: 'Bích Phương',
    bio: 'Bích Phương is a Vietnamese singer known for her pop ballads and quirky music videos.',
    imageUrl: 'https://picsum.photos/id/1011/200/200',
    monthlyListeners: 8000000,
  },
  {
    name: 'Đen Vâu',
    bio: 'Đen Vâu is a popular Vietnamese rapper and songwriter, famous for his poetic and story-telling lyrics.',
    imageUrl: 'https://picsum.photos/id/1025/200/200',
    monthlyListeners: 12000000,
  },
];

// We will get the actual _id from createdArtists after they are saved
let sonTung, bichPhuong, denVau;

const ALBUM_DATA = [
  {
    title: 'm-tp',
    // artist will be set after artists are created
    releaseDate: new Date('2017-04-01'),
    coverArt: 'https://picsum.photos/id/10/300/300',
    genre: 'V-Pop',
  },
  {
    title: 'Dramatic',
    // artist will be set after artists are created
    releaseDate: new Date('2018-11-22'),
    coverArt: 'https://picsum.photos/id/20/300/300',
    genre: 'V-Pop',
  },
];

// We will get the actual _id from createdAlbums after they are saved
let mtpAlbum, dramaticAlbum;

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('✅ MongoDB connected for seeding.');

    console.log('🧹 Clearing old data...');
    await Promise.all([Song.deleteMany({}), Artist.deleteMany({}), Album.deleteMany({})]);
    console.log('🗑️ Old data cleared.');

    console.log('🌱 Seeding new data...');
    const createdArtists = await Artist.create(ARTIST_DATA);
    sonTung = createdArtists[0];
    bichPhuong = createdArtists[1];
    denVau = createdArtists[2];

    // Assign artist _id to ALBUM_DATA before creating albums
    ALBUM_DATA[0].artist = sonTung._id;
    ALBUM_DATA[1].artist = bichPhuong._id;
    const createdAlbums = await Album.create(ALBUM_DATA);
    mtpAlbum = createdAlbums[0];
    dramaticAlbum = createdAlbums[1];

    const SONG_DATA = [
      {
        title: 'Nơi Này Có Anh',
        artist: sonTung._id,
        album: mtpAlbum._id,
        duration: 255, // 4:15
        coverArt: mtpAlbum.coverArt, // Use album cover art
        audioUrl: 'http://localhost:5000/audio/song1.mp3',
        lyrics: `[00:15.45]Em là ai từ đâu bước đến nơi đây dịu dàng chân phương\n[00:21.95]Em là ai tựa như ánh nắng ban mai ngọt ngào trong sương\n[00:28.70]Ngắm em thật lâu con tim anh yếu mềm\n[00:35.20]Đắm say từ phút đó từng giây trôi yêu thêm`,
        playCount: 150000000,
        releaseDate: new Date('2017-02-14'),
      },
      {
        title: 'Lạc Trôi',
        artist: sonTung._id,
        album: mtpAlbum._id,
        duration: 260, // 4:20
        coverArt: mtpAlbum.coverArt, // Use album cover art
        audioUrl: 'http://localhost:5000/audio/song2.mp3',
        lyrics: `[00:30.12]Người theo hương hoa mây mù giăng lối\n[00:36.62]Làn sương khói phôi phai đưa bước ai xa rồi\n[00:43.37]Đơn côi mình ta vấn vương hồi ức trong men say chiều mưa buồn\n[00:50.12]Ngăn giọt lệ ngừng khiến khóe mi sầu bi`,
        playCount: 180000000,
        releaseDate: new Date('2017-01-01'),
      },
      {
        title: 'Bùa Yêu',
        artist: bichPhuong._id,
        album: dramaticAlbum._id,
        duration: 248, // 4:08
        coverArt: dramaticAlbum.coverArt, // Use album cover art
        audioUrl: 'http://localhost:5000/audio/song3.mp3',
        lyrics: `[00:25.50]Yêu hay không yêu không yêu hay yêu nói một lời\n[00:31.75]Bên nhau hay thôi chỉ một lời thôi\n[00:38.00]Sao anh cứ làm em rối bời\n[00:44.25]Yêu hay không yêu không yêu hay yêu nói đi nào`,
        playCount: 120000000,
        releaseDate: new Date('2018-05-12'),
      },
      {
        title: 'Anh Đếch Cần Gì Nhiều Ngoài Em',
        artist: denVau._id,
        duration: 270, // 4:30
        coverArt: 'https://picsum.photos/id/1040/300/300', // Generic placeholder for songs without album
        audioUrl: 'http://localhost:5000/audio/song4.mp3',
        lyrics: `[00:10.00]Anh đếch cần gì nhiều ngoài em\n[00:13.00]Và điếu thuốc lá để mà hút khi mà tai em kề bên\n[00:16.00]Kể lể bao câu chuyện trên trời dưới đất\n[00:19.00]Để em thấy anh cũng là thằng hề có thực`,
        playCount: 90000000,
        releaseDate: new Date('2018-11-15'),
      },
      {
        title: 'Bài Hát Mới Nhất',
        artist: sonTung._id,
        duration: 200,
        coverArt: 'https://picsum.photos/id/1041/300/300', // Generic placeholder for songs without album
        audioUrl: 'http://localhost:5000/audio/song5.mp3', // Reusing for demo
        lyrics: '[00:00.00]Đây là bài hát mới nhất',
        playCount: 100000,
        releaseDate: new Date(), // Today's date
      },
    ];

    const createdSongs = await Song.create(SONG_DATA);

    console.log(
      `🔵 Seeded ${createdArtists.length} artists, ${createdAlbums.length} albums, and ${createdSongs.length} songs.`,
    );

    console.log('🔗 Linking documents...');
    // This step is crucial for data integrity. We associate songs with their respective albums and artists.
    // For example, an album document needs to hold an array of IDs for the songs it contains.
    const linkingPromises = [];

    // Link songs to albums
    for (const album of createdAlbums) {
      const songIds = createdSongs
        .filter((song) => song.album && song.album.equals(album._id))
        .map((song) => song._id);
      album.songs = songIds;
      linkingPromises.push(album.save());
    }

    // Link songs and albums to artists
    for (const artist of createdArtists) {
      const songIds = createdSongs
        .filter((song) => song.artist && song.artist.equals(artist._id))
        .map((song) => song._id);
      const albumIds = createdAlbums
        .filter((album) => album.artist && album.artist.equals(artist._id))
        .map((album) => album._id);

      artist.topSongs = songIds; // For simplicity, all songs are top songs
      artist.albums = albumIds;
      linkingPromises.push(artist.save());
    }

    await Promise.all(linkingPromises);
    console.log('🔗 Data linking complete.');

    console.log('✅ Seeding finished successfully!');
  } catch (error) {
    console.error('❌ Error while seeding data:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed.');
  }
};

seedDatabase();
