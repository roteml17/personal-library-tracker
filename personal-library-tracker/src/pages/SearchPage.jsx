import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { searchBooks } from '../services/googleBooksApi';
import { useDebounce } from '../utils/useDebounce';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!debouncedSearchTerm.trim()) {
        setBooks([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await searchBooks(debouncedSearchTerm);
        setBooks(results);
      } catch (err) {
        setError('Failed to fetch books. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedSearchTerm]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        {/* Centered search input */}
        <div className="flex justify-center mb-8 pt-6">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            isLoading={isLoading}
          />
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm text-center">
            {error}
          </div>
        )}

        {!searchTerm.trim() && (
          <div className="text-center text-gray-400 mt-24">
            <p className="text-sm font-light">Start typing to search for books</p>
          </div>
        )}

        {debouncedSearchTerm && books.length === 0 && !isLoading && (
          <div className="text-center text-gray-400 mt-24">
            <p className="text-sm font-light">No books found for "{debouncedSearchTerm}"</p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
