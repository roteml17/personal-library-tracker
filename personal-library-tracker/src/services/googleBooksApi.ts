import type { Book } from '../types';

const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (searchTerm: string, signal?: AbortSignal): Promise<Book[]> => {
    const term = (searchTerm ?? '').trim();
    if (!term) return [];

    try {
        // Search server-side by title OR author
        const q = `intitle:${term} OR inauthor:${term}`;
        const url = `${API_BASE_URL}?q=${encodeURIComponent(q)}&maxResults=40`;

        const response = await fetch(url, { signal });

        if (!response.ok) {
            // Handle rate limiting (429) with a more user-friendly message
            if (response.status === 429) {
                const errorData = await response.json().catch(() => ({}));
                if (errorData.error?.status === 'RESOURCE_EXHAUSTED') {
                    throw new Error('Daily quota exceeded. The API limit has been reached for today. Please try again tomorrow.');
                }
                throw new Error('Too many requests. Please wait a moment and try again.');
            }
            throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
        }

        const data = await response.json() as { items?: Book[] };
        return (data.items || []) as Book[];
    } catch (error) {
        // If request was aborted (user typed again), ignore it
        if (error instanceof Error && error?.name === 'AbortError') return [];
        console.error('Error fetching books:', error);
        throw error;
    }
};

// Function to get full book details by ID
export const getBookDetails = async (bookId: string, signal?: AbortSignal): Promise<Book | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/${bookId}`, { signal });

        if (!response.ok) {
            throw new Error(`Failed to fetch book details: ${response.status} ${response.statusText}`);
        }

        return (await response.json()) as Book;
    } catch (error) {
        if (error instanceof Error && error?.name === 'AbortError') return null;
        console.error('Error fetching book details:', error);
        throw error;
    }
};

