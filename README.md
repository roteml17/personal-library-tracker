#Personal Library Tracker

A modern, minimalist web application for searching and managing your book wish list using the Google Books API.

## Features

- **Search Books** - Search millions of books by title or author
- **Wish List** - Save your favorite books to a personal wish list
- **Persistent Storage** - Your wish list is saved in localStorage
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Optimized Performance** - Debounced search to minimize API calls
- **Modern UI** - Clean, minimalist design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/roteml17/personal-library-tracker.git
cd personal-library-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigatalhost:5173
```

## 🎯 Bonus Features Implemented

- **Debouncing** - Search input is debounced to reduce API calls
- **Loading Indicators** - Visual feedback during data fetching
- **Tailwind CSS** - Modern, responsive styling
- **Empty States** - Helpful messages when no results or empty wish list

## 🔄 State Management

The application uses **React Context API** to manage shared state between the search results and wish list pages. This ensures consistent data across components without prop drilling.

### Architecture

- **WishListContext** (`src/context/WishListContext.jsx`) - Centralized state management for the wish list
- **WishListProvider** - Wraps the entire application, providing wish list state to all child components
- **useWishList Hook** - Custom hook that components use to access and modify the wish list state

### How It Works

1. **Shared State**: The `wishList` array is stored in the context and accessible from both `SearchPage` and `WishListPage`
2. **State Synchronization**: When a book is added or removed from the wish list on the search page, the wish list page automatically reflects the change
3. **Persistent Storage**: The wish list state is automatically synced with `localStorage` using `useEffect`, ensuring data persists across page refreshes
4. **State Methods**:
   - `addToWishList(book)` - Adds a book to the wish list
   - `removeFromWishList(bookId)` - Removes a book by ID
   - `isInWishList(bookId)` - Checks if a book is already in the wish list

### Example Usage

```jsx
// In SearchPage - Add book to wish list
const { addToWishList, isInWishList } = useWishList();
const inWishList = isInWishList(book.id);

// In WishListPage - Display and manage wish list
const { wishList, removeFromWishList } = useWishList();
```

This architecture ensures that:
- Search results can check if a book is already in the wish list (showing a filled heart icon)
- The wish list page always displays the current state
- No need to pass props through multiple component layers
- State changes are immediately reflected across all components
