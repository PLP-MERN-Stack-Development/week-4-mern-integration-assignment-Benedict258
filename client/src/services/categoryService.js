import axios from 'axios';

const API = '/api/categories';

export const fetchCategories = async () => {
  try {
    const response = await axios.get(API);

    // Handle both raw array or wrapped object
    const data = response.data;

    // If backend sends { data: [...] }, extract data.data
    if (Array.isArray(data)) {
      return data;
    } else if (Array.isArray(data.data)) {
      return data.data;
    } else {
      console.warn('Unexpected category response:', data);
      return [];
    }
  } catch (error) {
    console.error('❌ Error fetching categories:', error.message);
    return [];
  }
};
