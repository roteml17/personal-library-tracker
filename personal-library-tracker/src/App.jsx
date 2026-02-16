import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WishListProvider } from './context/WishListContext';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <WishListProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<SearchPage />} />
          </Routes>
        </div>
      </Router>
    </WishListProvider>
  );
}

export default App;
