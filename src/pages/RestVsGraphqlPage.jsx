import React, { useState } from 'react';
import ConceptHeader from '../components/ConceptHeader';
import CodeBlock from '../components/CodeBlock';
import WorkflowExplainer from '../components/WorkflowExplainer';
import {
  ArrowLeftRight,
  Database,
  Send,
  Zap,
  CheckCircle2,
  Clock,
  Layers,
  FileCode2,
  SlidersHorizontal,
  HelpCircle,
  FileJson
} from 'lucide-react';

export default function RestVsGraphqlPage() {
  const [activeTab, setActiveTab] = useState('sandbox');

  // REST Simulator State
  const [restLoading, setRestLoading] = useState(false);
  const [restStep, setRestStep] = useState(0);
  const [restPayloadSize, setRestPayloadSize] = useState(0);
  const [restData, setRestData] = useState(null);

  // GraphQL Simulator State
  const [gqlLoading, setGqlLoading] = useState(false);
  const [gqlData, setGqlData] = useState(null);
  const [gqlFields, setGqlFields] = useState({
    name: true,
    email: false,
    posts: true,
    postBody: false,
    comments: true,
    commentAuthor: false
  });

  const runRestSimulation = async () => {
    setRestLoading(true);
    setRestData(null);
    setRestStep(1); // Fetching /api/users/1

    await new Promise(r => setTimeout(r, 600));
    setRestStep(2); // Fetching /api/users/1/posts

    await new Promise(r => setTimeout(r, 600));
    setRestStep(3); // Fetching /api/posts/1/comments

    await new Promise(r => setTimeout(r, 600));
    setRestLoading(false);
    setRestStep(4);
    setRestPayloadSize(4.8);
    setRestData({
      user: {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: { street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: { lat: '-37.3159', lng: '81.1496' } },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness real-time e-markets' }
      },
      posts: [
        { userId: 1, id: 1, title: 'Understanding React Server Components', body: 'Full post content body with 500 words...' },
        { userId: 1, id: 2, title: 'State Management in 2026', body: 'Detailed analysis of Redux vs Context...' }
      ],
      comments: [
        { postId: 1, id: 1, name: 'id labore', email: 'Eliseo@gardner.biz', body: 'Great explanation on SSR!' },
        { postId: 1, id: 2, name: 'quo vero', email: 'Jayne_Kuhic@sydney.com', body: 'Helped me understand Next.js.' }
      ]
    });
  };

  const runGqlSimulation = async () => {
    setGqlLoading(true);
    setGqlData(null);

    await new Promise(r => setTimeout(r, 700));
    setGqlLoading(false);

    const res = { user: {} };
    if (gqlFields.name) res.user.name = 'Leanne Graham';
    if (gqlFields.email) res.user.email = 'Sincere@april.biz';
    
    if (gqlFields.posts) {
      res.user.posts = [
        {
          title: 'Understanding React Server Components',
          ...(gqlFields.postBody && { body: 'Full post content body with 500 words...' }),
          ...(gqlFields.comments && {
            comments: [
              {
                text: 'Great explanation on SSR!',
                ...(gqlFields.commentAuthor && { author: 'Eliseo' })
              }
            ]
          })
        }
      ];
    }
    setGqlData(res);
  };

  const codeSnippets = `// 5.1 REST: Multiple HTTP Endpoints (Waterfall & Over-fetching)
// Request 1: Get user details (returns entire user object with address, geo, phone, etc.)
GET /api/users/1

// Request 2: Get user's posts
GET /api/users/1/posts

// Request 3: Get comments for post #5
GET /api/posts/5/comments


// 5.2 GraphQL: Single Unified Query (Zero Over-fetching)
// Single POST to /graphql endpoint with exact query body:
query GetUserPostData {
  user(id: 1) {
    name
    posts {
      title
      comments {
        text
      }
    }
  }
}`;

  return (
    <div className="page-wrapper animate-fade-in">
      <ConceptHeader
        moduleNumber={5}
        title="REST vs GraphQL"
        subtitle="Compare traditional multi-endpoint REST architecture against modern single-endpoint, query-driven GraphQL."
        keyPoints={[
          "REST: Multiple endpoints (/users, /posts, /comments) often cause waterfalls and over/under-fetching.",
          "GraphQL: Single endpoint (/graphql) where client declares EXACT fields needed — zero waste.",
          "REST is simpler for standard CRUD, native browser caching, and public open APIs.",
          "GraphQL is best for flexible UI requirements, nested relationships, and mobile devices with limited bandwidth."
        ]}
        badgeColor="badge-primary"
      />

      {/* Under-the-Hood Workflow Explainer */}
      <WorkflowExplainer
        title="API Network & Backend Server Lifecycle"
        conceptSummary="In REST, the backend defines the shape of the data at fixed endpoint URLs; clients have to make multiple roundtrips to fetch relational data. In GraphQL, the client defines the data contract by sending a declarative query document to a single `/graphql` endpoint."
        backendSummary="When a GraphQL server (e.g. Apollo Server, GraphQL-Yoga) receives a query, its Engine parses the query string into an Abstract Syntax Tree (AST), validates it against the Schema definition, and executes resolver functions in parallel to construct the exact response shape requested."
        steps={[
          {
            title: "Client Dispatches Request",
            actor: "Browser HTTP Client",
            description: "REST sends 3 sequential GET requests. GraphQL sends 1 POST request with query payload: `POST /graphql { query: '{ user { name posts { title } } }' }`.",
            code: "POST /graphql { query: 'query { user(id: 1) { name } }' }"
          },
          {
            title: "Backend Parser & Schema Validator",
            actor: "GraphQL Engine / AST Validator",
            description: "Server parses GraphQL query AST, verifies type definitions, and checks permissions/rate limits before touching the database.",
            code: "GraphQLSchema.validate(AST)"
          },
          {
            title: "Parallel Field Resolvers Execution",
            actor: "Backend DB Resolvers",
            description: "Server invokes UserResolver and PostResolver concurrently. The DataLoader pattern batches database queries (e.g., SELECT * FROM posts WHERE userId IN (...)).",
            code: "User.findById(1) -> Post.find({ userId: 1 })"
          },
          {
            title: "Tailored JSON Response Serialization",
            actor: "HTTP Socket Response",
            description: "Server strips unrequested fields (phone, address coordinates, internal IDs) and streams a compact 0.6 KB response back to browser.",
            code: "HTTP 200 { data: { user: { name: 'Leanne Graham' } } }"
          }
        ]}
        commonMistakes={[
          "Over-fetching in REST (e.g., fetching 50 fields when the UI only displays user.name and avatar).",
          "Under-fetching in REST (needing to issue 4 consecutive HTTP calls before rendering a feed page).",
          "Solving the N+1 problem in GraphQL backend resolvers without using DataLoader batching tools."
        ]}
      />

      <div className="tab-list">
        <button
          className={`tab-button ${activeTab === 'sandbox' ? 'active' : ''}`}
          onClick={() => setActiveTab('sandbox')}
        >
          <SlidersHorizontal size={16} /> Live Interactive Query Playground
        </button>
        <button
          className={`tab-button ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          <HelpCircle size={16} /> Architectural Comparison Matrix
        </button>
        <button
          className={`tab-button ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          <FileCode2 size={16} /> Query Syntax Notes
        </button>
      </div>

      {activeTab === 'sandbox' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* REST Sandbox Card */}
          <div className="card" style={{ borderTop: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-danger">5.1 REST Architecture</span>
                <h3 style={{ fontSize: '1.2rem', marginTop: '0.25rem' }}>Multiple Endpoints (Waterfall)</h3>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>3 HTTP Roundtrips</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              To display a user's post and its comments, a REST client must issue 3 separate HTTP requests sequentially.
            </p>

            <button
              className="btn btn-danger"
              style={{ width: '100%', marginBottom: '1.25rem' }}
              onClick={runRestSimulation}
              disabled={restLoading}
            >
              {restLoading ? 'Executing Waterfall Requests...' : 'Simulate 3x REST API Calls'}
            </button>

            {/* REST Request Waterfall Progress */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.5rem 0.75rem', background: restStep >= 1 ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-input)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <code>GET /api/users/1</code>
                <span>{restStep >= 1 ? (restStep > 1 ? '✅ 200 OK' : '⏳ Fetching...') : 'Pending'}</span>
              </div>
              <div style={{ padding: '0.5rem 0.75rem', background: restStep >= 2 ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-input)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <code>GET /api/users/1/posts</code>
                <span>{restStep >= 2 ? (restStep > 2 ? '✅ 200 OK' : '⏳ Fetching...') : 'Pending'}</span>
              </div>
              <div style={{ padding: '0.5rem 0.75rem', background: restStep >= 3 ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-input)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <code>GET /api/posts/1/comments</code>
                <span>{restStep >= 3 ? (restStep >= 4 ? '✅ 200 OK' : '⏳ Fetching...') : 'Pending'}</span>
              </div>
            </div>

            {restData && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.78rem', color: '#f87171', fontWeight: 600 }}>OVER-FETCHED PAYLOAD (4.8 KB):</span>
                  <span className="badge badge-danger">High Bandwidth</span>
                </div>
                <div style={{ background: 'var(--bg-code)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', maxHeight: '180px', overflowY: 'auto', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <pre>{JSON.stringify(restData, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>

          {/* GraphQL Sandbox Card */}
          <div className="card" style={{ borderTop: '4px solid #ec4899' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-purple">5.2 GraphQL Architecture</span>
                <h3 style={{ fontSize: '1.2rem', marginTop: '0.25rem' }}>Single Query (Exact Data)</h3>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>1 Single Request</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Toggle the exact fields the UI needs. The GraphQL server will resolve them in a single query.
            </p>

            {/* Field Picker Checkboxes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem', background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: 'var(--glass-border)' }}>
              <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={gqlFields.name} onChange={e => setGqlFields({ ...gqlFields, name: e.target.checked })} />
                <span>user.name</span>
              </label>
              <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={gqlFields.email} onChange={e => setGqlFields({ ...gqlFields, email: e.target.checked })} />
                <span>user.email</span>
              </label>
              <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={gqlFields.posts} onChange={e => setGqlFields({ ...gqlFields, posts: e.target.checked })} />
                <span>posts.title</span>
              </label>
              <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={gqlFields.comments} onChange={e => setGqlFields({ ...gqlFields, comments: e.target.checked })} />
                <span>comments.text</span>
              </label>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: '1rem', background: 'linear-gradient(135deg, #ec4899, #a855f7)' }}
              onClick={runGqlSimulation}
              disabled={gqlLoading}
            >
              <Zap size={15} />
              {gqlLoading ? 'Resolving Single GraphQL Query...' : 'Execute POST /graphql (Single Query)'}
            </button>

            {gqlData && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 600 }}>TAILORED PAYLOAD (0.6 KB - ZERO WASTE):</span>
                  <span className="badge badge-success">Optimized</span>
                </div>
                <div style={{ background: 'var(--bg-code)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', maxHeight: '180px', overflowY: 'auto', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <pre>{JSON.stringify(gqlData, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="card animate-fade-in">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>REST vs GraphQL: Official Study Guide Matrix</h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Aspect</th>
                <th>REST</th>
                <th>GraphQL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Data Fetching</strong></td>
                <td>Multiple endpoints; may over-fetch or under-fetch data.</td>
                <td><span className="badge badge-success">Single endpoint</span>; client specifies exact fields needed.</td>
              </tr>
              <tr>
                <td><strong>Requests Needed</strong></td>
                <td>Often multiple requests for related/nested data (waterfalls).</td>
                <td><span className="badge badge-success">Usually 1 request</span> for nested/related data.</td>
              </tr>
              <tr>
                <td><strong>Versioning</strong></td>
                <td>Typically versioned URLs (e.g. <code>/v1/users</code>, <code>/v2/users</code>).</td>
                <td>No URL versioning needed; schema evolves field by field.</td>
              </tr>
              <tr>
                <td><strong>Caching</strong></td>
                <td><span className="badge badge-success">Easy</span> — leverages native HTTP caching (ETags, CDN, Browser cache).</td>
                <td>More complex — requires specialized client cache (Apollo InMemoryCache, Urql).</td>
              </tr>
              <tr>
                <td><strong>Learning Curve</strong></td>
                <td>Simple, widely understood industry default.</td>
                <td>Steeper — requires schemas, type definitions, resolvers, and queries.</td>
              </tr>
              <tr>
                <td><strong>File Uploads</strong></td>
                <td>Native support via multipart/form-data.</td>
                <td>Requires extra tooling / multipart spec plugins.</td>
              </tr>
            </tbody>
          </table>

          <div className="callout callout-tip" style={{ marginTop: '1.5rem' }}>
            <strong>When to choose which:</strong> Use <strong>REST</strong> for simple CRUD apps and public third-party APIs. Use <strong>GraphQL</strong> when the frontend client needs flexible queries, deeply nested relational data, or when optimizing mobile network bandwidth.
          </div>
        </div>
      )}

      {activeTab === 'code' && (
        <div className="animate-fade-in">
          <CodeBlock title="RestVsGraphqlQueries.txt" code={codeSnippets} language="graphql" />
        </div>
      )}
    </div>
  );
}
