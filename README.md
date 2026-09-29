# React & Modern Web Development — Classroom Teaching Demo 🎓

A complete, live interactive educational web application designed for instructors to teach and demonstrate all 6 fundamental concepts from the React & Modern Web Development study curriculum.

---

## 📚 Modules Included

| # | Concept Module | Interactive Demos & Covered Topics |
|---|---|---|
| **1** | **Data Fetching** | • Native Fetch API vs Axios<br>• `async/await` with `useEffect`<br>• 3-State Model (`loading`, `error`, `data`)<br>• `try...catch` error recovery (Simulate 404, 500, Network failures)<br>• Request cancellation with `AbortController` |
| **2** | **Conditional Rendering** | • `if/else` Early Returns & Authentication Gating<br>• Ternary Operator (`condition ? <Online/> : <Offline/>`)<br>• Logical AND (`&&`) with live demonstration of the **`0` numeric pitfall**<br>• Switch Statements for multi-state status machines |
| **3** | **React Router (Navigation & Routing)** | • `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`<br>• Dynamic route parameters: `useParams()` (`/users/:id`)<br>• Programmatic navigation: `useNavigate()` (Simulated Login flow)<br>• Nested layouts with child sub-routes using `<Outlet />`<br>• 404 Catch-all Wildcard (`path="*"`) |
| **4** | **State Management** | • **Context API**: Global Theme & Auth providers eliminating prop-drilling<br>• **Redux Toolkit (RTK)**: `createSlice`, `configureStore`, `useSelector`, `useDispatch`<br>• **Immer in RTK**: Mutation syntax (`state.value += 1`) producing immutable updates behind the scenes<br>• Live Counter & Shopping Cart slices |
| **5** | **REST vs GraphQL** | • Side-by-side interactive playground<br>• REST simulation showing 3-step waterfall calls & over-fetched payload (4.8 KB)<br>• GraphQL query builder with dynamic field selection & single roundtrip (0.6 KB)<br>• Full architectural comparison matrix |
| **6** | **Server-Side Rendering (SSR) & Next.js** | • 4 Rendering Strategies: **SSR**, **SSG**, **ISR**, and **CSR**<br>• Next.js App Router Server Components vs Client Components (`"use client"`)<br>• Data fetching caching flags (`cache: "no-store"` vs `cache: "force-cache"`)<br>• SEO & First Contentful Paint (FCP) benefits |

---

## 🚀 How to Run the Project Locally

### 1. Open Terminal in the project folder:
```bash
cd C:\Users\acer\.gemini\antigravity-ide\scratch\react-masterclass-demo
```

### 2. Start the development server:
```bash
npm run dev
```

### 3. Open in your browser:
Navigate to `http://localhost:3000` (or the port Vite outputs in your terminal).

---

## 📂 Project Architecture

```
react-masterclass-demo/
├── index.html                     # Main HTML template with Google Fonts
├── package.json                   # Dependencies: React, React Router, Redux Toolkit, Axios, Lucide
├── vite.config.js                 # Vite configuration
└── src/
    ├── main.jsx                   # Entry point wrapping Providers (Redux + Context + Router)
    ├── App.jsx                    # Root layout with Sidebar and top Navbar
    ├── index.css                  # Modern glassmorphic theme design system (Dark & Light)
    ├── components/
    │   ├── Navbar.jsx             # Top bar showing live Redux state & Theme/Auth context toggles
    │   ├── Sidebar.jsx            # Module navigation bar
    │   ├── CodeBlock.jsx          # Interactive syntax-highlighted code viewer with copy tool
    │   └── ConceptHeader.jsx      # Module header with learning outcomes checklist
    ├── context/
    │   ├── ThemeContext.jsx       # Theme toggle demonstrating React Context API
    │   └── AuthContext.jsx        # User authentication state demonstrating React Context API
    ├── store/
    │   ├── store.js               # Redux Toolkit configureStore
    │   ├── counterSlice.js        # RTK Counter slice demonstrating Immer
    │   └── cartSlice.js           # RTK Shopping Cart slice with add/remove/update
    └── pages/
        ├── HomePage.jsx               # Curriculum roadmap and module cards
        ├── DataFetchingPage.jsx       # Module 1: Fetch vs Axios & Error handling
        ├── ConditionalRenderingPage.jsx# Module 2: 4 Conditional rendering patterns
        ├── RouterDemoPage.jsx         # Module 3: Routing, dynamic params, and outlets
        ├── StateManagementPage.jsx    # Module 4: Context API vs Redux Toolkit
        ├── RestVsGraphqlPage.jsx      # Module 5: Interactive REST vs GraphQL simulator
        └── NextJsSsrPage.jsx          # Module 6: SSR, SSG, ISR, CSR, & Server Components
```
