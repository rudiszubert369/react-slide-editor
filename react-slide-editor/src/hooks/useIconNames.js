import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useIconNames() {
  const [icons, setIcons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_ICON_NAMES_API);
        const data = response.data;
        const iconNames = data.split('\n').map(line => line.split(' ')[0]);
        setIcons(iconNames);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching icon data:', error);
      }
    };
    fetchIcons();
  }, []);

  return { icons, isLoading };
}

export default useIconNames;