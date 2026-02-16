import { useWishList } from '../context/WishListContext';
import BookCard from '../components/BookCard';

const WishListPage = () => {
  const { wishList } = useWishList();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-light text-gray-900 tracking-tight mb-3">
            My Wish List
          </h1>
          <p className="text-gray-500">
            {wishList.length === 0
              ? 'Your wish list is empty'
              : `${wishList.length} ${wishList.length === 1 ? 'book' : 'books'} saved`
            }
          </p>
        </div>

        {wishList.length === 0 ? (
          <div className="text-center mt-24">
            <div className="inline-block p-8 bg-white rounded-3xl border border-gray-200 mb-6">
              <svg className="w-20 h-20 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-light text-gray-600 mb-2">No books yet</h2>
            <p className="text-gray-400 mb-8">Start adding books from the search page</p>

            <a
              href="/"
              className="inline-block px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Browse Books
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {wishList.map((book) => (
              <BookCard key={book.id} book={book} showRemoveButton={true} />
            ))}
          </div>
        )}
      </div>
    </div >
  );
};

export default WishListPage;
