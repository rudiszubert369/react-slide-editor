import { useEffect } from 'react';
import axios from 'axios';
import useLocalStorage from './useLocalStorage';

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
        }, 1000); //Timeout added just to be able to exhibit the spinner
      } catch (error) {
        console.error('Error fetching icon data:', error);
      }
    };
    fetchData();
  }, [icons, setIcons]);

  return icons;
}

export default useIconNames;
