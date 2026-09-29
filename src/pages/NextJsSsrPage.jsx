import React, { useState } from 'react';
import ConceptHeader from '../components/ConceptHeader';
import CodeBlock from '../components/CodeBlock';
import WorkflowExplainer from '../components/WorkflowExplainer';
import {
  Server,
  Layers,
  Cpu,
  Sparkles,
  Zap,
  Globe,
  Search,
  CheckCircle2,
  FileCode2,
  SlidersHorizontal,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function NextJsSsrPage() {
  const [activeTab, setActiveTab] = useState('strategies');
  const [selectedStrategy, setSelectedStrategy] = useState('ssr');
  const [componentType, setComponentType] = useState('server');
  const [cachePolicy, setCachePolicy] = useState('no-store');

  const strategies = [
    {
      id: 'ssr',
      name: 'SSR (Server-Side Rendering)',
      tag: 'Dynamic per request',
      badge: 'badge-primary',
      desc: 'HTML is computed and rendered on the Node.js/Edge server for each user request.',
      useCase: 'Personalized user dashboards, dynamic feeds, currency rates.',
      cachingCode: `fetch('https://api.example.com/data', { cache: 'no-store' })`
    },
    {
      id: 'ssg',
      name: 'SSG (Static Site Generation)',
      tag: 'Pre-rendered at build',
      badge: 'badge-success',
      desc: 'HTML is rendered once during `npm run build` and served lightning-fast via global CDN edges.',
      useCase: 'Marketing pages, blog posts, documentation portals.',
      cachingCode: `fetch('https://api.example.com/posts', { cache: 'force-cache' })`
    },
    {
      id: 'isr',
      name: 'ISR (Incremental Static Regeneration)',
      tag: 'Hybrid Background Refresh',
      badge: 'badge-purple',
      desc: 'Static pages are generated at build time but automatically re-rendered in the background periodically.',
      useCase: 'E-commerce product catalogs, news portals.',
      cachingCode: `fetch('https://api.example.com/products', { next: { revalidate: 60 } })`
    },
    {
      id: 'csr',
      name: 'CSR (Client-Side Rendering)',
      tag: 'Browser execution',
      badge: 'badge-warning',
      desc: 'Server sends a minimal HTML shell (`<div id="root"></div>`); the browser downloads JS, executes React, and fetches data.',
      useCase: 'Internal tools behind authentication, rich canvases.',
      cachingCode: `useEffect(() => { fetch('/api/data').then(...) }, [])`
    }
  ];

  const appRouterCode = `// app/users/page.js — Server Component by default in Next.js App Router
// ✅ NO useState, NO useEffect, NO loading boilerplate for initial data!
async function UsersPage() {
  // 1. SSR Mode (Fetch on every request)
  const res = await fetch("https://api.example.com/users", {
    cache: "no-store" // Disables caching -> SSR behaviour
  });
  
  const users = await res.json();

  return (
    <main>
      <h1>Student Directory (SSR Pre-rendered)</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </main>
  );
}

export default UsersPage;`;

  const clientComponentCode = `// app/components/InteractiveCounter.jsx
"use client"; // 👈 Mandatory directive to make this a Client Component!

import { useState } from "react";

export default function InteractiveCounter() {
  // Client components have access to React Hooks and browser events:
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes(likes + 1)}>
      👍 Likes: {likes}
    </button>
  );
}`;

  return (
    <div className="page-wrapper animate-fade-in">
      <ConceptHeader
        moduleNumber={6}
        title="Server-Side Rendering with Next.js"
        subtitle="Explore the 4 modern rendering strategies (SSR, SSG, ISR, CSR), Next.js App Router Server Components, and why SSR delivers superior SEO & First Contentful Paint."
        keyPoints={[
          "SSR renders components to HTML on the server for each request, solving SEO and slow initial load times.",
          "Next.js App Router components are Server Components by default — they can directly `await` data without `useEffect`.",
          "Add `'use client'` at the top of a file only when you need interactive hooks (useState, useEffect) or event handlers (onClick).",
          "Rendering strategies are controlled cleanly via the `fetch()` cache options (`cache: 'no-store'` vs `cache: 'force-cache'`)."
        ]}
        badgeColor="badge-primary"
      />

      {/* Under-the-Hood Workflow Explainer */}
      <WorkflowExplainer
        title="Next.js SSR & Server Component Lifecycle"
        conceptSummary="In Next.js App Router, Server Components run purely on the server. They have direct access to database sockets and never add a single byte of JavaScript to the browser's bundle. When interactive state is needed, `'use client'` boundary components hydrate on the client browser."
        backendSummary="When a request hits Next.js (Node.js/Edge runtime), the server executes the React Server Components tree, resolves all async data fetches, generates fully formed HTML and React Server Component (RSC) payload streams, and flushes it immediately to the browser socket for blazing-fast First Contentful Paint."
        steps={[
          {
            title: "Browser Requests URL",
            actor: "Browser / Search Crawler",
            description: "User navigates to /users. The request reaches the Next.js Node.js / Vercel Edge Server.",
            code: "GET /users HTTP/1.1"
          },
          {
            title: "Server Component Direct Execution",
            actor: "Next.js Node.js Server",
            description: "The server runs async function UsersPage(), executes direct database queries, and awaits the data without useEffect.",
            code: "const users = await db.query('SELECT * FROM users');"
          },
          {
            title: "HTML Stream Generation & Delivery",
            actor: "Next.js Streaming Engine",
            description: "Next.js converts JSX into full HTML string (`<ul><li>Leanne...</li></ul>`) and streams it to the browser. Crawlers index it immediately.",
            code: "renderToReadableStream(<UsersPage />) -> 200 OK text/html"
          },
          {
            title: "Client Hydration (For 'use client' parts)",
            actor: "Browser React Hydrator",
            description: "The browser displays text instantly (First Contentful Paint). Small client-side JS bundles download and attach event listeners to 'use client' buttons.",
            code: "hydrateRoot(document, <ClientComponents />)"
          }
        ]}
        commonMistakes={[
          "Adding 'use client' everywhere out of habit (this turns off server-side rendering benefits and bloats the JS bundle).",
          "Attempting to read `window` or `localStorage` inside Server Components (they run on Node.js where `window` is undefined).",
          "Forgetting to configure caching flags (`cache: 'no-store'` for real-time dynamic data vs `cache: 'force-cache'` for static pages)."
        ]}
      />

      <div className="tab-list">
        <button
          className={`tab-button ${activeTab === 'strategies' ? 'active' : ''}`}
          onClick={() => setActiveTab('strategies')}
        >
          <SlidersHorizontal size={16} /> 4 Rendering Strategies (SSR / SSG / ISR / CSR)
        </button>
        <button
          className={`tab-button ${activeTab === 'rsc' ? 'active' : ''}`}
          onClick={() => setActiveTab('rsc')}
        >
          <Cpu size={16} /> Server vs Client Components Simulator
        </button>
        <button
          className={`tab-button ${activeTab === 'seo' ? 'active' : ''}`}
          onClick={() => setActiveTab('seo')}
        >
          <Zap size={16} /> Why SSR / Next.js? (SEO &amp; Performance)
        </button>
        <button
          className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          <FileCode2 size={16} /> App Router Code Notes
        </button>
      </div>

      {activeTab === 'strategies' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {strategies.map((st) => (
              <div
                key={st.id}
                onClick={() => setSelectedStrategy(st.id)}
                className="card"
                style={{
                  cursor: 'pointer',
                  borderColor: selectedStrategy === st.id ? '#6366f1' : 'rgba(255, 255, 255, 0.08)',
                  background: selectedStrategy === st.id ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-card)',
                  transform: selectedStrategy === st.id ? 'translateY(-2px)' : 'none',
                  boxShadow: selectedStrategy === st.id ? '0 8px 24px rgba(99, 102, 241, 0.25)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className={`badge ${st.badge}`}>{st.tag}</span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    Strategy: {st.id.toUpperCase()}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{st.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {st.desc}
                </p>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: 'var(--glass-border)', paddingTop: '0.75rem' }}>
                  <strong>Common Use Case:</strong> {st.useCase}
                </div>
              </div>
            ))}
          </div>

          {/* Strategy Details Box */}
          <div className="card" style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Sparkles size={18} color="#818cf8" />
              <h4 style={{ fontSize: '1rem' }}>Next.js App Router Data Fetching Syntax for Selected Strategy:</h4>
            </div>
            <div className="code-container" style={{ margin: 0 }}>
              <pre className="code-content">
                <code>{strategies.find(s => s.id === selectedStrategy)?.cachingCode}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rsc' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Server vs Client Components</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              In Next.js App Router, components run on the server by default. Choose a component type below to inspect capabilities:
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <button
                className={`btn ${componentType === 'server' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1 }}
                onClick={() => setComponentType('server')}
              >
                <Server size={15} /> Server Component (Default)
              </button>
              <button
                className={`btn ${componentType === 'client' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1 }}
                onClick={() => setComponentType('client')}
              >
                <Cpu size={15} /> Client Component ("use client")
              </button>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: 'var(--glass-border)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: componentType === 'server' ? '#818cf8' : '#34d399', marginBottom: '0.5rem' }}>
                {componentType === 'server' ? 'Server Component Capabilities:' : 'Client Component Capabilities:'}
              </div>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {componentType === 'server' ? (
                  <>
                    <li>Direct access to backend resources (Databases, File System, Internal Microservices).</li>
                    <li>Zero JavaScript bundle impact on the client (keeps browser bundle ultra-lean).</li>
                    <li>Can directly use <code>async/await</code> in the component body.</li>
                    <li><span style={{ color: '#f87171' }}>Cannot</span> use <code>useState</code>, <code>useEffect</code>, or <code>onClick</code> handlers.</li>
                  </>
                ) : (
                  <>
                    <li>Supports all interactive React hooks (<code>useState</code>, <code>useEffect</code>, <code>useRef</code>).</li>
                    <li>Handles browser DOM events (<code>onClick</code>, <code>onChange</code>, <code>onSubmit</code>).</li>
                    <li>Can access browser-only APIs (<code>window</code>, <code>localStorage</code>, <code>geolocation</code>).</li>
                    <li><span style={{ color: '#fbbf24' }}>Requires</span> sending JS to the browser for hydration.</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Code Implementation</h3>
            <CodeBlock
              title={componentType === 'server' ? 'app/users/page.jsx (Server Component)' : 'app/components/Counter.jsx (Client Component)'}
              code={componentType === 'server' ? appRouterCode : clientComponentCode}
              language="jsx"
            />
          </div>
        </div>
      )}

      {activeTab === 'seo' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* CSR Flow Card */}
          <div className="card" style={{ borderTop: '4px solid #f59e0b' }}>
            <span className="badge badge-warning" style={{ marginBottom: '0.5rem' }}>Traditional CSR Flow</span>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Client-Side Rendering (Plain React)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              1. Browser requests page &rarr; receives empty <code>&lt;div id="root"&gt;&lt;/div&gt;</code>.<br />
              2. Browser downloads large bundle.js.<br />
              3. React executes, fires <code>useEffect</code> to fetch data from API.<br />
              4. Finally renders UI (delayed First Contentful Paint).
            </p>
            <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: '#fbbf24' }}>
              <strong>SEO Risk:</strong> Search crawlers see an empty page if they do not execute JavaScript immediately.
            </div>
          </div>

          {/* SSR Flow Card */}
          <div className="card" style={{ borderTop: '4px solid #10b981' }}>
            <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>Modern Next.js SSR Flow</span>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Server-Side Rendering</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              1. Browser requests page &rarr; Next.js server fetches data and renders complete HTML.<br />
              2. Browser immediately displays fully formed text & images (Instant FCP).<br />
              3. Small interactive JS hydrators attach seamlessly.<br />
              4. Search engines index complete content effortlessly.
            </p>
            <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: '#34d399' }}>
              <strong>SEO Benefit:</strong> 100% crawlable by Googlebot, Bingbot, and social media link preview bots.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'code' && (
        <div className="animate-fade-in">
          <CodeBlock title="NextJsAppRouterDataFetching.jsx" code={appRouterCode} language="jsx" />
        </div>
      )}
    </div>
  );
}
