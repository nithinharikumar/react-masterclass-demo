import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Layers,
  Network,
  SplitSquareVertical,
  Compass,
  Cpu,
  ArrowLeftRight,
  Server,
  Sparkles,
  GraduationCap
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { to: '/', label: 'Curriculum Overview', icon: GraduationCap, badge: 'Overview' },
    { to: '/data-fetching', label: '1. Data Fetching', icon: Network, badge: 'Fetch / Axios' },
    { to: '/conditional-rendering', label: '2. Conditional Rendering', icon: SplitSquareVertical, badge: 'UI Logic' },
    { to: '/react-router', label: '3. React Router', icon: Compass, badge: 'Routes & Params' },
    { to: '/state-management', label: '4. State Management', icon: Cpu, badge: 'Context & RTK' },
    { to: '/rest-vs-graphql', label: '5. REST vs GraphQL', icon: ArrowLeftRight, badge: 'API Design' },
    { to: '/ssr-nextjs', label: '6. Next.js & SSR', icon: Server, badge: 'Rendering' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div style={{ padding: '1.5rem', borderBottom: 'var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)' }}>
          <Layers size={20} />
        </div>
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
            React <span className="gradient-text">Mastery</span>
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Classroom Teaching Demo</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: '1rem 0.75rem', overflowY: 'auto' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', padding: '0.5rem 0.75rem' }}>
          Teaching Modules
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) => `
                  sidebar-nav-item ${isActive ? 'active' : ''}
                `}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.7rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  background: isActive ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
                  transition: 'var(--transition)',
                  boxShadow: isActive ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'
                })}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Icon size={17} />
                  <span>{item.label}</span>
                </div>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div style={{ padding: '1rem', borderTop: 'var(--glass-border)', background: 'rgba(255, 255, 255, 0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Sparkles size={16} color="#fbbf24" />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            All 6 Study Guide Modules Ready
          </span>
        </div>
      </div>
    </aside>
  );
}
