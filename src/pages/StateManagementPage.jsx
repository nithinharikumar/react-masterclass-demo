import React, { useState } from 'react';
import ConceptHeader from '../components/ConceptHeader';
import CodeBlock from '../components/CodeBlock';
import WorkflowExplainer from '../components/WorkflowExplainer';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, reset } from '../store/counterSlice';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
  Plus,
  Minus,
  RotateCcw,
  ShoppingBag,
  Trash2,
  Sparkles,
  Layers,
  Zap,
  HelpCircle,
  FileCode2,
  SlidersHorizontal,
  Sun,
  Moon,
  UserCheck
} from 'lucide-react';

export default function StateManagementPage() {
  const [activeTab, setActiveTab] = useState('demo');
  const [customIncrement, setCustomIncrement] = useState(5);

  const count = useSelector((state) => state.counter.value);
  const counterHistory = useSelector((state) => state.counter.history);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, login, logout } = useAuth();

  const totalPrice = cartItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  const availableBooks = [
    { id: 3, name: 'Next.js App Router Bible', price: 34.99 },
    { id: 4, name: 'GraphQL Query Patterns', price: 24.50 },
    { id: 5, name: 'TypeScript with React', price: 29.00 }
  ];

  const contextCodeSnippet = `// 4.1 Context API Implementation
import { createContext, useContext, useState } from "react";

// 1. Create Context
const ThemeContext = createContext();

// 2. Create Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consume in ANY child component without prop drilling
export function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme}>
      Current Theme: {theme}
    </button>
  );
}`;

  const reduxCodeSnippet = `// 4.2 Redux Toolkit (RTK) Implementation
// 1. Create Slice (counterSlice.js)
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    // Immer allows us to write 'mutating' logic safely:
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;

// 2. Configure Store (store.js)
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: { counter: counterReducer }
});

// 3. Connect in Components (Counter.jsx)
import { useSelector, useDispatch } from "react-redux";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}`;

  return (
    <div className="page-wrapper animate-fade-in">
      <ConceptHeader
        moduleNumber={4}
        title="State Management — Context API & Redux Toolkit"
        subtitle="Compare low-frequency state sharing via Context API with scalable, action-driven global state via Redux Toolkit (RTK)."
        keyPoints={[
          "Context API solves Prop Drilling for low-frequency changes (Themes, Auth, Locale).",
          "Redux Toolkit provides centralized predictability for complex, high-frequency, multi-component state.",
          "RTK uses Immer internally: write intuitive mutating code (state.value += 1) while Immer produces safe immutable updates behind the scenes.",
          "useSelector subscribes to store slices; useDispatch dispatches action objects."
        ]}
        badgeColor="badge-primary"
      />

      {/* Under-the-Hood Workflow Explainer */}
      <WorkflowExplainer
        title="Context API vs Redux Toolkit State Machine"
        conceptSummary="In Context API, updating a provider re-renders ALL components that consume the context. In Redux Toolkit, the Store maintains a single centralized immutable state tree. Components subscribe to specific slices via `useSelector` and only re-render if that exact slice reference changes."
        backendSummary="In client applications, Redux actions are pure memory objects `{ type: 'counter/increment', payload: 5 }`. In enterprise full-stack apps, Redux actions can be mirrored to logging backends or dispatched asynchronously via RTK Query / Thunks to synchronize remote REST or GraphQL databases."
        steps={[
          {
            title: "Component Dispatches Action",
            actor: "UI Component via useDispatch()",
            description: "User clicks '+' button. useDispatch() dispatches the typed action object { type: 'counter/increment' } into the Redux Store pipeline.",
            code: "dispatch(incrementByAmount(5));"
          },
          {
            title: "Reducer & Immer Draft Proxy",
            actor: "Redux Slice Reducer (Immer.js)",
            description: "RTK passes the current state into an Immer Draft Proxy. You can write state.value += 1; Immer tracks all changes and returns a brand-new immutable copy.",
            code: "reducers: { increment: (state) => { state.value += 1; } }"
          },
          {
            title: "Store State Tree Update",
            actor: "Centralized Redux Store",
            description: "The global state tree is atomically replaced with the new immutable state object.",
            code: "store.getState() -> { counter: { value: 11 }, cart: { ... } }"
          },
          {
            title: "Selective Subscription Notification",
            actor: "useSelector Hook",
            description: "useSelector compares previous selected value with new value. Only components watching `state.counter` re-render; un-related components stay untouched!",
            code: "const count = useSelector(state => state.counter.value);"
          }
        ]}
        commonMistakes={[
          "Using Context API for high-frequency updates (e.g. text inputs or stock tickers), leading to excessive unwanted re-renders across the app.",
          "Attempting to directly mutate plain React state (`user.name = 'Bob'`) outside of Redux Toolkit slices.",
          "Forgetting to wrap the application in `<Provider store={store}>` at the root index level."
        ]}
      />

      <div className="tab-list">
        <button
          className={`tab-button ${activeTab === 'demo' ? 'active' : ''}`}
          onClick={() => setActiveTab('demo')}
        >
          <SlidersHorizontal size={16} /> Live Dual-Engine Sandbox
        </button>
        <button
          className={`tab-button ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          <HelpCircle size={16} /> Context vs Redux Decision Matrix
        </button>
        <button
          className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          <FileCode2 size={16} /> Code Comparison
        </button>
      </div>

      {activeTab === 'demo' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Section A: Context API */}
          <div className="card" style={{ borderLeft: '4px solid #6366f1' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>Engine 1: Context API</span>
                <h3 style={{ fontSize: '1.2rem' }}>Global Application Context (Theme &amp; Authentication)</h3>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Low-frequency state</span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              These values are passed across the entire component tree without needing to pass props through intermediate components.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: 'var(--glass-border)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  THEME CONTEXT (useContext):
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {theme === 'dark' ? <Moon size={20} color="#818cf8" /> : <Sun size={20} color="#fbbf24" />}
                    <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>Current Theme: {theme}</span>
                  </div>
                  <button onClick={toggleTheme} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
                    Toggle Theme
                  </button>
                </div>
              </div>

              <div style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: 'var(--glass-border)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  AUTH CONTEXT (useContext):
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    {isLoggedIn ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <UserCheck size={18} color="#10b981" />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.role} ({user.email})</div>
                        </div>
                      </div>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No user authenticated</span>
                    )}
                  </div>
                  <button
                    onClick={isLoggedIn ? logout : () => login('Alex Rivera', 'Student')}
                    className={`btn ${isLoggedIn ? 'btn-danger' : 'btn-success'}`}
                    style={{ fontSize: '0.8rem' }}
                  >
                    {isLoggedIn ? 'Logout' : 'Sign In'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Redux Toolkit */}
          <div className="card" style={{ borderLeft: '4px solid #a855f7' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-purple" style={{ marginBottom: '0.35rem' }}>Engine 2: Redux Toolkit (RTK)</span>
                <h3 style={{ fontSize: '1.2rem' }}>Action-Driven Global Store (Counter &amp; Cart Slices)</h3>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>High-frequency &amp; Complex State</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* RTK Widget 1: Interactive Counter */}
              <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: 'var(--glass-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '1rem' }}>1. Counter Slice (useSelector + useDispatch)</h4>
                  <span className="badge badge-purple">RTK Slices</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', margin: '1.5rem 0' }}>
                  <button
                    className="btn btn-secondary"
                    style={{ width: '42px', height: '42px', borderRadius: '50%', padding: 0 }}
                    onClick={() => dispatch(decrement())}
                    title="dispatch(decrement())"
                  >
                    <Minus size={18} />
                  </button>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#a855f7', minWidth: '80px', textAlign: 'center' }}>
                    {count}
                  </div>
                  <button
                    className="btn btn-secondary"
                    style={{ width: '42px', height: '42px', borderRadius: '50%', padding: 0 }}
                    onClick={() => dispatch(increment())}
                    title="dispatch(increment())"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1, fontSize: '0.8rem' }}
                    onClick={() => dispatch(incrementByAmount(customIncrement))}
                  >
                    dispatch(incrementByAmount({customIncrement}))
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem 0.75rem' }}
                    onClick={() => dispatch(reset())}
                    title="Reset to 0"
                  >
                    <RotateCcw size={15} />
                  </button>
                </div>

                <div style={{ background: 'var(--bg-code)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', border: 'var(--glass-border)' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Recent Redux Dispatches:</div>
                  {counterHistory.length === 0 && <span style={{ color: 'var(--text-muted)' }}>Initial count: 10</span>}
                  {counterHistory.map((h, i) => (
                    <div key={i} style={{ color: '#c084fc' }}>• {h}</div>
                  ))}
                </div>
              </div>

              {/* RTK Widget 2: Shopping Cart Slice */}
              <div style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)', border: 'var(--glass-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '1rem' }}>2. Shopping Cart Slice</h4>
                  <span className="badge badge-success">Total: ${totalPrice.toFixed(2)}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '140px', overflowY: 'auto', marginBottom: '1rem' }}>
                  {cartItems.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1rem', fontSize: '0.85rem' }}>
                      Cart is empty. Add a course book below!
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-input)', borderRadius: '4px', fontSize: '0.82rem' }}>
                        <div>
                          <strong>{item.name}</strong> (${item.price})
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <button
                            className="btn btn-secondary"
                            style={{ padding: '0.15rem 0.4rem', fontSize: '0.7rem' }}
                            onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))}
                          >
                            -
                          </button>
                          <span style={{ fontWeight: 700 }}>{item.quantity}</span>
                          <button
                            className="btn btn-secondary"
                            style={{ padding: '0.15rem 0.4rem', fontSize: '0.7rem' }}
                            onClick={() => dispatch(updateQuantity({ id: item.id, delta: 1 }))}
                          >
                            +
                          </button>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', marginLeft: '4px' }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div style={{ borderTop: 'var(--glass-border)', paddingTop: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Quick Add to Redux Cart:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {availableBooks.map((book) => (
                      <button
                        key={book.id}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
                        onClick={() => dispatch(addToCart(book))}
                      >
                        + {book.name} (${book.price})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="callout callout-tip" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
              <strong>Immer Magic under the Hood:</strong> Notice in <code>cartSlice.js</code> we write <code>existing.quantity += 1</code>. In standard Redux, direct mutation is forbidden, but Redux Toolkit wraps all reducers in Immer to produce clean immutable updates automatically.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="card animate-fade-in">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Context API vs Redux Toolkit: When to Use Which?</h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Criterion</th>
                <th>Context API (React Built-in)</th>
                <th>Redux Toolkit (RTK)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Primary Purpose</strong></td>
                <td>Eliminate Prop Drilling across deep component trees.</td>
                <td>Centralized, predictable state machine for complex applications.</td>
              </tr>
              <tr>
                <td><strong>Setup Overhead</strong></td>
                <td><span className="badge badge-success">Zero dependencies (Built-in)</span></td>
                <td>Requires <code>@reduxjs/toolkit</code> and <code>react-redux</code>.</td>
              </tr>
              <tr>
                <td><strong>Update Frequency</strong></td>
                <td>Low-frequency changes (e.g. Theme, Auth user, Language).</td>
                <td><span className="badge badge-success">High-frequency changes</span> (e.g. cart, live feeds, dashboard counters).</td>
              </tr>
              <tr>
                <td><strong>Re-render Optimization</strong></td>
                <td>All consumer components re-render on any context change.</td>
                <td><span className="badge badge-success">Granular re-renders</span> (useSelector triggers render ONLY when selected slice changes).</td>
              </tr>
              <tr>
                <td><strong>DevTools &amp; Time Travel</strong></td>
                <td>Basic React DevTools inspection.</td>
                <td><span className="badge badge-success">Redux DevTools</span> with action replay, diffing, and time travel.</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'code' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-primary">1. Context API (ThemeContext.jsx)</span>
            </div>
            <CodeBlock title="ThemeContext.jsx (Global State)" code={contextCodeSnippet} language="jsx" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-purple">2. Redux Toolkit (counterSlice.js + Component)</span>
            </div>
            <CodeBlock title="counterSlice.js + CounterComponent.jsx" code={reduxCodeSnippet} language="jsx" />
          </div>
        </div>
      )}
    </div>
  );
}
