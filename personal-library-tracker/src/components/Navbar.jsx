import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center py-4">

          {/* Logo - גדול וממורכז */}
          <Link to="/" className="mb-4">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900">
              Library
            </h1>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-2">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              Search
            </NavLink>

            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              Wish List
            </NavLink>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
