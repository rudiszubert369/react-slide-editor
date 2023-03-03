import { useEffect, useState } from 'react';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';

function useIconNames() {
  const [icons, setIcons] = useLocalStorage('icons', []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (icons.length > 0) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_ICON_NAMES_API);
        const data = response.data;
        const iconNames = data.split('\n').map(line => line.split(' ')[0]);
        setIcons(iconNames);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching icon data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [icons, setIcons]);

  // if (loading) {
  //   return <div>Loading icons...</div>;
  // }

  return icons;
}

export default useIconNames;
