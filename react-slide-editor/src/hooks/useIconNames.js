import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useIconNames() {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const storedIcons = localStorage.getItem('icons');

    if (storedIcons) {
      setIcons(JSON.parse(storedIcons));
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(process.env.REACT_APP_ICON_NAMES_API);
          const data = response.data;
          const iconNames = data.split('\n').map(line => line.split(' ')[0]);// Extract icon names from response data
          setIcons(iconNames);
          localStorage.setItem('icons', JSON.stringify(iconNames));
        } catch (error) {
          console.error('Error fetching icon data:', error);
        }
      };
      fetchData();
    }
  }, []);
  
  return icons;
}

export default useIconNames;
