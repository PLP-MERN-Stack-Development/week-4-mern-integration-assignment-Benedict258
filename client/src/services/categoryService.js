import axios from 'axios';

// This assumes the frontend is deployed on the same domain during production.
// You can adjust it if needed for absolute URLs.
const API = '/api/categories';

export const fetchCategories = async () => {
  try {
    const response = await axios.get(API);

    const data = response.data;

    // Log the raw response
    console.log('✅ Raw category API response:', data);

    // Handle different possible response shapes
    if (Array.isArray(data)) {
      return data;
    } else if (Array.isArray(data.data)) {
      console.log('✅ Extracted categories:', data.data);
      return data.data;
    } else {
      console.warn('⚠️ Unexpected category response format:', data);
      return [];
    }
  } catch (error) {
    console.error('❌ Error fetching categories:', error.message);
    return [];
  }
};
