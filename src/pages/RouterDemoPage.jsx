import React, { useState } from 'react';
import ConceptHeader from '../components/ConceptHeader';
import CodeBlock from '../components/CodeBlock';
import WorkflowExplainer from '../components/WorkflowExplainer';
import {
  Compass,
  ArrowRight,
  User,
  Settings,
  BarChart3,
  Globe,
  LogIn,
  Layers,
  FileCode2,
  SlidersHorizontal
} from 'lucide-react';

export default function RouterDemoPage() {
  const [activeTab, setActiveTab] = useState('interactive');

  const [currentPath, setCurrentPath] = useState('/users/42');
  const [selectedUserId, setSelectedUserId] = useState('42');
  const [nestedTab, setNestedTab] = useState('overview');
  const [navHistory, setNavHistory] = useState(['/users/42']);
  const [isSimulatingLogin, setIsSimulatingLogin] = useState(false);

  const usersDatabase = {
    '42': { name: 'Sophia Chen', email: 'sophia@stanford.edu', major: 'Computer Science', grade: 'Senior', gpa: '3.92', courses: ['React 18 Architecture', 'Advanced Algorithms', 'Distributed Systems'] },
    '88': { name: 'Marcus Vance', email: 'marcus@mit.edu', major: 'Software Engineering', grade: 'Junior', gpa: '3.85', courses: ['Redux State Patterns', 'GraphQL vs REST', 'Database Systems'] },
    '105': { name: 'Elena Rostova', email: 'elena@oxford.ac.uk', major: 'Data Science', grade: 'Graduate', gpa: '4.00', courses: ['Next.js App Router', 'Deep Learning', 'Cloud Architecture'] }
  };

  const handleNavigate = (newPath) => {
    setCurrentPath(newPath);
    setNavHistory(prev => [newPath, ...prev.slice(0, 5)]);
  };

  const handleProgrammaticLogin = () => {
    setIsSimulatingLogin(true);
    setTimeout(() => {
      setIsSimulatingLogin(false);
      handleNavigate('/dashboard/overview');
    }, 1000);
  };

  const codeSnippets = `// 3.1 Basic React Router Setup
import { BrowserRouter, Routes, Route, Link, Outlet, useParams, useNavigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users/42">User Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        {/* 3.2 Dynamic Route Parameter */}
        <Route path="/users/:id" element={<UserProfile />} />
        
        {/* 3.4 Nested Routes with <Outlet /> */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="overview" element={<DashboardOverview />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>
        
        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// 3.2 Reading Route Parameters with useParams()
function UserProfile() {
  const { id } = useParams();
  return <h2>Viewing profile of user #{id}</h2>;
}

// 3.3 Programmatic Navigation with useNavigate()
function LoginButton() {
  const navigate = useNavigate();
  const handleLogin = () => {
    // Perform authentication...
    navigate("/dashboard/overview");
  };
  return <button onClick={handleLogin}>Login</button>;
}

// 3.4 Nested Layout using <Outlet />
function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <aside>
        <Link to="overview">Overview</Link>
        <Link to="settings">Settings</Link>
      </aside>
      <main>
        {/* Key Point: <Outlet /> renders child route matching current sub-path */}
        <Outlet />
      </main>
    </div>
  );
}`;

  return (
    <div className="page-wrapper animate-fade-in">
      <ConceptHeader
        moduleNumber={3}
        title="React Router — Navigation & Routing"
        subtitle="Understand client-side routing, URL parameters (useParams), programmatic navigation (useNavigate), and nested layout rendering with <Outlet />."
        keyPoints={[
          "BrowserRouter synchronizes UI with the browser's URL without causing full page reloads.",
          "Dynamic segments (:id) are extracted effortlessly via the useParams() hook.",
          "useNavigate() gives imperative navigation control for form submissions and login flows.",
          "<Outlet /> acts as a placeholder inside parent layouts for child route components."
        ]}
        badgeColor="badge-primary"
      />

      {/* Under-the-Hood Workflow Explainer */}
      <WorkflowExplainer
        title="Client-Side Routing Lifecycle"
        conceptSummary="Traditional multi-page apps make a full HTTP roundtrip on every link click. React Router intercepts anchor clicks via `event.preventDefault()`, synchronizes the URL using the browser's `window.history.pushState()`, matches routes via internal regex trees, and swaps React components in milliseconds without white-screen flashes."
        backendSummary="In client-side single page applications (SPAs), the backend server must be configured with a fallback rewrite rule (`try_files $uri /index.html;`) so that refreshing `/users/42` directly on the browser serves the root `index.html` bundle rather than returning an Apache/Nginx 404 error."
        steps={[
          {
            title: "User Clicks <Link to='/users/42'>",
            actor: "React Router Event Interceptor",
            description: "React Router prevents default browser navigation (which would reload the entire page and dump JavaScript memory).",
            code: "event.preventDefault();"
          },
          {
            title: "HTML5 History API Push",
            actor: "Browser Window History",
            description: "The browser's address bar updates immediately without requesting a new HTML page from the backend server.",
            code: "window.history.pushState({}, '', '/users/42');"
          },
          {
            title: "Route Pattern Matching & Params Parsing",
            actor: "Router Context & Matcher",
            description: "The router compares current pathname against route trees. It extracts dynamic token `:id` into an object `{ id: '42' }`.",
            code: "const { id } = useParams(); // returns { id: '42' }"
          },
          {
            title: "Nested <Outlet /> Component Injection",
            actor: "React DOM / Fiber",
            description: "Parent layout stays mounted in DOM; only the nested `<Outlet />` sub-tree is replaced with `<UserProfile id='42' />`.",
            code: "<DashboardLayout><Outlet -> <UserProfile /></DashboardLayout>"
          }
        ]}
        commonMistakes={[
          "Using regular `<a href='/about'>` instead of `<Link to='/about'>`, causing full browser reloads and destroying React state.",
          "Forgetting `<Outlet />` inside parent nested layout components, which causes child routes not to render anything on screen.",
          "Deploying SPAs to production servers without configuring SPA fallback routing (e.g. Nginx or Cloudflare rewrites)."
        ]}
      />

      <div className="tab-list">
        <button
          className={`tab-button ${activeTab === 'interactive' ? 'active' : ''}`}
          onClick={() => setActiveTab('interactive')}
        >
          <SlidersHorizontal size={16} /> Live Router Simulator
        </button>
        <button
          className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          <FileCode2 size={16} /> React Router Code Patterns
        </button>
      </div>

      {activeTab === 'interactive' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Simulated Browser Bar */}
          <div className="card" style={{ padding: '0.75rem 1.25rem', background: 'var(--bg-secondary)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-input)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.88rem', fontFamily: 'var(--font-mono)' }}>
                <Globe size={14} color="#818cf8" />
                <span style={{ color: 'var(--text-muted)' }}>https://academy.dev</span>
                <span style={{ color: '#818cf8', fontWeight: 600 }}>{currentPath}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Navigation Trigger Sandbox */}
            <div className="card">
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Interactive Route Controller</h3>

              {/* Dynamic Params Test */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  3.2 Dynamic Route Params (<code>/users/:id</code> with <code>useParams()</code>):
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['42', '88', '105'].map((id) => (
                    <button
                      key={id}
                      className={`btn ${currentPath === `/users/${id}` ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, fontSize: '0.8rem' }}
                      onClick={() => {
                        setSelectedUserId(id);
                        handleNavigate(`/users/${id}`);
                      }}
                    >
                      <User size={14} /> User #{id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Programmatic Navigation Test */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  3.3 Programmatic Navigation (<code>useNavigate()</code>):
                </div>
                <button
                  className="btn btn-success"
                  style={{ width: '100%' }}
                  onClick={handleProgrammaticLogin}
                  disabled={isSimulatingLogin}
                >
                  <LogIn size={15} />
                  {isSimulatingLogin ? 'Authenticating & Navigating...' : 'Simulate Login -> Navigate to /dashboard'}
                </button>
              </div>

              {/* Nested Routes Navigation */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  3.4 Nested Routes with <code>&lt;Outlet /&gt;</code>:
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className={`btn ${currentPath === '/dashboard/overview' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, fontSize: '0.8rem' }}
                    onClick={() => { setNestedTab('overview'); handleNavigate('/dashboard/overview'); }}
                  >
                    Overview
                  </button>
                  <button
                    className={`btn ${currentPath === '/dashboard/analytics' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, fontSize: '0.8rem' }}
                    onClick={() => { setNestedTab('analytics'); handleNavigate('/dashboard/analytics'); }}
                  >
                    Analytics
                  </button>
                  <button
                    className={`btn ${currentPath === '/dashboard/settings' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, fontSize: '0.8rem' }}
                    onClick={() => { setNestedTab('settings'); handleNavigate('/dashboard/settings'); }}
                  >
                    Settings
                  </button>
                </div>
              </div>

              {/* 404 Wildcard Test */}
              <div>
                <button
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.8rem' }}
                  onClick={() => handleNavigate('/non-existent-page-404')}
                >
                  Test 404 Catch-All Route (<code>path="*"</code>)
                </button>
              </div>
            </div>

            {/* Virtual Rendered Component Window */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: 'var(--glass-border)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Layers size={17} color="#818cf8" />
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Active Component View</span>
                </div>
                <span className="badge badge-purple">
                  Path: {currentPath}
                </span>
              </div>

              <div style={{ flex: 1, minHeight: '260px' }}>
                {/* View 1: Dynamic User Profile */}
                {currentPath.startsWith('/users/') && (
                  <div className="animate-fade-in">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span className="badge badge-primary">useParams() hook</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Extracted param: <code>id = "{selectedUserId}"</code>
                      </span>
                    </div>

                    {usersDatabase[selectedUserId] ? (
                      <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: 'var(--glass-border)' }}>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{usersDatabase[selectedUserId].name}</h4>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                          {usersDatabase[selectedUserId].email} • {usersDatabase[selectedUserId].major} ({usersDatabase[selectedUserId].grade})
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                          <span className="badge badge-success">GPA: {usersDatabase[selectedUserId].gpa}</span>
                          <span className="badge badge-primary">Enrolled in 3 courses</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          <strong>Enrolled Courses:</strong> {usersDatabase[selectedUserId].courses.join(', ')}
                        </div>
                      </div>
                    ) : (
                      <p>User profile not found.</p>
                    )}
                  </div>
                )}

                {/* View 2: Dashboard Layout with Nested Outlet */}
                {currentPath.startsWith('/dashboard') && (
                  <div className="animate-fade-in" style={{ border: '1px dashed rgba(99, 102, 241, 0.4)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#818cf8', marginBottom: '0.5rem' }}>
                      &lt;DashboardLayout /&gt; Parent Container
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      Parent header & navigation stay mounted. Below is the dynamic <code>&lt;Outlet /&gt;</code> rendering:
                    </p>

                    <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: 'var(--glass-border)' }}>
                      {currentPath === '/dashboard/overview' && (
                        <div>
                          <h4 style={{ fontSize: '1rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <BarChart3 size={16} /> Dashboard Overview Sub-Route
                          </h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                            Student analytics, average quiz scores (94.2%), and active attendance records.
                          </p>
                        </div>
                      )}
                      {currentPath === '/dashboard/analytics' && (
                        <div>
                          <h4 style={{ fontSize: '1rem', color: '#818cf8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <BarChart3 size={16} /> Real-time Course Analytics Sub-Route
                          </h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                            Telemetry graphs, component render cycles, and API latency histograms.
                          </p>
                        </div>
                      )}
                      {currentPath === '/dashboard/settings' && (
                        <div>
                          <h4 style={{ fontSize: '1rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Settings size={16} /> Account & Notification Settings Sub-Route
                          </h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                            Configure classroom permissions, webhook endpoints, and API keys.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* View 3: 404 Catch All */}
                {currentPath === '/non-existent-page-404' && (
                  <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem', color: '#ef4444', marginBottom: '0.5rem' }}>404 - Page Not Found</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      Caught cleanly by <code>&lt;Route path="*" element=&lcub;&lt;NotFound /&gt;&rcub; /&gt;</code>
                    </p>
                    <button className="btn btn-secondary" onClick={() => handleNavigate('/users/42')}>
                      Return to User Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'code' && (
        <div className="animate-fade-in">
          <CodeBlock title="ReactRouterArchitecture.jsx" code={codeSnippets} language="jsx" />
        </div>
      )}
    </div>
  );
}
