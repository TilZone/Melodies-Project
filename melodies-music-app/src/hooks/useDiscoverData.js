import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance'; // Use our configured axios instance

const useDiscoverData = () => {
  const [newSongs, setNewSongs] = useState([]);
  const [popularArtists, setPopularArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Correct API endpoints with query parameters
        const newSongsResponse = await axiosInstance.get('/songs', {
          params: { isNewRelease: true },
        });
        const popularArtistsResponse = await axiosInstance.get('/artists', {
          params: { isPopular: true, limit: 10 },
        });

        setNewSongs(
          Array.isArray(newSongsResponse.data.data.items) ? newSongsResponse.data.data.items : []
        );

        setPopularArtists(
          Array.isArray(popularArtistsResponse.data.data.items)
            ? popularArtistsResponse.data.data.items
            : []
        );
      } catch (err) {
        setError('Failed to fetch discover data.');
        console.error('Error fetching discover data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { newSongs, popularArtists, loading, error };
};

export default useDiscoverData;
