const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (searchTerm, signal) => {
  const term = (searchTerm ?? '').trim();
  if (!term) return [];

  try {
    // Search server-side by title OR author
    const q = `intitle:${term} OR inauthor:${term}`;
    const url = `${API_BASE_URL}?q=${encodeURIComponent(q)}&maxResults=40`;

    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    // If request was aborted (user typed again), ignore it
    if (error?.name === 'AbortError') return [];
    console.error('Error fetching books:', error);
    throw error;
  }
};

// פונקציה לקבלת פרטים מלאים של ספר לפי ID
export const getBookDetails = async (bookId, signal) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${bookId}`, { signal });

    if (!response.ok) {
      throw new Error('Failed to fetch book details');
    }

    return await response.json();
  } catch (error) {
    if (error?.name === 'AbortError') return null;
    console.error('Error fetching book details:', error);
    throw error;
  }
};
