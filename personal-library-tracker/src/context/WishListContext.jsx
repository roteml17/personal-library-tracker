import { createContext, useContext, useState, useEffect } from 'react';

const WishListContext = createContext();

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error('useWishList must be used within WishListProvider');
  }
  return context;
};

export const WishListProvider = ({ children }) => {
  const [wishList, setWishList] = useState(() => {
    // Load from localStorage on initialization
    const saved = localStorage.getItem('wishList');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem('wishList', JSON.stringify(wishList));
  }, [wishList]);

  const addToWishList = (book) => {
    setWishList((prev) => [...prev, book]);
  };

  const removeFromWishList = (bookId) => {
    setWishList((prev) => prev.filter((book) => book.id !== bookId));
  };

  const isInWishList = (bookId) => {
    return wishList.some((book) => book.id === bookId);
  };

  return (
    <WishListContext.Provider
      value={{
        wishList,
        addToWishList,
        removeFromWishList,
        isInWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
