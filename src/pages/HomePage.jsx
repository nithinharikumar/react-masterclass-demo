import React from 'react';
import { Link } from 'react-router-dom';
import {
  Network,
  SplitSquareVertical,
  Compass,
  Cpu,
  ArrowLeftRight,
  Server,
  ArrowRight,
  Sparkles,
  BookOpenCheck
} from 'lucide-react';

export default function HomePage() {
  const modules = [
    {
      id: 1,
      to: '/data-fetching',
      title: 'Data Fetching in React',
      tag: 'Fetch API vs Axios',
      desc: 'Master Promises, async/await, try...catch, loading & error states, HTTP status checking, and AbortController request cancellation.',
      icon: Network,
      color: '#6366f1'
    },
    {
      id: 2,
      to: '/conditional-rendering',
      title: 'Conditional Rendering',
      tag: 'UI State Logic',
      desc: 'Explore if/else guards, ternary operators, logical AND (&&) numeric edge cases, and switch-case state machines.',
      icon: SplitSquareVertical,
      color: '#06b6d4'
    },
    {
      id: 3,
      to: '/react-router',
      title: 'React Router & Navigation',
      tag: 'Client-side Routing',
      desc: 'Demonstrate BrowserRouter, Routes, Route, Link, useParams (:id dynamic routes), useNavigate hook, and nested routes with <Outlet />.',
      icon: Compass,
      color: '#10b981'
    },
    {
      id: 4,
      to: '/state-management',
      title: 'State Management',
      tag: 'Context vs Redux Toolkit',
      desc: 'Understand prop drilling elimination with Context API vs scalable global stores with Redux Toolkit (slices, configureStore, useSelector, useDispatch).',
      icon: Cpu,
      color: '#a855f7'
    },
    {
      id: 5,
      to: '/rest-vs-graphql',
      title: 'REST vs GraphQL',
      tag: 'API Architecture',
      desc: 'Visual side-by-side interactive playground comparing multi-endpoint waterfalls / over-fetching with single-query precise GraphQL fetching.',
      icon: ArrowLeftRight,
      color: '#f59e0b'
    },
    {
      id: 6,
      to: '/ssr-nextjs',
      title: 'Server-Side Rendering & Next.js',
      tag: 'SSR, SSG, ISR & CSR',
      desc: 'Understand rendering lifecycles, SEO & performance benefits, App Router Server vs Client Components, and caching policies.',
      icon: Server,
      color: '#ec4899'
    }
  ];

  return (
    <div className="page-wrapper animate-fade-in">
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }} className="badge badge-primary">
          <Sparkles size={14} /> Comprehensive Teaching Companion
        </div>
        <h1 style={{ fontSize: '2.8rem', lineHeight: 1.15, marginBottom: '1rem' }}>
          React & Modern Web Development <span className="gradient-text">Masterclass Demo</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          An all-in-one live interactive application created specifically for educators to demonstrate, explain, and experiment with all core concepts from your study notes.
        </p>
      </div>

      <div className="grid-3" style={{ marginBottom: '3rem' }}>
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.id}
              to={m.to}
              className="card"
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'var(--transition)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: `rgba(99, 102, 241, 0.1)`,
                    border: `1px solid rgba(99, 102, 241, 0.25)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: m.color
                  }}>
                    <Icon size={22} />
                  </div>
                  <span className="badge badge-primary">{m.tag}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  Module {m.id}: {m.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  {m.desc}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#818cf8', fontWeight: 600, fontSize: '0.88rem' }}>
                <span>Launch Interactive Demo</span>
                <ArrowRight size={15} />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <BookOpenCheck size={28} color="#818cf8" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Teacher's Guide to Presenting in Class</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Each module includes live working UI widgets, real-time code samples taken directly from the study notes, student toggle switches (such as simulating server errors, aborting slow requests, modifying Redux state, comparing REST vs GraphQL payloads), and key takeaways.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
