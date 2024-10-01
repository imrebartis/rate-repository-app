import { useState, useEffect } from 'react';
import Constants from 'expo-constants';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchRepositories = async () => {
    const response = await fetch(`${Constants.expoConfig.extra.APOLLO_URI}:5000/api/repositories`);
    const json = await response.json();

    console.log(json);

    setRepositories(json);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        await fetchRepositories();
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { repositories, loading, error };
};

export default useRepositories;
