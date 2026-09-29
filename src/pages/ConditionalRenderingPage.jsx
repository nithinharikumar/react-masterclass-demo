import React, { useState } from 'react';
import ConceptHeader from '../components/ConceptHeader';
import CodeBlock from '../components/CodeBlock';
import WorkflowExplainer from '../components/WorkflowExplainer';
import {
  LogIn,
  LogOut,
  Wifi,
  WifiOff,
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileCode2,
  SlidersHorizontal
} from 'lucide-react';

export default function ConditionalRenderingPage() {
  const [activeTab, setActiveTab] = useState('sandbox');

  // 1. if/else state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('Admin');

  // 2. Ternary operator state
  const [isOnline, setIsOnline] = useState(true);

  // 3. Logical && state (including 0 numeric pitfall demo)
  const [messageCount, setMessageCount] = useState(3);
  const [useCorrectAndSyntax, setUseCorrectAndSyntax] = useState(false);

  // 4. Switch statement status state
  const [orderStatus, setOrderStatus] = useState('loading');

  function renderGreeting(logged, role) {
    if (logged) {
      return (
        <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontWeight: 600 }}>
            <CheckCircle2 size={18} />
            <span>Welcome back, Authorized {role}!</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Full dashboard features and administrative tools are unlocked.
          </p>
        </div>
      );
    }
    return (
      <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: 'var(--radius-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontWeight: 600 }}>
          <LogIn size={18} />
          <span>Please sign in to view restricted student metrics.</span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Rendered via the fallback <code>return &lt;h1&gt;Please sign in.&lt;/h1&gt;</code> block.
        </p>
      </div>
    );
  }

  function renderStatusBadge(status) {
    switch (status) {
      case 'loading':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24' }}>
            <Clock size={16} className="animate-pulse" />
            <span>Processing Order... (State: LOADING)</span>
          </div>
        );
      case 'success':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399' }}>
            <CheckCircle2 size={16} />
            <span>Order Confirmed &amp; Paid! (State: SUCCESS)</span>
          </div>
        );
      case 'shipped':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#818cf8' }}>
            <CheckCircle2 size={16} />
            <span>Order Out for Delivery (State: SHIPPED)</span>
          </div>
        );
      case 'error':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171' }}>
            <AlertTriangle size={16} />
            <span>Payment Gateway Failed (State: ERROR)</span>
          </div>
        );
      default:
        return null;
    }
  }

  const codeSnippets = `// 2.1 Using if/else (Early Return Pattern)
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign in.</h1>;
}

// 2.2 Using Ternary Operator (Inline Binary Condition)
function Status({ isOnline }) {
  return (
    <p>{isOnline ? "Online" : "Offline"}</p>
  );
}

// 2.3 Using Logical AND (&&) - WATCH OUT FOR 0!
// ❌ Dangerous bug: if messages.length === 0, it renders "0" on the screen!
// {messages.length && <p>You have messages</p>}

// ✅ Safe: explicitly compare to boolean or check > 0:
function Notification({ messages }) {
  return (
    <div>
      {messages.length > 0 && <p>You have {messages.length} new messages</p>}
    </div>
  );
}

// 2.4 Using Switch Statements (Finite State Machine)
function StatusMessage({ status }) {
  switch (status) {
    case "loading": return <p>Loading...</p>;
    case "success": return <p>Data loaded!</p>;
    case "error":   return <p>Something went wrong.</p>;
    default:        return null;
  }
}`;

  return (
    <div className="page-wrapper animate-fade-in">
      <ConceptHeader
        moduleNumber={2}
        title="Conditional Rendering"
        subtitle="Explore the 4 primary patterns for displaying different UI elements based on state, props, or data."
        keyPoints={[
          "if/else: Ideal for early returns and whole-component gating.",
          "Ternary Operator (condition ? A : B): Best for compact inline either/or UI.",
          "Logical AND (&&): Perfect for rendering UI only when a condition is true.",
          "Crucial Pitfall: Never use `count && <UI/>` when count can be 0, because 0 is falsy and renders as text '0' in JSX."
        ]}
        badgeColor="badge-primary"
      />

      {/* Under-the-Hood Workflow Explainer */}
      <WorkflowExplainer
        title="Conditional Rendering & React Reconciliation"
        conceptSummary="In React, JSX is compiled to `React.createElement()` JavaScript calls. When state changes, React re-evaluates JS expressions, performs Virtual DOM diffing (reconciliation), unmounts branches that are no longer rendered, and updates the real DOM."
        backendSummary="In client-side apps, conditional rendering runs entirely in browser memory (V8 engine). In SSR/Full-stack apps, conditional branches determine whether sensitive backend data is serialized and sent to the client browser at all."
        steps={[
          {
            title: "State Setter Triggered",
            actor: "React State Hook",
            description: "User clicks 'Sign In' or toggles status. setIsLoggedIn(true) schedules a state transition in React's Fiber queue.",
            code: "setIsLoggedIn(true);"
          },
          {
            title: "Component Re-Execution",
            actor: "V8 JavaScript Engine",
            description: "React re-invokes the component function. JavaScript evaluates if/else branches, ternary conditions, or switch cases.",
            code: "const element = isLoggedIn ? <Dashboard /> : <Login />;"
          },
          {
            title: "Virtual DOM Diffing (Reconciliation)",
            actor: "React Fiber Reconciler",
            description: "React compares the previous Virtual DOM tree with the newly generated tree. It identifies which DOM subtree needs mounting/unmounting.",
            code: "diff(prevVNode, nextVNode) -> Update DOM Tree"
          },
          {
            title: "Real DOM Mutation & Paint",
            actor: "Browser Render Engine",
            description: "Browser repaints the screen with the new DOM elements, running layout calculations and CSS transitions.",
            code: "document.body.appendChild(...) / repaint"
          }
        ]}
        commonMistakes={[
          "Rendering raw 0 on screen when using `items.length && <List />` (because 0 is a valid renderable falsy number in React). Fix: `items.length > 0 && <List />`.",
          "Nesting ternary operators 3+ levels deep (`a ? b ? c : d : e`), which destroys code readability. Use a switch statement or separate sub-component instead.",
          "Forgetting `return null` or default case in switch renderers, causing undefined rendering crashes."
        ]}
      />

      <div className="tab-list">
        <button
          className={`tab-button ${activeTab === 'sandbox' ? 'active' : ''}`}
          onClick={() => setActiveTab('sandbox')}
        >
          <SlidersHorizontal size={16} /> Interactive 4-Pattern Sandbox
        </button>
        <button
          className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          <FileCode2 size={16} /> Code Cheat Sheet
        </button>
      </div>

      {activeTab === 'sandbox' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Pattern 1: if/else */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>2.1 Pattern: if / else Guard</h3>
              <span className="badge badge-primary">Early Return</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Demonstrates returning completely different JSX trees before reaching the default render.
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button
                className={`btn ${isLoggedIn ? 'btn-danger' : 'btn-success'}`}
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                style={{ flex: 1 }}
              >
                {isLoggedIn ? <LogOut size={15} /> : <LogIn size={15} />}
                {isLoggedIn ? 'Simulate Logout' : 'Simulate Login'}
              </button>
              {isLoggedIn && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setUserRole(userRole === 'Admin' ? 'Student' : 'Admin')}
                >
                  Role: {userRole}
                </button>
              )}
            </div>

            <div style={{ borderTop: 'var(--glass-border)', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
                RENDERED OUTPUT:
              </div>
              {renderGreeting(isLoggedIn, userRole)}
            </div>
          </div>

          {/* Pattern 2: Ternary Operator */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>2.2 Pattern: Ternary Operator</h3>
              <span className="badge badge-primary">Inline A / B</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Used directly inside JSX expressions: <code>condition ? &lt;Online /&gt; : &lt;Offline /&gt;</code>
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <button
                className={`btn ${isOnline ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setIsOnline(!isOnline)}
                style={{ width: '100%' }}
              >
                Toggle Connection Status (Current: {isOnline ? 'ONLINE' : 'OFFLINE'})
              </button>
            </div>

            <div style={{ borderTop: 'var(--glass-border)', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
                RENDERED OUTPUT:
              </div>
              <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                background: isOnline ? 'rgba(16, 185, 129, 0.1)' : 'rgba(100, 116, 139, 0.15)',
                border: isOnline ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(100, 116, 139, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {isOnline ? <Wifi size={22} color="#10b981" /> : <WifiOff size={22} color="#94a3b8" />}
                  <div>
                    <div style={{ fontWeight: 600, color: isOnline ? '#34d399' : '#94a3b8' }}>
                      {isOnline ? 'Connected to Cloud Server' : 'Disconnected / Standby Mode'}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Rendered via ternary: <code>{`{isOnline ? "Online" : "Offline"}`}</code>
                    </div>
                  </div>
                </div>
                <span className={`badge ${isOnline ? 'badge-success' : 'badge-secondary'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          {/* Pattern 3: Logical AND (&&) with 0 Gotcha */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>2.3 Pattern: Logical AND (&&)</h3>
              <span className="badge badge-warning">Zero Pitfall Demo</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Render UI only when true. Watch what happens when count is <strong>0</strong> without explicit comparison!
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Message Count:</span>
              <button className="btn btn-secondary" style={{ padding: '0.25rem 0.6rem' }} onClick={() => setMessageCount(0)}>Set 0</button>
              <button className="btn btn-secondary" style={{ padding: '0.25rem 0.6rem' }} onClick={() => setMessageCount(prev => Math.max(0, prev - 1))}>-1</button>
              <span style={{ fontWeight: 700, padding: '0 0.5rem' }}>{messageCount}</span>
              <button className="btn btn-secondary" style={{ padding: '0.25rem 0.6rem' }} onClick={() => setMessageCount(prev => prev + 1)}>+1</button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={useCorrectAndSyntax}
                  onChange={(e) => setUseCorrectAndSyntax(e.target.checked)}
                />
                <span>Use Safe Syntax (<code>messages.length &gt; 0 &amp;&amp; ...</code>)</span>
              </label>
            </div>

            <div style={{ borderTop: 'var(--glass-border)', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
                RENDERED OUTPUT IN JSX:
              </div>
              <div style={{ padding: '0.85rem 1rem', background: 'var(--bg-code)', borderRadius: 'var(--radius-sm)', border: 'var(--glass-border)', minHeight: '52px', display: 'flex', alignItems: 'center' }}>
                {useCorrectAndSyntax ? (
                  messageCount > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#818cf8' }}>
                      <Bell size={18} />
                      <span>You have <strong>{messageCount}</strong> new unread message{messageCount > 1 ? 's' : ''}!</span>
                    </div>
                  )
                ) : (
                  messageCount && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#818cf8' }}>
                      <Bell size={18} />
                      <span>You have <strong>{messageCount}</strong> new unread message{messageCount > 1 ? 's' : ''}!</span>
                    </div>
                  )
                )}
                {useCorrectAndSyntax && messageCount === 0 && (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No messages (Nothing rendered safely)</span>
                )}
              </div>
              {!useCorrectAndSyntax && messageCount === 0 && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <AlertTriangle size={13} /> Notice the raw number "0" printed on screen above because 0 is falsy!
                </div>
              )}
            </div>
          </div>

          {/* Pattern 4: Switch Statements */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>2.4 Pattern: Switch Statements</h3>
              <span className="badge badge-purple">Multi-State Machine</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Best suited for discrete states (e.g. idle, loading, success, shipped, error).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem', marginBottom: '1rem' }}>
              {['loading', 'success', 'shipped', 'error'].map((st) => (
                <button
                  key={st}
                  className={`btn ${orderStatus === st ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.78rem', textTransform: 'capitalize' }}
                  onClick={() => setOrderStatus(st)}
                >
                  Set: {st}
                </button>
              ))}
            </div>

            <div style={{ borderTop: 'var(--glass-border)', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
                RENDERED COMPONENT:
              </div>
              <div style={{ padding: '0.85rem 1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', border: 'var(--glass-border)' }}>
                {renderStatusBadge(orderStatus)}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'code' && (
        <div className="animate-fade-in">
          <CodeBlock title="ConditionalRenderingExamples.jsx" code={codeSnippets} language="jsx" />
        </div>
      )}
    </div>
  );
}
