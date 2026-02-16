import { useWishList } from '../context/WishListContext';

const BookCard = ({ book, showRemoveButton = false, onBookClick }) => {
  const { addToWishList, removeFromWishList, isInWishList } = useWishList();

  const bookInfo = book.volumeInfo;
  const thumbnail = bookInfo.imageLinks?.large ||
    bookInfo.imageLinks?.medium ||
    bookInfo.imageLinks?.small ||
    bookInfo.imageLinks?.thumbnail ||
    'https://via.placeholder.com/128x192?text=No+Cover';
  const title = bookInfo.title || 'Unknown Title';
  const authors = bookInfo.authors?.join(', ') || 'Unknown Author';
  const inWishList = isInWishList(book.id);

  const handleAddToWishList = () => {
    addToWishList(book);
  };

  const handleRemoveFromWishList = () => {
    removeFromWishList(book.id);
  };

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-md relative cursor-pointer"
      onClick={() => onBookClick && onBookClick(book)}
    >
      <div className="aspect-square overflow-hidden bg-gray-50 rounded-t-2xl relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />
        {/* Add/Remove button in bottom right corner */}
        {showRemoveButton ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFromWishList();
            }}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm bg-white text-red-500 hover:bg-red-50 active:scale-[0.95] z-10"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToWishList();
            }}
            disabled={inWishList}
            className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm z-10 ${inWishList
              ? 'bg-red-100 text-red-500 cursor-not-allowed'
              : 'bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 active:scale-[0.95]'
              }`}
          >
            {inWishList ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            )}
          </button>
        )}
      </div>

      <div className="p-4 text-center">
        <h3 className="font-light text-gray-900 mb-2 line-clamp-2 min-h-[3rem] text-sm leading-snug" title={title}>
          {title}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-1 font-light" title={authors}>
          {authors}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
