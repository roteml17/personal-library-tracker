const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (searchTerm) => {
  if (!searchTerm.trim()) {
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}?q=${encodeURIComponent(searchTerm)}`);

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await response.json();

    return data.items || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};
