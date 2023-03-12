import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ICONS_CODEPOINTS_LINK } from '../constants';

function useIconNames() {
  const [icons, setIcons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await axios.get(ICONS_CODEPOINTS_LINK);
        const data = response.data;
        const iconNames = data.split('\n').map(line => line.split(' ')[0]);//Extract first words of every line to get icon names list
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