import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Spin, Image, Button, Slider } from 'antd';
import {
  PlayCircleFilled,
  PauseCircleFilled,
  StepBackwardFilled,
  StepForwardFilled,
  SoundOutlined,
  AudioMutedOutlined,
} from '@ant-design/icons';
import { fetchSongById } from '../../services/api.js';
import { usePlayerStore } from '../../store/usePlayerStore.js';

const { Title, Text, Paragraph } = Typography;

const MusicPage = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);

  // Player state and actions from global store
  const {
    currentSong,
    isPlaying,
    volume,
    duration,
    currentTime,
    playSong,
    pauseSong,
    togglePlayPause,
    setVolume,
    setProgress,
    setCurrentTime,
  } = usePlayerStore();

  // Fetch song data and update player state when song ID changes
  useEffect(() => {
    const loadSong = async () => {
      if (id) {
        setLoading(true);
        try {
          const fetchedSong = await fetchSongById(id);
          setSong(fetchedSong || null);
          if (fetchedSong && (!currentSong || currentSong.id !== fetchedSong.id)) {
            playSong(fetchedSong);
          }
          // Parse duration from "MM:SS" format to seconds
          if (fetchedSong?.duration) {
            const [minutes, seconds] = fetchedSong.duration.split(':').map(Number);
            usePlayerStore.setState({ duration: minutes * 60 + seconds });
          }
        } catch (error) {
          console.error('Error loading song:', error);
          setSong(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setSong(null);
      }
    };
    loadSong();
  }, [id, currentSong, playSong]);

  // Simulate audio playback progress
  useEffect(() => {
    let interval;
    if (isPlaying && currentSong && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => prev + 1);
        setProgress(
          (usePlayerStore.getState().currentTime / usePlayerStore.getState().duration) * 100
        );
      }, 1000);
    } else if (currentTime >= duration && isPlaying) {
      // Reset player when song ends
      pauseSong();
      setCurrentTime(0);
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong, currentTime, duration, setCurrentTime, setProgress, pauseSong]);

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!song) {
    return (
      <div className="text-center p-8">
        <Title level={3} className="text-gray-800 dark:text-gray-200">
          Song not found.
        </Title>
        <Link to="/discover" className="text-green-500 hover:underline">
          Back to Discover
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start">
        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
          <Image
            width={250}
            height={250}
            src={song.coverArt}
            alt={song.title}
            className="rounded-lg shadow-lg border border-gray-300 dark:border-gray-600"
            preview={false}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/250x250/535353/FFFFFF?text=No+Image';
            }}
          />
        </div>
        <div className="text-center md:text-left flex-grow">
          <Title level={2} className="text-gray-900 dark:text-gray-100 mb-2">
            {song.title}
          </Title>
          <Title level={4} className="text-gray-700 dark:text-gray-300 mb-4">
            <Link to={`/artists?id=${song.artist.id}`} className="text-green-500 hover:underline">
              {song.artist.name}
            </Link>
          </Title>

          {/* Playback controls */}
          <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
            <Button
              type="text"
              icon={<StepBackwardFilled className="text-gray-700 dark:text-gray-300 text-3xl" />}
              className="p-0 h-auto"
            />
            <Button
              type="text"
              icon={
                isPlaying ? (
                  <PauseCircleFilled className="text-green-500 text-5xl" />
                ) : (
                  <PlayCircleFilled className="text-green-500 text-5xl" />
                )
              }
              onClick={togglePlayPause}
              className="p-0 h-auto"
            />
            <Button
              type="text"
              icon={<StepForwardFilled className="text-gray-700 dark:text-gray-300 text-3xl" />}
              className="p-0 h-auto"
            />
          </div>

          {/* Progress bar */}
          <div className="flex items-center space-x-2 w-full mb-4">
            <Text className="text-gray-600 dark:text-gray-400 text-sm">
              {formatTime(currentTime)}
            </Text>
            <Slider
              min={0}
              max={duration}
              value={currentTime}
              onChange={(value) => {
                setCurrentTime(value);
                setProgress((value / duration) * 100);
              }}
              step={1}
              className="flex-grow"
              tooltip={{ formatter: (value) => formatTime(value || 0) }}
            />
            <Text className="text-gray-600 dark:text-gray-400 text-sm">{formatTime(duration)}</Text>
          </div>

          {/* Volume controls */}
          <div className="flex items-center space-x-2 w-full justify-center md:justify-start">
            <Button
              type="text"
              icon={
                volume === 0 ? (
                  <AudioMutedOutlined className="text-gray-700 dark:text-gray-300 text-xl" />
                ) : (
                  <SoundOutlined className="text-gray-700 dark:text-gray-300 text-xl" />
                )
              }
              onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
              className="p-0 h-auto"
            />
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={setVolume}
              className="w-32"
              tooltip={{
                formatter: (value) => `${Math.round((value || 0) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Song lyrics section */}
      <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-4xl">
        <Title level={3} className="text-gray-900 dark:text-gray-100 mb-4">
          Lyrics
        </Title>
        <Paragraph className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
          {song.lyrics || 'No lyrics available for this song.'}
        </Paragraph>
      </div>
    </div>
  );
};

export default MusicPage;
