import { useState, useEffect } from 'react';

function useIconNames() {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const storedIcons = localStorage.getItem('icons');

    if (storedIcons) {
      setIcons(JSON.parse(storedIcons));
    } else {
      const fetchData = async () => {
        const response = await fetch('https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints');
        const data = await response.text();
        const iconNames = data.split('\n').map(line => line.split(' ')[0]);
        setIcons(iconNames);
        localStorage.setItem('icons', JSON.stringify(iconNames));
      };
      fetchData();
    }
  }, []);
  
  return icons;
}

export default useIconNames;