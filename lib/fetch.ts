import { useState, useEffect, useCallback } from 'react';

export const fetchAPI = async (url: string, options?: RequestInit) => {
  try {
    // Fetch data from the server
    const response = await fetch(url, options);

    if (!response.ok) {
      // Handle HTTP errors
      new Error(`HTTP error! status: ${response.status}`);
    }
    // Parse the JSON response
    return await response.json();
  } catch (error) {
    // Handle network errors
    console.error('Fetch error:', error);
    throw error;
  }
};

export const useFetch = <T>(url: string, options?: RequestInit) => {
  // Initialize the state
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the server
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Call the fetchAPI function
      const result = await fetchAPI(url, options);
      setData(result.data);
    } catch (err) {
      // Handle errors
      setError((err as Error).message);
    } finally {
      // Set loading to false
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    // Call the fetchData function
    fetchData();
  }, [fetchData]);

  // Return the state
  return { data, loading, error, refetch: fetchData };
};
