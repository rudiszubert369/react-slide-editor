import { useEffect } from 'react';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';

const UNNECESSARY_LOADING_TIME = 3000;

function useIconNames() {
  const [icons, setIcons] = useLocalStorage('icons', []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_ICON_NAMES_API);
        const data = response.data;
        const iconNames = data.split('\n').map(line => line.split(' ')[0]);
        setTimeout(() => {
          setIcons(iconNames);
        }, UNNECESSARY_LOADING_TIME); //Timeout added just for spinner presentational purposes, fetch is usually too fast
      } catch (error) {
        console.error('Error fetching icon data:', error);
      }
    };
    fetchData();
  }, [icons, setIcons]);

  return icons;
}

export default useIconNames;
