import React, { useState, useEffect, useRef } from 'react';
import ConceptHeader from '../components/ConceptHeader';
import CodeBlock from '../components/CodeBlock';
import WorkflowExplainer from '../components/WorkflowExplainer';
import axios from 'axios';
import {
  Play,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  HelpCircle,
  FileCode2,
  SlidersHorizontal,
  Code2,
  Sparkles
} from 'lucide-react';

export default function DataFetchingPage() {
  const [activeTab, setActiveTab] = useState('workflow');
  
  // Data Fetching State (Best Practice: loading, error, data)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchMethod, setFetchMethod] = useState('axios'); // Default to Axios so they see it immediately
  const [simulationMode, setSimulationMode] = useState('success');
  const [requestLog, setRequestLog] = useState([]);
  const abortControllerRef = useRef(null);

  const addLog = (msg, type = 'info') => {
    setRequestLog((prev) => [
      { id: Date.now() + Math.random(), time: new Date().toLocaleTimeString(), msg, type },
      ...prev.slice(0, 7)
    ]);
  };

  const mockUsersList = [
    { id: 1, name: 'Leanne Graham', email: 'sincere@april.biz', role: 'Frontend Lead', company: 'Romaguera-Crona' },
    { id: 2, name: 'Ervin Howell', email: 'shanna@melissa.tv', role: 'Fullstack Dev', company: 'Deckow-Crist' },
    { id: 3, name: 'Clementine Bauch', email: 'nathan@yesenia.net', role: 'UI/UX Designer', company: 'Romaguera-Jacobson' },
    { id: 4, name: 'Patricia Lebsack', email: 'julianne.ochon@kory.org', role: 'DevOps Engineer', company: 'Robel-Corkery' }
  ];

  const handleFetchData = async (overrideMode = simulationMode) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    setUsers([]);
    addLog(`Initiating request using [${fetchMethod.toUpperCase()}] with mode: ${overrideMode}`, 'info');

    try {
      const delayMs = overrideMode === 'slow' ? 4000 : 800;
      await new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, delayMs);
        controller.signal.addEventListener('abort', () => {
          clearTimeout(timer);
          reject(new DOMException('Request aborted by user (AbortController triggered)', 'AbortError'));
        });
      });

      if (overrideMode === '404') {
        if (fetchMethod === 'fetch') {
          const res = { ok: false, status: 404, statusText: 'Not Found' };
          if (!res.ok) {
            throw new Error(`HTTP 404: Resource endpoint was not found on server.`);
          }
        } else {
          throw new Error(`AxiosError: Request failed with status code 404 (Not Found)`);
        }
      } else if (overrideMode === '500') {
        throw new Error(`HTTP 500: Internal Server Error occurred on remote API.`);
      }

      setUsers(mockUsersList);
      addLog(`[${fetchMethod.toUpperCase()}] Successfully parsed and loaded ${mockUsersList.length} users!`, 'success');
    } catch (err) {
      if (err.name === 'AbortError') {
        addLog(`Request canceled safely without unmounted state warning!`, 'warning');
        setError('Request canceled by AbortController.');
      } else {
        addLog(`Error caught: ${err.message}`, 'error');
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAbort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  useEffect(() => {
    handleFetchData('success');
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchMethod]);

  const axiosCodeSnippet = `// 1.2 Data Fetching with Axios (from Section 1.2 & 1.3 of Study Notes)
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserListAxios() {
  // 1. Maintain 3 separate states for robust error handling
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 2. Instantiate AbortController to cancel pending requests on unmount
    const controller = new AbortController();

    const fetchUsersWithAxios = async () => {
      try {
        setLoading(true);
        setError(null);

        // 3. Axios automatically transforms JSON (no need for await res.json()!)
        // 4. Axios automatically throws errors on HTTP 4xx and 5xx status codes!
        const response = await axios.get("https://api.example.com/users", {
          signal: controller.signal // Link AbortController
        });

        // 5. Direct access to parsed data payload via response.data:
        setUsers(response.data);
      } catch (err) {
        // Ignore abort cancellations, display actual error messages
        if (!axios.isCancel(err)) {
          setError(err.response?.data?.message || err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsersWithAxios();

    // 6. Cleanup function: Aborts request if user navigates away before completion
    return () => controller.abort();
  }, []);

  // Conditional rendering based on 3 states:
  if (loading) return <p>Loading users via Axios...</p>;
  if (error) return <p>Axios Error: {error}</p>;

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.name} ({u.email})</li>
      ))}
    </ul>
  );
}`;

  const fetchCodeSnippet = `// 1.1 & 1.3 Data Fetching with Native Fetch API (from Study Notes)
import React, { useState, useEffect } from "react";

export default function UserListFetch() {
  // 1. Maintain 3 separate states
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsersWithFetch = async () => {
      try {
        setLoading(true);
        setError(null);

        // 2. Native fetch call
        const res = await fetch("https://api.example.com/users", {
          signal: controller.signal
        });

        // 3. CRITICAL: Fetch does NOT reject on 404/500! Must check res.ok manually:
        if (!res.ok) {
          throw new Error(\`Network response was not ok (Status \${res.status})\`);
        }

        // 4. Manual JSON stream deserialization:
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsersWithFetch();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading users via Fetch API...</p>;
  if (error) return <p>Fetch Error: {error}</p>;

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.name} ({u.email})</li>
      ))}
    </ul>
  );
}`;

  return (
    <div className="page-wrapper animate-fade-in">
      <ConceptHeader
        moduleNumber={1}
        title="Data Fetching in React"
        subtitle="Master the differences between Fetch API and Axios, async/await paradigms, complete 3-state error handling, and request cancellations."
        keyPoints={[
          "Fetch API is native to browsers; Axios is an npm package with automatic JSON parsing.",
          "Fetch only rejects on network failures — you MUST manually check response.ok for 404/500.",
          "Always maintain 3 independent states: loading, error, and data.",
          "Use AbortController to cancel pending requests when components unmount."
        ]}
        badgeColor="badge-primary"
      />

      {/* Under-the-Hood Workflow Explainer */}
      <WorkflowExplainer
        title="Data Fetching Lifecycle"
        conceptSummary="When a component mounts or user initiates an action, React sets `loading: true`, creates an AbortSignal, and yields control to the asynchronous JavaScript Event Loop microtask queue. When the Promise resolves, React reconciles state and re-renders the UI."
        backendSummary="The browser sends an HTTP GET request over TCP/TLS with HTTP headers (Accept: application/json). The backend server processes the query against its database, serializes records to JSON, sets HTTP status code (200, 404, or 500) and streams raw bytes back to the browser socket."
        steps={[
          {
            title: "Component Mounts & Dispatches",
            actor: "React useEffect",
            description: "useEffect() fires after the initial paint. setLoading(true) is invoked to inform UI. An AbortController is instantiated.",
            code: "setLoading(true); const controller = new AbortController();"
          },
          {
            title: "HTTP Network Handshake",
            actor: "Browser Engine / OS Network Socket",
            description: "The browser resolves DNS, opens a TCP socket, negotiates TLS, and transmits the HTTP GET /users packet over the network.",
            code: "fetch('https://api.example.com/users', { signal: controller.signal })"
          },
          {
            title: "Backend Processing & Response",
            actor: "Backend Server (Node/Express/Cloud)",
            description: "Backend database query executes. Server formats JSON payload, sets Response headers (status: 200/404), and streams bytes back.",
            code: "HTTP/1.1 200 OK Content-Type: application/json [{ id: 1, name: 'Alex' }]"
          },
          {
            title: "Stream Parsing & State Commit",
            actor: "React Fiber Reconciler",
            description: "await res.json() consumes the readable stream. setUsers(data) and setLoading(false) trigger React Fiber to re-render the UI tree.",
            code: "setUsers(data); setLoading(false);"
          }
        ]}
        commonMistakes={[
          "Assuming fetch() throws on 404/500 errors (it does NOT — you must check if (!res.ok) throw new Error()).",
          "Forgetting cleanup functions in useEffect, causing 'Can't perform a React state update on an unmounted component' memory leak warnings.",
          "Mutating state arrays directly (e.g., users.push(data)) instead of using setter setUsers([...users, data])."
        ]}
      />

      {/* Tabs */}
      <div className="tab-list">
        <button
          className={`tab-button ${activeTab === 'workflow' ? 'active' : ''}`}
          onClick={() => setActiveTab('workflow')}
        >
          <SlidersHorizontal size={16} /> Live Interactive Sandbox
        </button>
        <button
          className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          <FileCode2 size={16} /> Side-by-Side Code Comparison (Axios vs Fetch)
        </button>
        <button
          className={`tab-button ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          <HelpCircle size={16} /> Fetch vs Axios Feature Matrix
        </button>
      </div>

      {activeTab === 'workflow' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Controls & Simulator */}
            <div className="card">
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SlidersHorizontal size={18} color="#6366f1" /> Classroom Simulation Controls
              </h3>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  1. Select HTTP Library to Test &amp; View Code:
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className={`btn ${fetchMethod === 'axios' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1 }}
                    onClick={() => { setFetchMethod('axios'); handleFetchData(); }}
                  >
                    ⚡ Axios (npm package)
                  </button>
                  <button
                    className={`btn ${fetchMethod === 'fetch' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1 }}
                    onClick={() => { setFetchMethod('fetch'); handleFetchData(); }}
                  >
                    🌐 Native Fetch API
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  2. Test Response Scenario:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    className={`btn ${simulationMode === 'success' ? 'btn-success' : 'btn-secondary'}`}
                    style={{ fontSize: '0.8rem' }}
                    onClick={() => { setSimulationMode('success'); handleFetchData('success'); }}
                  >
                    <CheckCircle size={14} /> 200 OK (Success)
                  </button>
                  <button
                    className={`btn ${simulationMode === '404' ? 'btn-danger' : 'btn-secondary'}`}
                    style={{ fontSize: '0.8rem' }}
                    onClick={() => { setSimulationMode('404'); handleFetchData('404'); }}
                  >
                    <AlertCircle size={14} /> 404 Not Found
                  </button>
                  <button
                    className={`btn ${simulationMode === '500' ? 'btn-danger' : 'btn-secondary'}`}
                    style={{ fontSize: '0.8rem' }}
                    onClick={() => { setSimulationMode('500'); handleFetchData('500'); }}
                  >
                    <XCircle size={14} /> 500 Server Error
                  </button>
                  <button
                    className={`btn ${simulationMode === 'slow' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.8rem' }}
                    onClick={() => { setSimulationMode('slow'); handleFetchData('slow'); }}
                  >
                    <Clock size={14} /> Slow (4s Delay)
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={() => handleFetchData()}
                  disabled={loading}
                >
                  <Play size={15} /> {loading ? 'Fetching...' : `Trigger ${fetchMethod.toUpperCase()} Request`}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleAbort}
                  disabled={!loading}
                  title="Cancel pending request using AbortController"
                >
                  <XCircle size={15} /> Cancel (Abort)
                </button>
              </div>

              {/* Request Telemetry Logs */}
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Live Execution Logs:
                </div>
                <div style={{ background: 'var(--bg-code)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', minHeight: '100px', border: 'var(--glass-border)' }}>
                  {requestLog.length === 0 && <span style={{ color: 'var(--text-muted)' }}>No requests initiated yet.</span>}
                  {requestLog.map((log) => (
                    <div key={log.id} style={{ color: log.type === 'error' ? '#f87171' : log.type === 'success' ? '#34d399' : log.type === 'warning' ? '#fbbf24' : '#94a3b8', marginBottom: '0.2rem' }}>
                      [{log.time}] {log.msg}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Component Render Output */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem' }}>Live Component Output</h3>
                  <span style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: 600 }}>Active Engine: {fetchMethod.toUpperCase()}</span>
                </div>
                <span className={`badge ${loading ? 'badge-warning animate-pulse' : error ? 'badge-danger' : 'badge-success'}`}>
                  {loading ? 'State: LOADING' : error ? 'State: ERROR' : 'State: READY'}
                </span>
              </div>

              {/* Visual State Indicators */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '260px' }}>
                {loading && (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <div style={{ width: '40px', height: '40px', border: '3px solid rgba(99, 102, 241, 0.2)', borderTopColor: '#6366f1', borderRadius: '50%', margin: '0 auto 1rem auto', animation: 'spin 1s linear infinite' }}></div>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Loading users from API via {fetchMethod.toUpperCase()}...</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Demonstrating <code>if (loading) return &lt;p&gt;Loading...&lt;/p&gt;</code></p>
                  </div>
                )}

                {!loading && error && (
                  <div style={{ padding: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    <AlertCircle size={32} color="#ef4444" style={{ margin: '0 auto 0.5rem auto' }} />
                    <h4 style={{ color: '#ef4444', marginBottom: '0.35rem' }}>Failed to Fetch Data ({fetchMethod.toUpperCase()})</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{error}</p>
                    <button onClick={() => handleFetchData('success')} className="btn btn-secondary" style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
                      <RotateCcw size={14} /> Retry Request
                    </button>
                  </div>
                )}

                {!loading && !error && users.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {users.map((u) => (
                      <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: 'rgba(255, 255, 255, 0.03)', border: 'var(--glass-border)', borderRadius: 'var(--radius-sm)' }}>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{u.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{u.email} • {u.company}</div>
                        </div>
                        <span className="badge badge-primary">{u.role}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="callout callout-tip" style={{ marginTop: '1.5rem', marginBottom: 0 }}>
                <strong>Teaching Tip:</strong> Notice how Axios automatically throws errors for status <code>404</code> or <code>500</code>, whereas native Fetch requires you to write <code>if (!res.ok) throw new Error(...)</code>.
              </div>
            </div>
          </div>

          {/* Dedicated Live Code Viewer right on the Sandbox Tab */}
          <div className="card" style={{ borderLeft: '4px solid #818cf8' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Code2 size={18} color="#818cf8" />
                <h3 style={{ fontSize: '1.1rem' }}>
                  Live Code Implementation for Selected Option: <span style={{ color: '#818cf8' }}>{fetchMethod === 'axios' ? 'Axios (Section 1.2)' : 'Fetch API (Section 1.1)'}</span>
                </h3>
              </div>
              <span className="badge badge-purple">Matches Study Notes</span>
            </div>

            <CodeBlock
              title={fetchMethod === 'axios' ? 'UserListAxios.jsx (Axios Pattern)' : 'UserListFetch.jsx (Fetch API Pattern)'}
              code={fetchMethod === 'axios' ? axiosCodeSnippet : fetchCodeSnippet}
              language="jsx"
            />
          </div>
        </div>
      )}

      {activeTab === 'code' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-purple">1. Axios Implementation (Recommended for Production Apps)</span>
            </div>
            <CodeBlock title="UserListAxios.jsx (Axios Pattern)" code={axiosCodeSnippet} language="jsx" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-primary">2. Native Fetch API Implementation (Built-in)</span>
            </div>
            <CodeBlock title="UserListFetch.jsx (Fetch API Pattern)" code={fetchCodeSnippet} language="jsx" />
          </div>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="card animate-fade-in">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Fetch API vs Axios: Complete Feature Breakdown</h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Fetch API (Native)</th>
                <th>Axios (Library)</th>
                <th>Recommendation / Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Installation</strong></td>
                <td><span className="badge badge-success">Built-in (Zero npm)</span></td>
                <td><span className="badge badge-warning">Requires npm install axios</span></td>
                <td>Fetch is ideal for lightweight scripts with zero dependencies.</td>
              </tr>
              <tr>
                <td><strong>JSON Parsing</strong></td>
                <td>Manual (<code>await res.json()</code>)</td>
                <td><span className="badge badge-success">Automatic (res.data)</span></td>
                <td>Axios saves boilerplate on every HTTP call.</td>
              </tr>
              <tr>
                <td><strong>HTTP Error Handling</strong></td>
                <td><span className="badge badge-danger">Does not reject 404/500</span></td>
                <td><span className="badge badge-success">Rejects on status &gt;= 400</span></td>
                <td>Fetch requires checking <code>if (!res.ok)</code> manually.</td>
              </tr>
              <tr>
                <td><strong>Interceptors</strong></td>
                <td>Not built-in (must wrap fetch)</td>
                <td><span className="badge badge-success">Supported (Auth tokens, logs)</span></td>
                <td>Axios shines in enterprise apps needing JWT refresh interceptors.</td>
              </tr>
              <tr>
                <td><strong>Request Cancellation</strong></td>
                <td><code>AbortController</code></td>
                <td><code>AbortController</code> / CancelToken</td>
                <td>Both standardly use AbortController in modern React 18+.</td>
              </tr>
            </tbody>
          </table>

          <div className="callout callout-warning">
            <strong>Key Classroom Takeaway:</strong> A very common bug in student interviews is assuming <code>fetch()</code> will jump into the <code>catch</code> block on a 404 error. Explain that <code>fetch</code> only rejects on physical network failures (e.g. offline, DNS failure), so <code>res.ok</code> is mandatory!
          </div>
        </div>
      )}
    </div>
  );
}
