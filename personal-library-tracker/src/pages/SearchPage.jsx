import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import BookDetailModal from '../components/BookDetailModal';
import { searchBooks } from '../services/googleBooksApi';
import { useDebounce } from '../utils/useDebounce';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBooks = async () => {
      const term = debouncedSearchTerm.trim();

      if (!term) {
        setBooks([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await searchBooks(term, controller.signal);
        setBooks(results);
      } catch (err) {
        // ignore aborted requests (user typed again / navigated away)
        if (err?.name === 'AbortError') return;

        setError('Failed to fetch books. Please try again.');
        console.error(err);
      } finally {
        // If the request was aborted, avoid toggling loading back (optional but clean)
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      controller.abort();
    };
  }, [debouncedSearchTerm]);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        {/* Centered search input */}
        <div className="flex justify-center mb-8 pt-6">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-gray-600 rounded-full"></div>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm text-center">
            {error}
          </div>
        )}

        {!debouncedSearchTerm.trim() && !isLoading && (
          <div className="text-center text-gray-400 mt-24">
            <p className="text-sm font-light">Start typing to search for books</p>
          </div>
        )}

        {debouncedSearchTerm.trim() && books.length === 0 && !isLoading && !error && (
          <div className="text-center text-gray-400 mt-24">
            <p className="text-sm font-light">
              No books found for "{debouncedSearchTerm}"
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onBookClick={handleBookClick} />
          ))}
        </div>
      </div>

      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SearchPage;
