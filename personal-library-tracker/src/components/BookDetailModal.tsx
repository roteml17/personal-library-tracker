import { useState, useEffect } from 'react';
import { useWishList } from '../context/WishListContext';
import { getBookDetails } from '../services/googleBooksApi';
import type { Book } from '../types';

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookDetailModal = ({ book, isOpen, onClose }: BookDetailModalProps) => {
    const { addToWishList, removeFromWishList, isInWishList } = useWishList();
    const [fullBookData, setFullBookData] = useState<Book | null>(null);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    useEffect(() => {
        if (isOpen && book?.id) {
            // Load full details from API
            setIsLoadingDetails(true);
            getBookDetails(book.id)
                .then((data) => {
                    setFullBookData(data);
                })
                .catch((error) => {
                    console.error('Error loading book details:', error);
                    // If error, use existing data
                    setFullBookData(book);
                })
                .finally(() => {
                    setIsLoadingDetails(false);
                });
        }
    }, [isOpen, book?.id]);

    if (!isOpen || !book) return null;

    // Use full data if available, otherwise use existing data
    const bookData = fullBookData || book;
    const bookInfo = bookData.volumeInfo;

    const thumbnail = bookInfo.imageLinks?.large ||
        bookInfo.imageLinks?.medium ||
        bookInfo.imageLinks?.small ||
        bookInfo.imageLinks?.thumbnail ||
        'https://via.placeholder.com/128x192?text=No+Cover';
    const title = bookInfo.title || 'Unknown Title';
    const authors = bookInfo.authors?.join(', ') || 'Unknown Author';

    // Clean HTML from description if present
    const cleanDescription = (text: string | undefined): string => {
        if (!text) return 'No description available.';
        // Basic HTML tag removal
        if (typeof window !== 'undefined') {
            const div = document.createElement('div');
            div.innerHTML = text;
            return div.textContent || div.innerText || 'No description available.';
        }
        // If no window (SSR), remove tags manually
        return text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim() || 'No description available.';
    };

    const description = cleanDescription(bookInfo.description);
    const publishedDate = bookInfo.publishedDate || 'Unknown';
    const pageCount = bookInfo.pageCount || 'Unknown';
    const categories = bookInfo.categories?.join(', ') || 'Uncategorized';
    const inWishList = isInWishList(book.id);

    const handleAddToWishList = () => {
        addToWishList(book);
    };

    const handleRemoveFromWishList = () => {
        removeFromWishList(book.id);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with close button */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Book Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        {/* Book Cover */}
                        <div className="flex-shrink-0">
                            <img
                                src={thumbnail}
                                alt={title}
                                className="w-48 h-72 object-cover rounded-lg shadow-md mx-auto md:mx-0"
                            />
                        </div>

                        {/* Book Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{title}</h1>
                            <p className="text-lg text-gray-600 mb-4">by {authors}</p>

                            {/* Metadata */}
                            <div className="space-y-2 mb-6 text-sm text-gray-500">
                                <p><span className="font-medium">Published:</span> {publishedDate}</p>
                                <p><span className="font-medium">Pages:</span> {pageCount}</p>
                                <p><span className="font-medium">Categories:</span> {categories}</p>
                            </div>

                            {/* Wish List Button */}
                            {inWishList ? (
                                <button
                                    onClick={handleRemoveFromWishList}
                                    className="px-6 py-3 bg-red-100 text-red-600 rounded-full font-medium hover:bg-red-200 transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                    Remove from Wish List
                                </button>
                            ) : (
                                <button
                                    onClick={handleAddToWishList}
                                    className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                    Add to Wish List
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                        {isLoadingDetails ? (
                            <div className="flex items-center gap-2 text-gray-500">
                                <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                                <span className="text-sm">Loading description...</span>
                            </div>
                        ) : (
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{description}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailModal;

