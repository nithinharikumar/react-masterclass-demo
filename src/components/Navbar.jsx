import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { Sun, Moon, ShoppingBag, UserCheck, UserX, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ onToggleSidebar }) {
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, login, logout } = useAuth();
  
  // Demonstrating Redux state reading in Navbar
  const counterValue = useSelector((state) => state.counter.value);
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleSidebar}
          className="btn btn-secondary"
          style={{ padding: '0.4rem 0.6rem', display: 'none' }}
          id="mobile-menu-btn"
        >
          <Menu size={18} />
        </button>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Live Teaching Demo & Sandbox
          </span>
          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Interactive React & Web Dev Architecture
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Live Redux State Badges in Header */}
        <Link
          to="/state-management"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          title="Redux RTK State Values"
        >
          <span className="badge badge-purple" style={{ cursor: 'pointer' }}>
            RTK Count: {counterValue}
          </span>
          <span className="badge badge-primary" style={{ cursor: 'pointer' }}>
            <ShoppingBag size={12} /> Cart ({totalCartCount})
          </span>
        </Link>

        {/* Global Auth Context Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              title="Click to logout (Context API demo)"
            >
              <UserCheck size={14} color="#10b981" />
              <span>{user.name}</span>
            </button>
          ) : (
            <button
              onClick={() => login('Alex Rivera', 'Student')}
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              title="Click to login (Context API demo)"
            >
              <UserX size={14} color="#94a3b8" />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Theme Context Switcher */}
        <button
          onClick={toggleTheme}
          className="btn btn-secondary"
          style={{ padding: '0.45rem', borderRadius: '50%', width: '36px', height: '36px' }}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode (Context API)`}
        >
          {theme === 'dark' ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} color="#6366f1" />}
        </button>
      </div>
    </header>
  );
}
