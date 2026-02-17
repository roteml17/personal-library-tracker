import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Book } from '../types';

interface WishListContextType {
  wishList: Book[];
  addToWishList: (book: Book) => void;
  removeFromWishList: (bookId: string) => void;
  isInWishList: (bookId: string) => boolean;
}

const WishListContext = createContext<WishListContextType | undefined>(undefined);

export const useWishList = (): WishListContextType => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error('useWishList must be used within WishListProvider');
  }
  return context;
};

interface WishListProviderProps {
  children: ReactNode;
}

export const WishListProvider = ({ children }: WishListProviderProps) => {
  const [wishList, setWishList] = useState<Book[]>(() => {
    // Load from localStorage on initialization
    const saved = localStorage.getItem('wishList');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem('wishList', JSON.stringify(wishList));
  }, [wishList]);

  const addToWishList = (book: Book) => {
    setWishList((prev) => [...prev, book]);
  };

  const removeFromWishList = (bookId: string) => {
    setWishList((prev) => prev.filter((book) => book.id !== bookId));
  };

  const isInWishList = (bookId: string): boolean => {
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

