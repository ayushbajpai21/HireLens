export const TRACKS = [
  { 
    id: 'mern', 
    name: 'Full Stack Engineering', 
    icon: '', 
    badge: 'Full Stack',
    description: 'Frontend, Backend, Databases, APIs & Scalable Web Architecture' 
  },
  { 
    id: 'react', 
    name: 'React.js & UI', 
    icon: '', 
    badge: 'Frontend',
    description: 'Virtual DOM, Fiber Reconciliation, Hooks, State & React 18+' 
  },
  { 
    id: 'node', 
    name: 'Node.js & Express', 
    icon: '', 
    badge: 'Backend',
    description: 'Event Loop, Libuv, Streams, Buffers, Middleware & Async I/O' 
  },
  { 
    id: 'mongodb', 
    name: 'MongoDB & DBs', 
    icon: '', 
    badge: 'Databases',
    description: 'B-Tree Indexing, ESR Rule, Aggregation Pipelines & ACID' 
  },
  { 
    id: 'javascript', 
    name: 'JavaScript & TS', 
    icon: '', 
    badge: 'Language Core',
    description: 'Closures, Event Loop, Microtasks, Prototypes & TS Generics' 
  },
  { 
    id: 'system-design', 
    name: 'System Design', 
    icon: '', 
    badge: 'Architecture',
    description: 'Redis Caching, REST Idempotency, Rate Limiting & Scalability' 
  },
  { 
    id: 'tailwind', 
    name: 'Tailwind & UI', 
    icon: '', 
    badge: 'Styling & CSS',
    description: 'Tailwind CSS, HTML5, Box Model, Responsive Design & Modern Web UI' 
  },
  { 
    id: 'git', 
    name: 'Git & Tooling', 
    icon: '', 
    badge: 'DevOps & Git',
    description: 'Git Trees, Rebase vs Merge, Stashing, Conflict Resolution & CI/CD' 
  },
  { 
    id: 'rest', 
    name: 'REST APIs & Auth', 
    icon: '', 
    badge: 'API Engineering',
    description: 'REST Architecture, HTTP Status Codes, JWT Tokens, Cookies & Postman' 
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning & AI',
    icon: '',
    badge: 'AI & Neural Nets',
    description: 'CNNs, RNNs, Backpropagation, Attention, Transformers, Loss & Optimizers'
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    icon: '',
    badge: 'ML & Scikit-Learn',
    description: 'Bias-Variance, ROC-AUC, Random Forests, XGBoost, Clustering & Evaluation'
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics & Matplotlib',
    icon: '',
    badge: 'Data & Visualization',
    description: 'Pandas, NumPy, Matplotlib API, Seaborn, EDA & Statistical Metrics'
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing',
    icon: '',
    badge: 'NLP & Language Models',
    description: 'NLTK, Tokenization, Lemmatization, TF-IDF, Word Embeddings & BERT'
  },
  {
    id: 'tensorflow-keras',
    name: 'TensorFlow & Keras',
    icon: '',
    badge: 'Deep Learning Frameworks',
    description: 'Functional API, Custom Layers, Callbacks, GradientTape & GPU Training'
  },
  {
    id: 'bi-analytics',
    name: 'Power BI, Tableau & Excel',
    icon: '',
    badge: 'Business Intelligence',
    description: 'DAX Measures, Star Schema, Power Query ETL, Tableau LOD & Advanced Modeling'
  },
  {
    id: 'python',
    name: 'Python Core',
    icon: '',
    badge: 'Python Programming',
    description: 'CPython GIL, Generators, Decorators, Dunder Methods & Memory Management'
  }
];

export const QUESTIONS_BY_TRACK = {
  mern: [
    {
      id: 1,
      category: 'React.js',
      difficulty: 'Intermediate',
      question: 'In React 18, how does automatic state batching handle updates inside setTimeout or native event handlers?',
      options: [
        { id: 'A', text: 'It only batches updates inside React event handlers, leaving setTimeout unbatched.' },
        { id: 'B', text: 'It automatically batches all state updates together across promises, setTimeout, and native events into a single re-render.' },
        { id: 'C', text: 'It throws a warning if multiple setState calls are made synchronously inside an async function.' },
        { id: 'D', text: 'It forces immediate synchronous DOM mutations for every state update.' }
      ],
      correct: 'B',
      explanation: 'React 18 introduced Automatic Batching, which groups state updates together by default—even inside promises, setTimeout, and native event handlers—preventing unnecessary intermediate re-renders.'
    },
    {
      id: 2,
      category: 'React.js',
      difficulty: 'Intermediate',
      question: 'What is the primary difference between useMemo and useCallback in React?',
      options: [
        { id: 'A', text: 'useMemo is used for side-effects, while useCallback is used for calculating state.' },
        { id: 'B', text: 'useMemo memoizes a computed return value, whereas useCallback memoizes a callback function reference itself.' },
        { id: 'C', text: 'useCallback runs asynchronously in a web worker, while useMemo runs on the main thread.' },
        { id: 'D', text: 'They are completely identical and aliases of one another.' }
      ],
      correct: 'B',
      explanation: 'useMemo caches the result of calling a function and returns that value. useCallback caches the function definition itself across renders until its dependency array changes.'
    },
    {
      id: 3,
      category: 'React.js',
      difficulty: 'Intermediate',
      question: 'When does the cleanup function returned by useEffect execute?',
      options: [
        { id: 'A', text: 'Only when the entire browser tab is closed.' },
        { id: 'B', text: 'Before the component unmounts and before the effect re-runs on subsequent renders due to dependency changes.' },
        { id: 'C', text: 'Immediately after the component mounts for the first time.' },
        { id: 'D', text: 'Only when an unhandled JavaScript error is caught.' }
      ],
      correct: 'B',
      explanation: 'The cleanup function executes right before the component unmounts, and also before the effect re-runs whenever any dependency in the dependency array updates.'
    },
    {
      id: 4,
      category: 'JavaScript',
      difficulty: 'Advanced',
      question: 'In the JavaScript Event Loop, what is the execution priority between Microtasks (Promises) and Macrotasks (setTimeout)?',
      options: [
        { id: 'A', text: 'Macrotasks are always executed before any Microtasks.' },
        { id: 'B', text: 'Microtasks are processed completely after each task phase before the next macrotask is dequeued.' },
        { id: 'C', text: 'Microtasks and Macrotasks run concurrently on separate CPU cores.' },
        { id: 'D', text: 'Both queues alternate evenly with round-robin scheduling.' }
      ],
      correct: 'B',
      explanation: 'Microtasks (Promise callbacks, process.nextTick, queueMicrotask) have higher priority. After each macrotask completes, the entire microtask queue is drained before the event loop moves to the next macrotask.'
    },
    {
      id: 5,
      category: 'JavaScript',
      difficulty: 'Intermediate',
      question: 'What is a JavaScript closure and why is it useful?',
      options: [
        { id: 'A', text: 'A syntax error caused by forgetting to close a curly bracket.' },
        { id: 'B', text: 'A mechanism that automatically terminates infinite loops.' },
        { id: 'C', text: 'A function that retains access to its outer lexical scope even when called outside that scope.' },
        { id: 'D', text: 'A garbage collection algorithm that clears unused global variables.' }
      ],
      correct: 'C',
      explanation: 'A closure is the combination of a function bundled with references to its surrounding lexical environment. It allows inner functions to access outer variables even after the outer function has finished executing.'
    },
    {
      id: 6,
      category: 'Node.js',
      difficulty: 'Intermediate',
      question: 'Why is Node.js able to handle thousands of concurrent I/O connections despite having a single main execution thread?',
      options: [
        { id: 'A', text: 'It creates a separate OS process for every incoming HTTP socket.' },
        { id: 'B', text: 'It relies on non-blocking asynchronous I/O and the Libuv event loop/thread pool under the hood.' },
        { id: 'C', text: 'It compiles JavaScript directly into GPU machine code.' },
        { id: 'D', text: 'It uses synchronized synchronous file read blocking.' }
      ],
      correct: 'B',
      explanation: 'Node.js delegates non-blocking I/O operations to the operating system kernel or to the Libuv worker thread pool, freeing the main thread to handle thousands of incoming requests concurrently.'
    },
    {
      id: 7,
      category: 'Node.js',
      difficulty: 'Advanced',
      question: 'When reading a 5GB file in Node.js, why should you use Streams instead of fs.readFile()?',
      options: [
        { id: 'A', text: 'fs.readFile() attempts to load the entire 5GB buffer into V8 memory at once, causing heap out-of-memory crashes.' },
        { id: 'B', text: 'Streams compress files into zip archives automatically.' },
        { id: 'C', text: 'fs.readFile() only supports JSON files.' },
        { id: 'D', text: 'Streams bypass the Node.js event loop completely.' }
      ],
      correct: 'A',
      explanation: 'fs.readFile() loads the entire file into memory before returning the buffer, which exceeds the default V8 heap limit. Streams process the file in small, sequential chunks with backpressure handling.'
    },
    {
      id: 8,
      category: 'Node.js & Express',
      difficulty: 'Intermediate',
      question: 'What happens in an Express.js middleware if you do not call next() and do not send a response?',
      options: [
        { id: 'A', text: 'Express automatically calls next() after a 2-second timeout.' },
        { id: 'B', text: 'The incoming client request will hang indefinitely until the client or proxy times out.' },
        { id: 'C', text: 'Express crashes the server process with an uncaught exception.' },
        { id: 'D', text: 'The request is automatically redirected to the root / route.' }
      ],
      correct: 'B',
      explanation: 'Express middleware chains must either pass execution to the next handler by calling next() or terminate the request-response cycle by sending a response (res.json, res.send, etc.). Otherwise, the request hangs.'
    },
    {
      id: 9,
      category: 'MongoDB',
      difficulty: 'Advanced',
      question: 'What does the ESR (Equality, Sort, Range) rule prescribe when designing compound indexes in MongoDB?',
      options: [
        { id: 'A', text: 'Range fields must come first, followed by Equality, then Sort.' },
        { id: 'B', text: 'Equality matches must come first, followed by Sort fields, and finally Range filter fields.' },
        { id: 'C', text: 'Sort fields must always be indexed separately in an ascending single-field index.' },
        { id: 'D', text: 'Every query must strictly use all three types of operations.' }
      ],
      correct: 'B',
      explanation: 'The ESR rule states that compound index keys should be ordered: (1) Equality filters first to narrow down documents, (2) Sort fields next to avoid in-memory sorting, and (3) Range filters last.'
    },
    {
      id: 10,
      category: 'MongoDB',
      difficulty: 'Intermediate',
      question: 'When should you embed child documents versus using $lookup (referencing) in MongoDB?',
      options: [
        { id: 'A', text: 'Always use $lookup because MongoDB is designed as a relational database.' },
        { id: 'B', text: 'Embed when data is read together and has bounded 1-to-few cardinality; use references when child data grows unboundedly.' },
        { id: 'C', text: 'Embedding documents is prohibited beyond 100 bytes.' },
        { id: 'D', text: 'References should only be used for password hashes.' }
      ],
      correct: 'B',
      explanation: 'Embedding is optimal for "contains" relationships where data is queried together and stays within MongoDB\'s 16MB document limit. Referencing with $lookup prevents unbound document growth (e.g. logs, comments).'
    },
    {
      id: 11,
      category: 'REST & Architecture',
      difficulty: 'Intermediate',
      question: 'Which of the following HTTP methods are defined as idempotent according to the HTTP/1.1 specification?',
      options: [
        { id: 'A', text: 'POST only' },
        { id: 'B', text: 'GET, PUT, DELETE, and HEAD' },
        { id: 'C', text: 'POST and PATCH' },
        { id: 'D', text: 'No HTTP method is idempotent' }
      ],
      correct: 'B',
      explanation: 'An HTTP method is idempotent if the side-effects of making multiple identical requests are the same as for a single request. GET, PUT, and DELETE are idempotent; POST is not.'
    },
    {
      id: 12,
      category: 'Web Security',
      difficulty: 'Advanced',
      question: 'Why is storing JWT authentication tokens in HttpOnly cookies more secure than localStorage?',
      options: [
        { id: 'A', text: 'HttpOnly cookies cannot be read by client-side JavaScript, mitigating Cross-Site Scripting (XSS) token theft.' },
        { id: 'B', text: 'LocalStorage has an encryption algorithm that is easily decrypted by browser extensions.' },
        { id: 'C', text: 'Cookies are automatically cleared whenever the computer goes to sleep.' },
        { id: 'D', text: 'HttpOnly cookies make HTTPS encryption unnecessary.' }
      ],
      correct: 'A',
      explanation: 'HttpOnly cookies are inaccessible to JavaScript via document.cookie, making it impossible for malicious scripts injected through XSS attacks to steal the authentication token.'
    },
    {
      id: 13,
      category: 'TypeScript',
      difficulty: 'Intermediate',
      question: 'What is the purpose of Generics in TypeScript?',
      options: [
        { id: 'A', text: 'To generate random numbers during build time.' },
        { id: 'B', text: 'To create reusable code components that can work over a variety of types while preserving type safety.' },
        { id: 'C', text: 'To convert TypeScript code into WebAssembly.' },
        { id: 'D', text: 'To disable strict type checking across an entire project.' }
      ],
      correct: 'B',
      explanation: 'Generics allow you to write reusable, type-safe functions, classes, and interfaces that work with flexible types rather than being constrained to a single concrete type or unsafe "any".'
    },
    {
      id: 14,
      category: 'JavaScript',
      difficulty: 'Intermediate',
      question: 'How does Promise.allSettled() differ from Promise.all() when one of the promises rejects?',
      options: [
        { id: 'A', text: 'Promise.allSettled() immediately aborts all other promises.' },
        { id: 'B', text: 'Promise.all() rejects immediately on the first error (fail-fast), whereas Promise.allSettled() waits for all promises to finish and returns their individual outcomes.' },
        { id: 'C', text: 'Promise.allSettled() automatically retries rejected promises 3 times.' },
        { id: 'D', text: 'Promise.all() returns an array of booleans instead of values.' }
      ],
      correct: 'B',
      explanation: 'Promise.all() short-circuits as soon as any promise rejects. Promise.allSettled() always waits for every promise to either resolve or reject, returning an array of objects with status and value/reason.'
    },
    {
      id: 15,
      category: 'System Design',
      difficulty: 'Advanced',
      question: 'In a Cache-Aside (Lazy Loading) caching pattern with Redis, what sequence of actions occurs on a read request?',
      options: [
        { id: 'A', text: 'The application writes data to Redis first, then the database updates asynchronously.' },
        { id: 'B', text: 'The application checks Redis; if cache hit, returns data. If cache miss, queries database, writes result into Redis with a TTL, and returns it.' },
        { id: 'C', text: 'The application always queries the primary database and purges Redis on every read.' },
        { id: 'D', text: 'Redis acts as a reverse proxy load balancer routing requests directly to MongoDB.' }
      ],
      correct: 'B',
      explanation: 'In Cache-Aside, the application first looks for data in the cache. On a cache miss, it fetches data from the primary database, populates the cache for subsequent requests, and returns the response.'
    }
  ],

  react: [
    {
      id: 1,
      category: 'React.js',
      difficulty: 'Intermediate',
      question: 'What fundamentally triggers a component re-render in React?',
      options: [
        { id: 'A', text: 'Only changing a global window variable.' },
        { id: 'B', text: 'State changes, props changes, context updates, or parent component re-rendering.' },
        { id: 'C', text: 'Moving the mouse over a DOM element.' },
        { id: 'D', text: 'Only manually calling forceUpdate() on functional components.' }
      ],
      correct: 'B',
      explanation: 'React components re-render whenever their internal state updates via useState/useReducer, their incoming props change, consumed Context values update, or their parent component re-renders.'
    },
    {
      id: 2,
      category: 'React.js',
      difficulty: 'Advanced',
      question: 'How does React Fiber differ from the legacy Stack reconciler?',
      options: [
        { id: 'A', text: 'Fiber runs exclusively on the Node.js backend.' },
        { id: 'B', text: 'Fiber uses an in-memory linked list of fibers allowing interruptible work, time-slicing, and prioritized rendering.' },
        { id: 'C', text: 'Fiber replaces the DOM with Canvas 2D.' },
        { id: 'D', text: 'Fiber removes the need for components to return JSX.' }
      ],
      correct: 'B',
      explanation: 'React Fiber breaks rendering down into granular units of work (fibers in a linked list). It allows React to pause, abort, or prioritize rendering work so high-priority updates (like typing or animation) are not blocked by heavy trees.'
    },
    {
      id: 3,
      category: 'React.js',
      difficulty: 'Intermediate',
      question: 'What is the core difference between a Controlled and an Uncontrolled component?',
      options: [
        { id: 'A', text: 'Controlled components use TypeScript; uncontrolled use plain JavaScript.' },
        { id: 'B', text: 'In controlled components form state is driven by React state (value + onChange); in uncontrolled components form state is handled by the DOM itself (ref).' },
        { id: 'C', text: 'Uncontrolled components cannot be styled with CSS.' },
        { id: 'D', text: 'Controlled components cannot make network requests.' }
      ],
      correct: 'B',
      explanation: 'A controlled input takes its current value through props and notifies changes via callbacks (single source of truth). An uncontrolled input stores state internally in the DOM and you query it with a ref.'
    },
    {
      id: 4,
      category: 'React.js',
      difficulty: 'Intermediate',
      question: 'Why must Hooks only be called at the top level of React function components?',
      options: [
        { id: 'A', text: 'Because JavaScript prohibits functions inside loops.' },
        { id: 'B', text: 'React relies on the call order of Hooks across re-renders to correctly link state to the component fiber.' },
        { id: 'C', text: 'To reduce the final bundle size of Vite.' },
        { id: 'D', text: 'Because conditional statements run in separate threads.' }
      ],
      correct: 'B',
      explanation: 'React maintains hook state in an internal linked list. If hooks are placed in conditionals or loops, their execution order changes between renders, which corrupts internal hook state matching.'
    },
    {
      id: 5,
      category: 'React.js',
      difficulty: 'Intermediate',
      question: 'What does React.memo() do and how does it compare props by default?',
      options: [
        { id: 'A', text: 'It caches the entire DOM tree in IndexedDB using deep recursive comparison.' },
        { id: 'B', text: 'It is a higher-order component that skips re-rendering if props have not changed, using shallow reference equality (Object.is).' },
        { id: 'C', text: 'It converts the component to a Server-Side Rendered string.' },
        { id: 'D', text: 'It prevents child components from updating state.' }
      ],
      correct: 'B',
      explanation: 'React.memo wraps a component and memoizes its rendered output. If props are unchanged according to shallow equality, React skips rendering the component and reuses the last rendered result.'
    },
    {
      id: 6,
      category: 'React.js',
      difficulty: 'Advanced',
      question: 'When should you use useLayoutEffect instead of useEffect?',
      options: [
        { id: 'A', text: 'Whenever you want the effect to run on the server.' },
        { id: 'B', text: 'When you need to measure DOM layout or mutate the DOM synchronously before the browser paints to prevent visual flicker.' },
        { id: 'C', text: 'For all data fetching operations.' },
        { id: 'D', text: 'useLayoutEffect is deprecated in React 18.' }
      ],
      correct: 'B',
      explanation: 'useEffect runs asynchronously after the browser paints. useLayoutEffect runs synchronously immediately after all DOM mutations and before the browser paints the screen, making it essential for reading layout geometry and avoiding flickering.'
    },
    {
      id: 7,
      category: 'React.js',
      difficulty: 'Intermediate',
      question: 'Why is the "key" prop critical when rendering arrays of components in React?',
      options: [
        { id: 'A', text: 'It is used as the unique CSS selector in the browser.' },
        { id: 'B', text: 'It provides a stable identity so React reconciler knows which items were added, removed, or reordered.' },
        { id: 'C', text: 'It encrypts component props for security.' },
        { id: 'D', text: 'It is required by HTML5 standards.' }
      ],
      correct: 'B',
      explanation: 'Keys help React identify which items have changed, been added, or removed. Using stable keys prevents unnecessary re-creations of DOM elements and maintains component state during list re-ordering.'
    },
    {
      id: 8,
      category: 'React.js',
      difficulty: 'Intermediate',
      question: 'When is useReducer preferred over useState?',
      options: [
        { id: 'A', text: 'Only when dealing with primitive boolean values.' },
        { id: 'B', text: 'When state logic is complex involving multiple sub-values, or when the next state depends closely on the previous state.' },
        { id: 'C', text: 'useReducer is required for Redux integration only.' },
        { id: 'D', text: 'When state needs to be stored on the backend database.' }
      ],
      correct: 'B',
      explanation: 'useReducer is preferred when you have complex state transitions, action-based workflows, multiple interrelated fields, or when optimizing performance by passing dispatch instead of callbacks down the tree.'
    },
    {
      id: 9,
      category: 'React.js',
      difficulty: 'Intermediate',
      question: 'What is the performance pitfall of React Context and how is it mitigated?',
      options: [
        { id: 'A', text: 'Context values are limited to 1024 bytes.' },
        { id: 'B', text: 'Every component that consumes the context re-renders whenever the context value changes; mitigate by splitting contexts and memoizing value objects.' },
        { id: 'C', text: 'Context causes memory leaks in mobile browsers.' },
        { id: 'D', text: 'Context cannot pass functions.' }
      ],
      correct: 'B',
      explanation: 'Any update to a Context value triggers a re-render in all consuming components. To optimize, split unrelated states into separate contexts and wrap value objects in useMemo.'
    },
    {
      id: 10,
      category: 'React.js',
      difficulty: 'Intermediate',
      question: 'What does ReactDOM.createPortal() do?',
      options: [
        { id: 'A', text: 'Creates an encrypted WebSocket connection.' },
        { id: 'B', text: 'Renders a child component into a different DOM node outside of the parent component hierarchy.' },
        { id: 'C', text: 'Enables WebGL 3D rendering in React.' },
        { id: 'D', text: 'Downloads external HTML pages.' }
      ],
      correct: 'B',
      explanation: 'Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component, commonly used for modals, tooltips, and floating dropdowns.'
    },
    {
      id: 11,
      category: 'React.js',
      difficulty: 'Advanced',
      question: 'How does React 18\'s useTransition hook improve user responsiveness?',
      options: [
        { id: 'A', text: 'It creates CSS3 keyframe animations automatically.' },
        { id: 'B', text: 'It lets you mark state updates as non-urgent transitions, keeping user inputs (typing, clicking) snappy while rendering large lists in the background.' },
        { id: 'C', text: 'It switches the application from HTTP to HTTPS.' },
        { id: 'D', text: 'It restarts the browser rendering engine.' }
      ],
      correct: 'B',
      explanation: 'useTransition marks state updates as transitions. Urgent updates (typing in an input) take priority over transition updates (filtering 10,000 items), preventing the input from lagging.'
    },
    {
      id: 12,
      category: 'React.js',
      difficulty: 'Intermediate',
      question: 'What is the purpose of React.lazy() and Suspense?',
      options: [
        { id: 'A', text: 'To pause JavaScript execution for 5 seconds.' },
        { id: 'B', text: 'To implement route and component code-splitting, downloading component bundles on-demand when rendered.' },
        { id: 'C', text: 'To automatically cache API responses.' },
        { id: 'D', text: 'To detect dead code in production.' }
      ],
      correct: 'B',
      explanation: 'React.lazy enables dynamic import() of components, splitting bundle sizes so users only download code when needed. Suspense renders a fallback UI (spinner) while the chunk loads.'
    },
    {
      id: 13,
      category: 'React.js',
      difficulty: 'Intermediate',
      question: 'What causes the "Cannot update a component while rendering a different component" warning?',
      options: [
        { id: 'A', text: 'Using CSS modules.' },
        { id: 'B', text: 'Triggering a parent or sibling state update directly inside the render body of a child component instead of an effect or handler.' },
        { id: 'C', text: 'Having more than 10 components on a page.' },
        { id: 'D', text: 'Importing React from react-dom.' }
      ],
      correct: 'B',
      explanation: 'Rendering must be pure. Calling a state setter for another component during render phase causes unpredictable side effects and circular renders. Such state updates must be moved into useEffect or event handlers.'
    },
    {
      id: 14,
      category: 'React.js',
      difficulty: 'Advanced',
      question: 'What is the primary difference between React Server Components (RSC) and standard SSR?',
      options: [
        { id: 'A', text: 'SSR renders on the client; RSC renders on mobile devices.' },
        { id: 'B', text: 'SSR sends initial HTML and hydrates the full JS bundle on client; RSC never send their component code to the client bundle, reducing JS payload to zero.' },
        { id: 'C', text: 'RSC can only be used with SQL databases.' },
        { id: 'D', text: 'There is no difference; they are synonymous.' }
      ],
      correct: 'B',
      explanation: 'Traditional SSR renders HTML on server but still ships all component JS code to the client for hydration. React Server Components execute exclusively on the server and ship zero JavaScript bundle to the browser.'
    },
    {
      id: 15,
      category: 'React.js',
      difficulty: 'Intermediate',
      question: 'How do you prevent a function recreated on every render from breaking child memoization?',
      options: [
        { id: 'A', text: 'Wrap the function in useCallback with appropriate dependencies.' },
        { id: 'B', text: 'Declare the function using the var keyword.' },
        { id: 'C', text: 'Delete all child props.' },
        { id: 'D', text: 'Use setTimeout around the child component.' }
      ],
      correct: 'A',
      explanation: 'useCallback returns a memoized version of the callback that only changes if one of the dependencies has changed. This maintains referential equality and prevents memoized child components from re-rendering unnecessarily.'
    }
  ],

  node: [
    {
      id: 1,
      category: 'Node.js',
      difficulty: 'Advanced',
      question: 'What are the 6 phases of the Libuv Event Loop in sequential order?',
      options: [
        { id: 'A', text: 'Poll, Timers, Check, Close, Idle, Pending' },
        { id: 'B', text: 'Timers ➔ Pending Callbacks ➔ Idle/Prepare ➔ Poll ➔ Check ➔ Close Callbacks' },
        { id: 'C', text: 'Check ➔ Poll ➔ Timers ➔ Microtasks ➔ Close ➔ Open' },
        { id: 'D', text: 'DNS ➔ TCP ➔ TLS ➔ HTTP ➔ Response ➔ Log' }
      ],
      correct: 'B',
      explanation: 'The Libuv event loop processes: 1) Timers (setTimeout/Interval), 2) Pending Callbacks (I/O exceptions), 3) Idle/Prepare, 4) Poll (retrieve I/O events), 5) Check (setImmediate), 6) Close Callbacks.'
    },
    {
      id: 2,
      category: 'Node.js',
      difficulty: 'Intermediate',
      question: 'What is the difference between process.nextTick() and setImmediate()?',
      options: [
        { id: 'A', text: 'setImmediate runs before nextTick.' },
        { id: 'B', text: 'process.nextTick() executes immediately after the current operation before the event loop phase advances; setImmediate() runs in the Check phase.' },
        { id: 'C', text: 'process.nextTick() only runs on Windows operating systems.' },
        { id: 'D', text: 'They are identical.' }
      ],
      correct: 'B',
      explanation: 'process.nextTick is not technically part of the Libuv event loop; it runs in the microtask queue immediately after the current operation completes, before the event loop continues to any other phase.'
    },
    {
      id: 3,
      category: 'Node.js',
      difficulty: 'Advanced',
      question: 'How do Worker Threads differ from Child Processes in Node.js?',
      options: [
        { id: 'A', text: 'Child processes share RAM; worker threads do not.' },
        { id: 'B', text: 'Worker threads share memory within the same OS process via SharedArrayBuffer; child processes have separate memory spaces and communicate via IPC.' },
        { id: 'C', text: 'Worker threads can only run Python code.' },
        { id: 'D', text: 'Child processes cannot be spawned on Linux.' }
      ],
      correct: 'B',
      explanation: 'Worker threads run in the same process and can share memory (SharedArrayBuffer) with low overhead, ideal for CPU-intensive tasks. Child processes are separate OS processes with isolated memory.'
    },
    {
      id: 4,
      category: 'Node.js',
      difficulty: 'Intermediate',
      question: 'What is the Buffer class used for in Node.js?',
      options: [
        { id: 'A', text: 'Buffering video frames on YouTube.' },
        { id: 'B', text: 'Handling raw binary data directly in memory allocated outside the V8 JavaScript heap.' },
        { id: 'C', text: 'Storing database passwords.' },
        { id: 'D', text: 'Creating HTTP proxies.' }
      ],
      correct: 'B',
      explanation: 'Buffers represent fixed-size chunks of raw binary data allocated outside the V8 heap directly in C++ memory, essential for handling TCP streams, file system I/O, and cryptography.'
    },
    {
      id: 5,
      category: 'Express.js',
      difficulty: 'Intermediate',
      question: 'How does Express distinguish an Error-Handling middleware from standard route middleware?',
      options: [
        { id: 'A', text: 'By prefixing the function name with "error".' },
        { id: 'B', text: 'By defining an exact 4-parameter function signature: (err, req, res, next).' },
        { id: 'C', text: 'By passing { isError: true } in the app.use() options.' },
        { id: 'D', text: 'Express does not have built-in error middleware.' }
      ],
      correct: 'B',
      explanation: 'Express inspects function.length. When a middleware defines exactly 4 arguments: (err, req, res, next), Express treats it as an error-handling middleware and routes errors to it.'
    },
    {
      id: 6,
      category: 'Node.js',
      difficulty: 'Intermediate',
      question: 'What happens when an unhandled Promise rejection occurs in Node.js v16+?',
      options: [
        { id: 'A', text: 'It is silently ignored.' },
        { id: 'B', text: 'The Node.js process terminates with an UnhandledPromiseRejection error and a non-zero exit code.' },
        { id: 'C', text: 'Node restarts automatically without notifying logs.' },
        { id: 'D', text: 'It converts the error into a warning.' }
      ],
      correct: 'B',
      explanation: 'In modern Node.js, unhandled promise rejections trigger the unhandledRejection event and immediately terminate the Node process to prevent corrupt application state.'
    },
    {
      id: 7,
      category: 'Node.js',
      difficulty: 'Advanced',
      question: 'How does the Node.js Cluster module achieve multi-core scaling?',
      options: [
        { id: 'A', text: 'It creates multiple V8 isolates in a single thread.' },
        { id: 'B', text: 'The master process spawns worker processes (one per CPU core) that share the same server port using round-robin socket distribution.' },
        { id: 'C', text: 'It distributes requests to external cloud lambdas.' },
        { id: 'D', text: 'It compiles JavaScript into multi-threaded assembly.' }
      ],
      correct: 'B',
      explanation: 'Cluster creates child processes that share server ports. The master process accepts incoming TCP connections and distributes them to workers across available CPU cores.'
    },
    {
      id: 8,
      category: 'Express.js',
      difficulty: 'Intermediate',
      question: 'What is the purpose of the CORS (Cross-Origin Resource Sharing) middleware in an Express REST API?',
      options: [
        { id: 'A', text: 'To compress JSON payloads with gzip.' },
        { id: 'B', text: 'To set HTTP headers (Access-Control-Allow-Origin, etc.) allowing browsers on different domains/ports to access the API.' },
        { id: 'C', text: 'To encrypt database passwords.' },
        { id: 'D', text: 'To speed up SQL queries.' }
      ],
      correct: 'B',
      explanation: 'Browsers enforce Same-Origin Policy. The CORS middleware appends headers such as Access-Control-Allow-Origin to tell browsers that frontend clients on other domains are allowed to read responses.'
    },
    {
      id: 9,
      category: 'Node.js',
      difficulty: 'Intermediate',
      question: 'Why should CPU-bound tasks (e.g. video transcoding, heavy hashing) not be run synchronously on the main Node.js thread?',
      options: [
        { id: 'A', text: 'Because CPU tasks will run out of hard drive space.' },
        { id: 'B', text: 'Because they block the single execution thread, freezing the event loop and delaying all concurrent HTTP client requests.' },
        { id: 'C', text: 'Because Node.js only runs on 32-bit CPUs.' },
        { id: 'D', text: 'Because Linux kills CPU processes automatically.' }
      ],
      correct: 'B',
      explanation: 'Because Node.js executes JavaScript on a single thread, any heavy synchronous CPU computation monopolizes that thread, preventing the event loop from servicing any other network requests.'
    },
    {
      id: 10,
      category: 'Express.js',
      difficulty: 'Intermediate',
      question: 'What is the difference between req.params and req.query in Express?',
      options: [
        { id: 'A', text: 'req.params is for POST requests; req.query is for GET requests.' },
        { id: 'B', text: 'req.params extracts route path placeholders like /users/:id; req.query parses URL query strings like ?search=react&page=2.' },
        { id: 'C', text: 'req.query extracts cookies; req.params extracts headers.' },
        { id: 'D', text: 'There is no difference.' }
      ],
      correct: 'B',
      explanation: 'req.params contains route parameters matched by URL pattern (e.g. `/users/:id`), whereas req.query contains parsed key-value pairs from the URL search string after the `?` character.'
    },
    {
      id: 11,
      category: 'Security',
      difficulty: 'Advanced',
      question: 'Why should bcrypt or Argon2 be used for storing passwords in Node.js instead of SHA-256 or MD5?',
      options: [
        { id: 'A', text: 'SHA-256 is not supported in Node.js.' },
        { id: 'B', text: 'SHA-256 is fast by design, making it vulnerable to GPU brute-force attacks; bcrypt is intentionally slow and incorporates automatic salt generation and work factors.' },
        { id: 'C', text: 'bcrypt compresses passwords into 4 bytes.' },
        { id: 'D', text: 'MD5 is an asymmetric encryption algorithm.' }
      ],
      correct: 'B',
      explanation: 'General-purpose cryptographic hashes like SHA-256 can be computed billions of times per second on GPUs. bcrypt introduces a configurable work factor and salt to make brute-forcing computationally prohibitive.'
    },
    {
      id: 12,
      category: 'Node.js',
      difficulty: 'Intermediate',
      question: 'What does stream.pipeline() do in Node.js compared to readable.pipe()?',
      options: [
        { id: 'A', text: 'pipeline() is used only for audio files.' },
        { id: 'B', text: 'pipeline() automatically cleans up all streams and properly forwards errors to a callback or promise, preventing memory leaks if a stream fails.' },
        { id: 'C', text: 'pipe() is faster than pipeline().' },
        { id: 'D', text: 'pipeline() destroys the source file on disk.' }
      ],
      correct: 'B',
      explanation: 'While pipe() forwards data, it does not properly destroy intermediate streams if an error occurs mid-stream. stream.pipeline() safely manages stream lifecycles, error propagation, and destruction.'
    },
    {
      id: 13,
      category: 'Node.js',
      difficulty: 'Intermediate',
      question: 'How do you implement graceful shutdown on a Node.js server?',
      options: [
        { id: 'A', text: 'Call process.exit(0) immediately when the user disconnects.' },
        { id: 'B', text: 'Listen for SIGTERM/SIGINT signals, close the HTTP server to stop accepting new connections, wait for active requests to finish, close DB pools, and exit cleanly.' },
        { id: 'C', text: 'Delete the node_modules folder before closing.' },
        { id: 'D', text: 'Restart the operating system.' }
      ],
      correct: 'B',
      explanation: 'Graceful shutdown stops receiving new traffic via server.close(), allows in-flight requests to complete, flushes logs and closes database connection pools before exiting with code 0.'
    },
    {
      id: 14,
      category: 'Express.js',
      difficulty: 'Intermediate',
      question: 'Why must body-parser or express.json() be placed before route handlers in Express?',
      options: [
        { id: 'A', text: 'Because Express throws a syntax error otherwise.' },
        { id: 'B', text: 'Middleware executes in registration order; express.json() must parse the incoming request body buffer into req.body before route handlers attempt to read it.' },
        { id: 'C', text: 'It is required to enable CORS.' },
        { id: 'D', text: 'To enable HTTPS certificates.' }
      ],
      correct: 'B',
      explanation: 'Express middleware runs sequentially. If express.json() is mounted after route handlers, `req.body` will be undefined when the route handler tries to read POST/PUT payload data.'
    },
    {
      id: 15,
      category: 'Node.js',
      difficulty: 'Advanced',
      question: 'What is the default UV_THREADPOOL_SIZE in Node.js and what operations utilize it?',
      options: [
        { id: 'A', text: 'Default is 1; handles all HTTP socket requests.' },
        { id: 'B', text: 'Default is 4; handles file system I/O (fs), crypto operations (pbkdf2), DNS lookups (dns.lookup), and zlib compression.' },
        { id: 'C', text: 'Default is 128; handles console.log calls.' },
        { id: 'D', text: 'Node does not use a thread pool.' }
      ],
      correct: 'B',
      explanation: 'Libuv provides a worker thread pool (default size 4, configurable up to 1024) for asynchronous tasks that the OS cannot handle via non-blocking epoll/kqueue (such as fs calls, crypto, and zlib).'
    }
  ],

  mongodb: [
    {
      id: 1,
      category: 'MongoDB',
      difficulty: 'Intermediate',
      question: 'What is the default storage engine used by modern MongoDB?',
      options: [
        { id: 'A', text: 'InnoDB' },
        { id: 'B', text: 'WiredTiger' },
        { id: 'C', text: 'MMAPv1' },
        { id: 'D', text: 'RocksDB' }
      ],
      correct: 'B',
      explanation: 'MongoDB has used WiredTiger as its default storage engine since v3.2, offering document-level concurrency control, compression (Snappy/zlib), and checkpointing.'
    },
    {
      id: 2,
      category: 'MongoDB',
      difficulty: 'Intermediate',
      question: 'What is the maximum BSON document size in MongoDB?',
      options: [
        { id: 'A', text: '4 Megabytes' },
        { id: 'B', text: '16 Megabytes' },
        { id: 'C', text: '64 Megabytes' },
        { id: 'D', text: 'Unlimited' }
      ],
      correct: 'B',
      explanation: 'MongoDB restricts single BSON document sizes to 16MB to prevent excessive RAM utilization and maintain efficient network transfer. Larger binary files use GridFS.'
    },
    {
      id: 3,
      category: 'MongoDB',
      difficulty: 'Advanced',
      question: 'What is a "Covered Query" in MongoDB and why is it high performance?',
      options: [
        { id: 'A', text: 'A query covered by insurance against data corruption.' },
        { id: 'B', text: 'A query where all queried fields and projected fields are contained entirely within an index, so MongoDB does not need to inspect documents on disk.' },
        { id: 'C', text: 'A query executed across all replica set nodes simultaneously.' },
        { id: 'D', text: 'A query that modifies multiple documents in one write.' }
      ],
      correct: 'B',
      explanation: 'A covered query can be satisfied entirely from index keys without examining the actual documents in storage (totalDocsExamined: 0), providing maximum query throughput.'
    },
    {
      id: 4,
      category: 'MongoDB',
      difficulty: 'Intermediate',
      question: 'What information does cursor.explain("executionStats") provide?',
      options: [
        { id: 'A', text: 'The source code of the MongoDB server.' },
        { id: 'B', text: 'Detailed execution telemetry: index used (IXSCAN vs COLLSCAN), total documents examined, documents returned, and execution time in milliseconds.' },
        { id: 'C', text: 'The list of users connected to the database.' },
        { id: 'D', text: 'The disk sector health.' }
      ],
      correct: 'B',
      explanation: 'explain("executionStats") details whether an index was utilized (IXSCAN) or a full collection scan occurred (COLLSCAN), ratio of keys/docs examined vs returned, and total execution time.'
    },
    {
      id: 5,
      category: 'MongoDB',
      difficulty: 'Advanced',
      question: 'How do Replica Sets differ from Sharded Clusters in MongoDB architecture?',
      options: [
        { id: 'A', text: 'Replica Sets are for testing; Sharding is for production.' },
        { id: 'B', text: 'Replica Sets provide high availability, data redundancy, and automated failover; Sharding provides horizontal data partitioning across machines for high scale.' },
        { id: 'C', text: 'Sharding only works on relational databases.' },
        { id: 'D', text: 'Replica Sets can only hold 100 documents.' }
      ],
      correct: 'B',
      explanation: 'Replica Sets replicate data across a primary and secondary nodes for fault tolerance. Sharded clusters partition collections across multiple shards using a shard key for horizontal capacity.'
    },
    {
      id: 6,
      category: 'MongoDB',
      difficulty: 'Advanced',
      question: 'What does the Write Concern { w: "majority" } guarantee?',
      options: [
        { id: 'A', text: 'The write has been committed by at least 51% of users.' },
        { id: 'B', text: 'The write operation is acknowledged by a calculated majority of voting nodes in the replica set before returning success, preventing rollbacks on failover.' },
        { id: 'C', text: 'The write will be saved directly to tape backup.' },
        { id: 'D', text: 'Writes are executed without locks.' }
      ],
      correct: 'B',
      explanation: '{ w: "majority" } ensures that a write is written to the in-memory journal of a majority of voting replica set members, preventing data loss or rollback if the primary crashes immediately after.'
    },
    {
      id: 7,
      category: 'MongoDB',
      difficulty: 'Intermediate',
      question: 'What is the function of the $lookup aggregation stage?',
      options: [
        { id: 'A', text: 'Looks up words in a dictionary.' },
        { id: 'B', text: 'Performs a left outer join to an external collection in the same database to enrich documents with matching child records.' },
        { id: 'C', text: 'Finds syntax errors in queries.' },
        { id: 'D', text: 'Deletes duplicate documents.' }
      ],
      correct: 'B',
      explanation: '$lookup performs an equality match between a field from input documents and a field from foreign collection documents, appending matching records as an array field (left outer join).'
    },
    {
      id: 8,
      category: 'MongoDB',
      difficulty: 'Intermediate',
      question: 'What is a TTL (Time-To-Live) index in MongoDB?',
      options: [
        { id: 'A', text: 'An index that expires queries after 3 seconds.' },
        { id: 'B', text: 'A single-field index on a date field that automatically deletes documents from a collection after a specified number of seconds.' },
        { id: 'C', text: 'An index used exclusively for financial transactions.' },
        { id: 'D', text: 'A backup index created during maintenance.' }
      ],
      correct: 'B',
      explanation: 'TTL indexes are special single-field indexes that MongoDB uses to automatically delete documents after a specified threshold, ideal for session tokens, cache records, and temporary logs.'
    },
    {
      id: 9,
      category: 'MongoDB',
      difficulty: 'Advanced',
      question: 'Can MongoDB perform multi-document ACID transactions?',
      options: [
        { id: 'A', text: 'No, MongoDB is NoSQL so transactions are impossible.' },
        { id: 'B', text: 'Yes, multi-document ACID transactions have been supported since v4.0 on replica sets and v4.2 on sharded clusters using client sessions.' },
        { id: 'C', text: 'Only on Windows servers.' },
        { id: 'D', text: 'Transactions only work on read operations.' }
      ],
      correct: 'B',
      explanation: 'MongoDB supports full multi-document ACID transactions across replica sets and sharded clusters using session.startTransaction(), session.commitTransaction(), and session.abortTransaction().'
    },
    {
      id: 10,
      category: 'MongoDB',
      difficulty: 'Intermediate',
      question: 'What is the role of the $unwind stage in an Aggregation pipeline?',
      options: [
        { id: 'A', text: 'Rolls back a failed transaction.' },
        { id: 'B', text: 'Deconstructs an array field from the input documents to output a separate document for each element in the array.' },
        { id: 'C', text: 'Compresses documents in memory.' },
        { id: 'D', text: 'Disconnects database clients.' }
      ],
      correct: 'B',
      explanation: '$unwind explodes an array field such that a document containing `items: [A, B]` produces two distinct output documents: one with `items: A` and one with `items: B`.'
    },
    {
      id: 11,
      category: 'MongoDB',
      difficulty: 'Intermediate',
      question: 'Why is creating single-field indexes on low-cardinality boolean fields (e.g. isActive: true/false) often counterproductive?',
      options: [
        { id: 'A', text: 'Because booleans cannot be indexed in BSON.' },
        { id: 'B', text: 'Low cardinality indexes offer poor selectivity; the engine often still examines up to 50% of the collection and incurs index maintenance overhead.' },
        { id: 'C', text: 'Because boolean indexes take up 10GB of memory.' },
        { id: 'D', text: 'WiredTiger deletes boolean indexes automatically.' }
      ],
      correct: 'B',
      explanation: 'Index selectivity is critical. When a field only has 2 possible values (true/false), an index scan still traverses huge portions of the index tree, adding write overhead without speeding up reads.'
    },
    {
      id: 12,
      category: 'MongoDB',
      difficulty: 'Advanced',
      question: 'What is the default RAM limit per aggregation pipeline stage, and how can it be bypassed for massive datasets?',
      options: [
        { id: 'A', text: '1GB limit; bypass by upgrading CPU.' },
        { id: 'B', text: '100MB RAM limit; bypass by passing { allowDiskUse: true } to write temporary data to disk.' },
        { id: 'C', text: '16MB limit; cannot be bypassed.' },
        { id: 'D', text: '512MB limit; bypass by using MapReduce.' }
      ],
      correct: 'B',
      explanation: 'Pipeline stages (like $sort or $group) have a 100MB RAM safety cap. For operations exceeding 100MB, passing `{ allowDiskUse: true }` instructs MongoDB to write spillover data to temporary files on disk.'
    },
    {
      id: 13,
      category: 'MongoDB',
      difficulty: 'Intermediate',
      question: 'What is the difference between an Upsert and a normal Update operation?',
      options: [
        { id: 'A', text: 'Upsert deletes documents after updating.' },
        { id: 'B', text: 'If a document matching the query criteria exists, upsert updates it; if no matching document exists, it inserts a new document.' },
        { id: 'C', text: 'Upsert updates fields in reverse order.' },
        { id: 'D', text: 'Upsert operates only on indexes.' }
      ],
      correct: 'B',
      explanation: 'An upsert (`{ upsert: true }`) is an atomic update-or-insert: if a record is found, it is updated; if no record matches the filter query, a new document containing the filter and update fields is inserted.'
    },
    {
      id: 14,
      category: 'MongoDB',
      difficulty: 'Intermediate',
      question: 'How does MongoDB handle schema validation at the collection level?',
      options: [
        { id: 'A', text: 'MongoDB strictly requires SQL DDL scripts.' },
        { id: 'B', text: 'Using JSON Schema validation defined in collection options with validator: { $jsonSchema: { ... } }.' },
        { id: 'C', text: 'By scanning text files in the project root.' },
        { id: 'D', text: 'MongoDB does not support schema validation.' }
      ],
      correct: 'B',
      explanation: 'MongoDB provides native collection-level schema validation via `$jsonSchema`, enforcing data types, required fields, and value constraints on insert and update operations.'
    },
    {
      id: 15,
      category: 'MongoDB',
      difficulty: 'Advanced',
      question: 'Under the CAP Theorem, how does a standard MongoDB Replica Set classify?',
      options: [
        { id: 'A', text: 'AP (Available and Partition-tolerant)' },
        { id: 'B', text: 'CP (Consistent and Partition-tolerant by default; during primary election, writes are temporarily unavailable until a new primary is elected)' },
        { id: 'C', text: 'CA (Consistent and Available without partitions)' },
        { id: 'D', text: 'It violates the CAP theorem.' }
      ],
      correct: 'B',
      explanation: 'MongoDB prioritizes Consistency and Partition Tolerance (CP). If network partition occurs, secondaries cannot accept writes and election takes place, temporarily sacrificing write availability for consistency.'
    }
  ],

  javascript: [
    {
      id: 1,
      category: 'JavaScript',
      difficulty: 'Beginner',
      question: 'What is the difference between == and === operators in JavaScript?',
      options: [
        { id: 'A', text: '== is used for assignment, === is used for comparison.' },
        { id: 'B', text: '== performs type coercion before comparison; === checks both value and type strictly without coercion.' },
        { id: 'C', text: '=== only compares numbers.' },
        { id: 'D', text: 'There is no difference.' }
      ],
      correct: 'B',
      explanation: '`==` converts operands to a common type before comparing (e.g. `"5" == 5` is true), while `===` checks strict identity without type conversion (e.g. `"5" === 5` is false).'
    },
    {
      id: 2,
      category: 'JavaScript',
      difficulty: 'Intermediate',
      question: 'What is the Temporal Dead Zone (TDZ) in JavaScript?',
      options: [
        { id: 'A', text: 'A time zone setting in the Date object.' },
        { id: 'B', text: 'The region of code between the start of block scope and the variable declaration with let/const where accessing the variable throws ReferenceError.' },
        { id: 'C', text: 'The time taken by an asynchronous HTTP request.' },
        { id: 'D', text: 'A memory leak caused by un-cleared intervals.' }
      ],
      correct: 'B',
      explanation: 'Variables declared with let and const are hoisted but remain uninitialized until their definition is evaluated. Accessing them before declaration produces a ReferenceError (the Temporal Dead Zone).'
    },
    {
      id: 3,
      category: 'JavaScript',
      difficulty: 'Intermediate',
      question: 'How does the "this" keyword behave inside an arrow function compared to a regular function?',
      options: [
        { id: 'A', text: 'Arrow functions bind "this" to the DOM window always.' },
        { id: 'B', text: 'Arrow functions do not have their own "this"; they lexically inherit "this" from their enclosing execution context.' },
        { id: 'C', text: 'Regular functions cannot access "this".' },
        { id: 'D', text: 'Arrow functions throw an error if "this" is referenced.' }
      ],
      correct: 'B',
      explanation: 'Arrow functions lack their own `this` binding, `arguments` object, and `super`. They retain the `this` value of the enclosing lexical scope at the time they are created.'
    },
    {
      id: 4,
      category: 'TypeScript',
      difficulty: 'Intermediate',
      question: 'What is the difference between "type" and "interface" in TypeScript?',
      options: [
        { id: 'A', text: 'Types can only be used with numbers; interfaces are for strings.' },
        { id: 'B', text: 'Interfaces can be extended via declaration merging; types can model unions, primitives, and mapped types directly.' },
        { id: 'C', text: 'Interfaces exist in production JavaScript bundle; types are deleted.' },
        { id: 'D', text: 'Interfaces cannot describe object shapes.' }
      ],
      correct: 'B',
      explanation: 'Interfaces support declaration merging (multiple interface definitions with the same name merge their properties) and are ideal for OOP contracts. Type aliases can represent unions (`A | B`), intersections, and primitive aliases.'
    },
    {
      id: 5,
      category: 'TypeScript',
      difficulty: 'Advanced',
      question: 'What is the difference between "any" and "unknown" in TypeScript?',
      options: [
        { id: 'A', text: 'unknown disables all type checking; any enforces strict types.' },
        { id: 'B', text: 'unknown is the type-safe counterpart of any; you cannot perform operations on an unknown variable without performing type narrowing or assertion first.' },
        { id: 'C', text: 'any can only be assigned to null.' },
        { id: 'D', text: 'unknown is converted to string at runtime.' }
      ],
      correct: 'B',
      explanation: 'With `any`, TypeScript permits any method call or property access without checking. With `unknown`, TypeScript forces developers to narrow the type (e.g. `typeof x === "string"`) before invoking properties.'
    },
    {
      id: 6,
      category: 'JavaScript',
      difficulty: 'Intermediate',
      question: 'What is Prototypal Inheritance in JavaScript?',
      options: [
        { id: 'A', text: 'Creating copies of classes using classical C++ syntax.' },
        { id: 'B', text: 'An object-based inheritance model where objects have an internal [[Prototype]] link pointing to another object from which they inherit properties and methods.' },
        { id: 'C', text: 'Copying HTML prototype templates into the DOM.' },
        { id: 'D', text: 'A method for inheriting CSS styles.' }
      ],
      correct: 'B',
      explanation: 'Every JavaScript object has an internal link to a prototype object. When accessing a property not present on the object itself, JavaScript traverses up the prototype chain until found or null is reached.'
    },
    {
      id: 7,
      category: 'JavaScript',
      difficulty: 'Advanced',
      question: 'What is the primary Garbage Collection algorithm used in modern V8 / JavaScript engines?',
      options: [
        { id: 'A', text: 'Reference Counting only.' },
        { id: 'B', text: 'Generational Mark-and-Sweep (Scavenger for young generation, Full Mark-Sweep-Compact for old generation).' },
        { id: 'C', text: 'Manual memory freeing via delete operator.' },
        { id: 'D', text: 'Round Robin allocation.' }
      ],
      correct: 'B',
      explanation: 'V8 uses generational garbage collection: objects start in the Nursery/Young generation where Scavenge collector rapidly clears short-lived allocations, while long-lived objects promote to Old space and undergo Mark-Sweep-Compact.'
    },
    {
      id: 8,
      category: 'JavaScript',
      difficulty: 'Intermediate',
      question: 'What is a Higher-Order Function in JavaScript?',
      options: [
        { id: 'A', text: 'A function that runs faster than normal functions.' },
        { id: 'B', text: 'A function that takes one or more functions as arguments, returns a function, or both (e.g. map, filter, reduce).' },
        { id: 'C', text: 'A mathematical trigonometric function.' },
        { id: 'D', text: 'A function declared at the very top of a file.' }
      ],
      correct: 'B',
      explanation: 'Functions are first-class citizens in JavaScript. A higher-order function is any function that accepts other functions as arguments (callbacks) or returns a function as its output.'
    },
    {
      id: 9,
      category: 'JavaScript',
      difficulty: 'Intermediate',
      question: 'What is Currying in JavaScript?',
      options: [
        { id: 'A', text: 'Cooking up random numbers.' },
        { id: 'B', text: 'Translating a function that takes multiple arguments into a sequence of functions that each take a single argument: f(a, b, c) ➔ f(a)(b)(c).' },
        { id: 'C', text: 'Concatenating strings using template literals.' },
        { id: 'D', text: 'Catching unhandled errors in async functions.' }
      ],
      correct: 'B',
      explanation: 'Currying transforms a multi-argument function into a nested unary chain: instead of `add(1, 2)`, currying allows `add(1)(2)`, enabling partial application of arguments.'
    },
    {
      id: 10,
      category: 'JavaScript',
      difficulty: 'Intermediate',
      question: 'What is the difference between Object.freeze() and Object.seal()?',
      options: [
        { id: 'A', text: 'freeze only works on strings; seal works on numbers.' },
        { id: 'B', text: 'Object.freeze() prevents additions, deletions, and makes all properties read-only; Object.seal() prevents additions and deletions but still allows modifying existing writable property values.' },
        { id: 'C', text: 'Object.seal() encrypts objects.' },
        { id: 'D', text: 'They are identical.' }
      ],
      correct: 'B',
      explanation: 'Both methods prevent adding or removing keys. However, `seal` allows modifying values of existing writable properties, whereas `freeze` makes all existing properties immutable (read-only).'
    },
    {
      id: 11,
      category: 'JavaScript',
      difficulty: 'Intermediate',
      question: 'What are Event Bubbling and Event Capturing in the DOM?',
      options: [
        { id: 'A', text: 'Methods for styling buttons with CSS animations.' },
        { id: 'B', text: 'Event Capturing travels down from the Window to the target element; Event Bubbling propagates upward from the target element back to the Window.' },
        { id: 'C', text: 'Bubbling is an error; capturing is a success.' },
        { id: 'D', text: 'They only occur on touch screen devices.' }
      ],
      correct: 'B',
      explanation: 'DOM event propagation has two main phases: Capturing (trickling down from root to target) followed by Bubbling (percolating upward from target to root). Most listeners trigger during the bubbling phase.'
    },
    {
      id: 12,
      category: 'TypeScript',
      difficulty: 'Intermediate',
      question: 'What do TypeScript Utility types Partial<T> and Pick<T, K> do?',
      options: [
        { id: 'A', text: 'Partial deletes types; Pick creates arrays.' },
        { id: 'B', text: 'Partial<T> makes all properties in T optional; Pick<T, K> creates a new type containing only the specified set of keys K from T.' },
        { id: 'C', text: 'They convert TypeScript into JSON.' },
        { id: 'D', text: 'They are only used in Angular.' }
      ],
      correct: 'B',
      explanation: '`Partial<T>` constructs a type with all properties of T set to optional (`?`). `Pick<T, K>` constructs a type by picking the set of properties `K` (keys) from `T`.'
    },
    {
      id: 13,
      category: 'JavaScript',
      difficulty: 'Advanced',
      question: 'Why should WeakMap be used for private object metadata instead of Map?',
      options: [
        { id: 'A', text: 'WeakMap values are compressed.' },
        { id: 'B', text: 'WeakMap holds weak references to its object keys; when the key object has no other references, it is eligible for garbage collection, preventing memory leaks.' },
        { id: 'C', text: 'WeakMap supports primitive strings as keys.' },
        { id: 'D', text: 'WeakMap is synchronous; Map is asynchronous.' }
      ],
      correct: 'B',
      explanation: 'A regular `Map` prevents key objects from being garbage collected. `WeakMap` maintains weak references: if the key object is deleted elsewhere, the key-value entry is automatically cleaned up by garbage collection.'
    },
    {
      id: 14,
      category: 'JavaScript',
      difficulty: 'Intermediate',
      question: 'What does the bind() method do to a function?',
      options: [
        { id: 'A', text: 'Executes the function immediately with given arguments.' },
        { id: 'B', text: 'Returns a new function with its "this" context permanently bound to the provided object and optionally prepends initial arguments.' },
        { id: 'C', text: 'Binds a function to a database query.' },
        { id: 'D', text: 'Encrypts the function code.' }
      ],
      correct: 'B',
      explanation: 'Unlike `call` or `apply` which invoke the function immediately, `bind()` creates and returns a new function with a fixed `this` value and optional preset arguments for later invocation.'
    },
    {
      id: 15,
      category: 'TypeScript',
      difficulty: 'Advanced',
      question: 'What is Type Narrowing in TypeScript?',
      options: [
        { id: 'A', text: 'Compressing TypeScript code to fewer lines.' },
        { id: 'B', text: 'Refining an expression from a broader type (e.g. string | number) to a more specific type using control flow checks like typeof, instanceof, or in.' },
        { id: 'C', text: 'Converting types into enums.' },
        { id: 'D', text: 'Reducing compiler memory usage.' }
      ],
      correct: 'B',
      explanation: 'Type narrowing occurs when TypeScript analyzes conditional control flow checks (like `typeof x === "string"` or `if ("admin" in user)`) to specialize a broad union into a precise type within that branch.'
    }
  ],

  'system-design': [
    {
      id: 1,
      category: 'Architecture',
      difficulty: 'Intermediate',
      question: 'What is the fundamental difference between Vertical Scaling and Horizontal Scaling?',
      options: [
        { id: 'A', text: 'Vertical is for frontend; horizontal is for backend.' },
        { id: 'B', text: 'Vertical scaling increases CPU/RAM resources on a single machine; horizontal scaling adds more server machines to distribute load across a cluster.' },
        { id: 'C', text: 'Horizontal scaling is impossible on AWS or cloud providers.' },
        { id: 'D', text: 'Vertical scaling requires Kubernetes.' }
      ],
      correct: 'B',
      explanation: 'Scaling up (vertical) upgrades hardware specifications of an existing server until hitting physical hardware limits. Scaling out (horizontal) distributes network traffic across multiple nodes behind a load balancer.'
    },
    {
      id: 2,
      category: 'Architecture',
      difficulty: 'Intermediate',
      question: 'What is the role of a Reverse Proxy (e.g. Nginx, Envoy)?',
      options: [
        { id: 'A', text: 'It connects internal company laptops to external websites.' },
        { id: 'B', text: 'It sits in front of web servers to handle client requests, providing SSL termination, load balancing, compression, and request routing.' },
        { id: 'C', text: 'It replaces the database storage layer.' },
        { id: 'D', text: 'It scans user hard drives for malware.' }
      ],
      correct: 'B',
      explanation: 'A reverse proxy intercepts incoming requests from clients before they reach backend application servers, abstracting internal topology, terminating HTTPS, caching responses, and balancing traffic.'
    },
    {
      id: 3,
      category: 'Caching',
      difficulty: 'Advanced',
      question: 'What is the Cache Stampede (Thundering Herd) problem and how is it mitigated?',
      options: [
        { id: 'A', text: 'When the Redis server hard drive crashes.' },
        { id: 'B', text: 'When a popular cache key expires and thousands of concurrent requests all hit the primary database simultaneously; mitigated with mutex locks or probabilistic early recomputation.' },
        { id: 'C', text: 'When CSS styles fail to load in the browser.' },
        { id: 'D', text: 'When users submit invalid passwords.' }
      ],
      correct: 'B',
      explanation: 'When a hot cache key expires, thousands of concurrent requests miss the cache and overwhelm the underlying database at the same instant. Solutions include mutex locks (only 1 thread recomputes) and XFetch.'
    },
    {
      id: 4,
      category: 'API Design',
      difficulty: 'Intermediate',
      question: 'Why are Idempotency Keys critical in financial and payment processing REST APIs?',
      options: [
        { id: 'A', text: 'They encrypt credit card numbers.' },
        { id: 'B', text: 'They allow clients to safely retry network requests without risk of charging a customer twice if an initial request timed out.' },
        { id: 'C', text: 'They reduce database storage size by 50%.' },
        { id: 'D', text: 'They are required by the ISO 9001 standard.' }
      ],
      correct: 'B',
      explanation: 'If a payment request times out, the client does not know if the charge succeeded. Resending with the same Idempotency Key guarantees that the server identifies the duplicate request and returns the original result without re-charging.'
    },
    {
      id: 5,
      category: 'Architecture',
      difficulty: 'Intermediate',
      question: 'What is the Token Bucket algorithm used for in API Gateways?',
      options: [
        { id: 'A', text: 'Parsing JWT tokens.' },
        { id: 'B', text: 'Rate limiting incoming requests by adding tokens to a bucket at a constant rate and allowing bursts up to bucket capacity.' },
        { id: 'C', text: 'Hashing user passwords.' },
        { id: 'D', text: 'Balancing WebSocket socket connections.' }
      ],
      correct: 'B',
      explanation: 'The Token Bucket algorithm regulates traffic: tokens refill at a steady rate up to bucket capacity. Each request consumes a token; if the bucket is empty, requests are rejected with HTTP 429 Too Many Requests.'
    },
    {
      id: 6,
      category: 'Databases',
      difficulty: 'Advanced',
      question: 'What is Database Connection Pooling and why is it mandatory in production?',
      options: [
        { id: 'A', text: 'Merging multiple database tables into one file.' },
        { id: 'B', text: 'Maintaining a cache of active database connections to avoid the heavy latency and CPU cost of opening a new TCP + TLS handshake for every incoming request.' },
        { id: 'C', text: 'A cooling system for server racks.' },
        { id: 'D', text: 'A method for backing up SQL databases.' }
      ],
      correct: 'B',
      explanation: 'Establishing a database connection involves TCP three-way handshakes, TLS negotiation, and authentication. A connection pool keeps a set of warm connections ready for reuse across web requests.'
    },
    {
      id: 7,
      category: 'Architecture',
      difficulty: 'Advanced',
      question: 'What is Consistent Hashing and why is it preferred for distributed caching (e.g. Memcached, DynamoDB)?',
      options: [
        { id: 'A', text: 'A hash algorithm that always returns the number 42.' },
        { id: 'B', text: 'A distributed hashing scheme that maps keys and nodes to a circular hash ring; when a server node is added or removed, only K/N keys need to be remapped.' },
        { id: 'C', text: 'A protocol for mining Bitcoin.' },
        { id: 'D', text: 'A method for compressing JSON files.' }
      ],
      correct: 'B',
      explanation: 'Traditional modulo hashing (`hash(key) % N`) causes almost all keys to remap when the number of servers `N` changes. Consistent hashing maps keys onto a circle so adding or removing a node only impacts adjacent keys.'
    },
    {
      id: 8,
      category: 'Messaging',
      difficulty: 'Intermediate',
      question: 'What is the role of an Asynchronous Message Queue (e.g. RabbitMQ, Kafka, SQS) in distributed systems?',
      options: [
        { id: 'A', text: 'To display notifications on the user screen.' },
        { id: 'B', text: 'To decouple producers from consumers, buffer traffic spikes, and process background tasks without blocking client HTTP responses.' },
        { id: 'C', text: 'To replace relational database indexes.' },
        { id: 'D', text: 'To format log outputs in terminal.' }
      ],
      correct: 'B',
      explanation: 'Message queues allow microservices to communicate asynchronously. Producers publish tasks (e.g. send email, generate invoice) and respond immediately, while background worker consumers process tasks at their own pace.'
    },
    {
      id: 9,
      category: 'Resilience',
      difficulty: 'Advanced',
      question: 'What is the Circuit Breaker pattern in microservices architecture?',
      options: [
        { id: 'A', text: 'A physical fuse on a server power supply.' },
        { id: 'B', text: 'A software pattern that detects failures and trips open to fail-fast, preventing cascading failures across dependent downstream services when a dependency is down.' },
        { id: 'C', text: 'A mechanism to disconnect slow users.' },
        { id: 'D', text: 'A firewall rule blocking DDoS traffic.' }
      ],
      correct: 'B',
      explanation: 'When a downstream service fails repeatedly, the circuit breaker "trips open", returning immediate errors or fallback data instead of waiting for timeouts, allowing the failing service time to recover.'
    },
    {
      id: 10,
      category: 'Security',
      difficulty: 'Intermediate',
      question: 'What is Cross-Site Request Forgery (CSRF) and how is it mitigated?',
      options: [
        { id: 'A', text: 'Stealing hard drives from server centers.' },
        { id: 'B', text: 'An attack where an unauthorized site tricks an authenticated user\'s browser into submitting malicious requests; mitigated with SameSite=Strict cookies and anti-CSRF tokens.' },
        { id: 'C', text: 'Injecting SQL statements into URL parameters.' },
        { id: 'D', text: 'Cracking passwords using dictionary lists.' }
      ],
      correct: 'B',
      explanation: 'CSRF exploits the browser\'s behavior of automatically attaching cookies to cross-origin requests. Mitigations include setting `SameSite=Lax/Strict` on cookies and validating unpredictable CSRF challenge tokens.'
    },
    {
      id: 11,
      category: 'API Protocols',
      difficulty: 'Intermediate',
      question: 'How does WebSockets differ from standard HTTP/1.1 for real-time applications?',
      options: [
        { id: 'A', text: 'WebSockets can only transmit text; HTTP transmits images.' },
        { id: 'B', text: 'HTTP is request-response and unidirectional; WebSockets establish a persistent, bidirectional full-duplex TCP connection with low frame overhead.' },
        { id: 'C', text: 'WebSockets do not use IP addresses.' },
        { id: 'D', text: 'HTTP is deprecated.' }
      ],
      correct: 'B',
      explanation: 'HTTP requires a new request for every message with full header overhead. WebSockets upgrade a single HTTP connection into a persistent, bidirectional connection where both client and server can push messages instantly.'
    },
    {
      id: 12,
      category: 'Databases',
      difficulty: 'Advanced',
      question: 'What is Database Sharding and what makes choosing a Shard Key critical?',
      options: [
        { id: 'A', text: 'Deleting old records from SQL tables.' },
        { id: 'B', text: 'Horizontally partitioning database data across physical nodes; a poor shard key causes hotspotting where all traffic hits a single node.' },
        { id: 'C', text: 'Encrypting database columns.' },
        { id: 'D', text: 'Backing up databases to multiple hard drives.' }
      ],
      correct: 'B',
      explanation: 'Sharding splits a huge dataset across multiple database instances. A poor shard key (like monotonic timestamp) routes all new writes to the same shard (hotspotting), defeating the purpose of horizontal scaling.'
    },
    {
      id: 13,
      category: 'Architecture',
      difficulty: 'Intermediate',
      question: 'What is the difference between Load Balancing algorithms: Round Robin vs Least Connections?',
      options: [
        { id: 'A', text: 'Round Robin is for UDP; Least Connections is for TCP.' },
        { id: 'B', text: 'Round Robin rotates requests sequentially across servers; Least Connections directs new requests to the server with the fewest active concurrent connections.' },
        { id: 'C', text: 'Least Connections always sends traffic to the master database.' },
        { id: 'D', text: 'Round Robin is only used on single-core computers.' }
      ],
      correct: 'B',
      explanation: 'Round Robin distributes requests evenly in sequence regardless of request processing duration. Least Connections factors in server load, making it superior when request execution times vary widely.'
    },
    {
      id: 14,
      category: 'Databases',
      difficulty: 'Advanced',
      question: 'What is the Write-Ahead Log (WAL) or Journal in database systems?',
      options: [
        { id: 'A', text: 'A log of user comments on social media.' },
        { id: 'B', text: 'An append-only log on disk where modifications are committed before changes are applied to in-memory pages, guaranteeing Durability on crash recovery.' },
        { id: 'C', text: 'A file containing SQL query history.' },
        { id: 'D', text: 'A diagnostic report sent to the cloud.' }
      ],
      correct: 'B',
      explanation: 'To ensure ACID Durability without incurring random disk write latency on every transaction, databases append changes sequentially to the WAL first. In a crash, uncommitted memory buffers are reconstructed from the WAL.'
    },
    {
      id: 15,
      category: 'Architecture',
      difficulty: 'Intermediate',
      question: 'What is the purpose of Content Delivery Networks (CDNs) like Cloudflare or AWS CloudFront?',
      options: [
        { id: 'A', text: 'To host Node.js backend databases.' },
        { id: 'B', text: 'To cache static assets (images, JS, CSS, video) on edge servers geographically close to users, dramatically reducing latency and origin server bandwidth.' },
        { id: 'C', text: 'To convert HTTP requests to SQL queries.' },
        { id: 'D', text: 'To compile React applications on the server.' }
      ],
      correct: 'B',
      explanation: 'CDNs maintain geographically distributed edge servers (Points of Presence). When a user requests assets, the nearest edge node responds from cache, slashing round-trip latency and offloading origin servers.'
    }
  ],
  tailwind: [
    {
      id: 1,
      category: 'CSS Architecture',
      difficulty: 'Intermediate',
      question: 'What is the primary architectural advantage of Tailwind CSS utility-first classes over traditional BEM methodology?',
      options: [
        { id: 'A', text: 'Tailwind eliminates the need for any HTML files.' },
        { id: 'B', text: 'It prevents stylesheet bloat because utility classes are heavily reused and the JIT compiler only generates CSS that is actually referenced.' },
        { id: 'C', text: 'It automatically translates CSS into WebAssembly.' },
        { id: 'D', text: 'It runs CSS rules on the backend Node.js server.' }
      ],
      correct: 'B',
      explanation: 'Traditional stylesheets grow monotonically as features expand. Tailwind utility classes are reusable primitives, meaning stylesheet size plateaus even as applications grow to thousands of pages.'
    },
    {
      id: 2,
      category: 'CSS Box Model',
      difficulty: 'Beginner',
      question: 'In the CSS box model, how does box-sizing: border-box (box-border in Tailwind) alter element width calculations?',
      options: [
        { id: 'A', text: 'Width only includes the margin.' },
        { id: 'B', text: 'Width includes content, padding, and border, ensuring padding does not expand the total rendered element width.' },
        { id: 'C', text: 'Width is calculated based on screen resolution.' },
        { id: 'D', text: 'Padding and border are completely ignored and never rendered.' }
      ],
      correct: 'B',
      explanation: 'With border-box, padding and border values are absorbed within the specified width and height rather than added to them, eliminating layout calculation bugs.'
    },
    {
      id: 3,
      category: 'Flexbox Layout',
      difficulty: 'Intermediate',
      question: 'In Flexbox, what is the key difference between justify-content and align-items?',
      options: [
        { id: 'A', text: 'justify-content aligns along the main axis, while align-items aligns along the cross axis.' },
        { id: 'B', text: 'justify-content only works on text, align-items only works on images.' },
        { id: 'C', text: 'justify-content applies to parent containers, align-items applies only to children.' },
        { id: 'D', text: 'They are interchangeable aliases in modern browsers.' }
      ],
      correct: 'A',
      explanation: 'In Flexbox, justify-content controls item distribution along the main axis (row by default), while align-items controls distribution along the perpendicular cross axis.'
    },
    {
      id: 4,
      category: 'Responsive Design',
      difficulty: 'Intermediate',
      question: 'How do breakpoint prefixes (e.g., md:, lg:) work by default in Tailwind CSS?',
      options: [
        { id: 'A', text: 'Desktop-first with max-width media queries.' },
        { id: 'B', text: 'Mobile-first using min-width media queries (e.g. md: applies to screen width >= 768px).' },
        { id: 'C', text: 'Device-specific user agent sniffing.' },
        { id: 'D', text: 'CSS container queries only.' }
      ],
      correct: 'B',
      explanation: 'Tailwind adopts a mobile-first philosophy: unprefixed utilities apply across all screen sizes, while breakpoint modifiers (md:, lg:) enforce min-width media queries that override defaults on wider viewports.'
    },
    {
      id: 5,
      category: 'CSS Specificity',
      difficulty: 'Advanced',
      question: 'When two conflicting CSS rules target the same DOM element, how is specificity resolved?',
      options: [
        { id: 'A', text: 'Inline styles > IDs > Classes/Attributes/Pseudo-classes > Elements/Pseudo-elements.' },
        { id: 'B', text: 'Alphabetical order of selector names.' },
        { id: 'C', text: 'The rule with the shortest class name always wins.' },
        { id: 'D', text: 'Elements always beat IDs in modern CSS.' }
      ],
      correct: 'A',
      explanation: 'CSS specificity follows a strict hierarchy: inline styles (1000) > IDs (100) > classes, attributes, pseudo-classes (10) > elements and pseudo-elements (1).'
    },
    {
      id: 6,
      category: 'Modern Layouts',
      difficulty: 'Intermediate',
      question: 'When should you choose CSS Grid over Flexbox in modern UI design?',
      options: [
        { id: 'A', text: 'Flexbox should never be used in 2026.' },
        { id: 'B', text: 'Use Grid for 2-dimensional layouts (rows and columns simultaneously) and Flexbox for 1-dimensional layouts (a single row or column).' },
        { id: 'C', text: 'Grid is only for tables, Flexbox is for cards.' },
        { id: 'D', text: 'Flexbox supports animations, Grid does not.' }
      ],
      correct: 'B',
      explanation: 'CSS Grid is designed for two-dimensional layout orchestration (coordinating both rows and columns), whereas Flexbox excels at one-dimensional alignment along a single axis.'
    },
    {
      id: 7,
      category: 'Tailwind JIT',
      difficulty: 'Intermediate',
      question: 'How does Tailwind CSS arbitrary value syntax (e.g. w-[340px] or bg-[#10b981]) work under the hood?',
      options: [
        { id: 'A', text: 'It injects inline style attributes into every DOM node at runtime.' },
        { id: 'B', text: 'The JIT compiler scans source templates, extracts the bracketed token, and generates custom CSS rules on the fly.' },
        { id: 'C', text: 'It sends an HTTP request to Tailwind CDN.' },
        { id: 'D', text: 'It creates a JavaScript Proxy object.' }
      ],
      correct: 'B',
      explanation: 'Tailwind JIT parses source code files, identifies bracketed arbitrary value tokens, and compiles optimized, single-purpose CSS classes into the build bundle on demand.'
    },
    {
      id: 8,
      category: 'CSS Positioning',
      difficulty: 'Beginner',
      question: 'What is the key difference between position: absolute and position: fixed?',
      options: [
        { id: 'A', text: 'absolute is positioned relative to its closest positioned ancestor; fixed is positioned relative to the browser viewport.' },
        { id: 'B', text: 'fixed elements scroll with the page, absolute elements do not.' },
        { id: 'C', text: 'absolute requires WebGL, fixed does not.' },
        { id: 'D', text: 'They are completely identical in modern CSS.' }
      ],
      correct: 'A',
      explanation: 'position: absolute positions relative to the nearest ancestor with a position other than static. position: fixed is anchored relative to the viewport window and stays fixed during scrolling.'
    },
    {
      id: 9,
      category: 'Performance',
      difficulty: 'Advanced',
      question: 'Why are CSS transform and opacity properties preferred for smooth 60fps animations over animating top, left, or width?',
      options: [
        { id: 'A', text: 'transform and opacity can be composited directly on the GPU without triggering layout reflow or repaint phases.' },
        { id: 'B', text: 'top and left are deprecated in CSS3.' },
        { id: 'C', text: 'transform runs inside web workers.' },
        { id: 'D', text: 'GPU acceleration is only available for text.' }
      ],
      correct: 'A',
      explanation: 'Modifying geometric properties (top, left, width) forces the browser to recompute layout (reflow) and repaint. transform and opacity only require compositing on the GPU, avoiding CPU bottlenecks.'
    },
    {
      id: 10,
      category: 'Tailwind Configuration',
      difficulty: 'Intermediate',
      question: 'What does the content array in tailwind.config.js configure?',
      options: [
        { id: 'A', text: 'The database connection string for website assets.' },
        { id: 'B', text: 'The file glob paths that Tailwind scans for class names to include in the production stylesheet.' },
        { id: 'C', text: 'The list of blog articles to render.' },
        { id: 'D', text: 'The list of font files to download.' }
      ],
      correct: 'B',
      explanation: 'The content array specifies all source files (HTML, JSX, TSX, Vue) containing class names. The Tailwind compiler scans these files to generate only the CSS classes that are actually used.'
    },
    {
      id: 11,
      category: 'Stacking Context',
      difficulty: 'Advanced',
      question: 'Why might an element with z-index: 9999 appear behind an element with z-index: 1 on a webpage?',
      options: [
        { id: 'A', text: 'z-index values cannot exceed 100 in Chrome.' },
        { id: 'B', text: 'The element belongs to a stacking context created by an ancestor whose z-index is lower than the other element stacking context.' },
        { id: 'C', text: 'z-index only applies to SVG elements.' },
        { id: 'D', text: 'CSS does not support negative z-index values.' }
      ],
      correct: 'B',
      explanation: 'z-index is only evaluated within its current stacking context. If a parent container has a lower z-index or creates an isolated context (via opacity, transform, etc.), its children cannot escape that parent stacking level.'
    },
    {
      id: 12,
      category: 'Dark Mode',
      difficulty: 'Intermediate',
      question: 'In Tailwind CSS, how does darkMode: "class" strategy enable theme toggling?',
      options: [
        { id: 'A', text: 'It requires reloading the page.' },
        { id: 'B', text: 'It applies dark: variant utilities whenever a "dark" class is present on the <html> or <body> element.' },
        { id: 'C', text: 'It inspects the OS clock to switch themes at night.' },
        { id: 'D', text: 'It replaces all CSS files with separate dark stylesheets.' }
      ],
      correct: 'B',
      explanation: 'With the "class" strategy, adding the "dark" class to a root element (typically document.documentElement) activates all dark: utility variants, enabling programmatic user toggling via JavaScript.'
    },
    {
      id: 13,
      category: 'HTML Semantics',
      difficulty: 'Beginner',
      question: 'Why should developers use semantic HTML tags (<main>, <article>, <nav>, <header>) instead of generic <div> tags?',
      options: [
        { id: 'A', text: 'div tags are deprecated in HTML5.' },
        { id: 'B', text: 'Semantic tags provide meaningful structure for screen readers (accessibility), improve SEO indexing, and enhance code maintainability.' },
        { id: 'C', text: 'Semantic tags run faster in the V8 engine.' },
        { id: 'D', text: 'Browsers charge licensing fees for generic div tags.' }
      ],
      correct: 'B',
      explanation: 'Semantic markup conveys role and context to assistive technologies (screen readers) and search engines, creating an accessible, SEO-compliant accessibility tree.'
    },
    {
      id: 14,
      category: 'Tailwind Directives',
      difficulty: 'Intermediate',
      question: 'What is the purpose of the @apply directive in Tailwind CSS, and what is its primary caveat?',
      options: [
        { id: 'A', text: 'It connects React components to MongoDB.' },
        { id: 'B', text: 'It inlines existing Tailwind utilities into custom CSS rules; its caveat is that overusing it recreates traditional monolithic CSS stylesheets.' },
        { id: 'C', text: 'It downloads third-party fonts.' },
        { id: 'D', text: 'It resets browser default styling.' }
      ],
      correct: 'B',
      explanation: '@apply allows bundling utilities into traditional CSS classes. While useful for third-party widget overrides, excessive use defeats Tailwind utility benefits and increases CSS bundle size.'
    },
    {
      id: 15,
      category: 'Typography & Layout',
      difficulty: 'Intermediate',
      question: 'In CSS, what is the difference between rem and em units?',
      options: [
        { id: 'A', text: 'rem is relative to the root (<html>) font-size; em is relative to the current element font-size (compounding with nested elements).' },
        { id: 'B', text: 'rem is for mobile phones, em is for desktop screens.' },
        { id: 'C', text: 'em is calculated in inches, rem is calculated in pixels.' },
        { id: 'D', text: 'They are identical and interchangeable.' }
      ],
      correct: 'A',
      explanation: 'rem (root em) always scales relative to the root font-size (usually 16px), ensuring predictable scaling. em scales relative to the element immediate parent or inherited font-size, creating compound sizing in nested elements.'
    }
  ],
  git: [
    {
      id: 1,
      category: 'Git Core',
      difficulty: 'Intermediate',
      question: 'What are the three core areas/trees of a local Git workspace?',
      options: [
        { id: 'A', text: 'Frontend, Backend, and Database.' },
        { id: 'B', text: 'Working Directory, Staging Area (Index), and Git Repository (Commit History).' },
        { id: 'C', text: 'Local, Remote, and Cloud.' },
        { id: 'D', text: 'Master, Main, and Head.' }
      ],
      correct: 'B',
      explanation: 'Git tracks changes across three distinct areas: the Working Directory (your uncommitted file system), the Staging Area/Index (files prepared for the next commit), and the Repository (.git database of committed snapshots).'
    },
    {
      id: 2,
      category: 'Branching & History',
      difficulty: 'Intermediate',
      question: 'What is the fundamental difference between git merge and git rebase?',
      options: [
        { id: 'A', text: 'git merge deletes files, git rebase preserves them.' },
        { id: 'B', text: 'git merge creates a 3-way merge commit preserving exact chronological branch history; git rebase moves the feature commits onto the target base, creating a linear history.' },
        { id: 'C', text: 'git rebase only works on remote repositories.' },
        { id: 'D', text: 'git merge is only for JavaScript files.' }
      ],
      correct: 'B',
      explanation: 'merge retains historical context with a new merge commit connecting two branches. rebase rewrites project history by re-applying commits one-by-one on top of the target branch tip, yielding a clean linear log.'
    },
    {
      id: 3,
      category: 'Git State',
      difficulty: 'Advanced',
      question: 'What does it mean when Git is in a "detached HEAD" state?',
      options: [
        { id: 'A', text: 'The local repository has been corrupted and must be re-cloned.' },
        { id: 'B', text: 'HEAD points directly to a specific commit hash rather than to a named branch reference.' },
        { id: 'C', text: 'The remote GitHub repository is offline.' },
        { id: 'D', text: 'There are uncommitted merge conflicts in the working tree.' }
      ],
      correct: 'B',
      explanation: 'In detached HEAD, you have checked out a specific commit, tag, or remote branch directly. New commits made in this state are not tied to any branch and may be garbage collected unless a branch is created.'
    },
    {
      id: 4,
      category: 'Undo Operations',
      difficulty: 'Intermediate',
      question: 'What is the crucial difference between git reset --hard and git revert?',
      options: [
        { id: 'A', text: 'git reset rewrites commit history and discards uncommitted changes; git revert creates a new commit that records the inverse of the target commit, making it safe for shared branches.' },
        { id: 'B', text: 'git revert deletes the remote repository.' },
        { id: 'C', text: 'git reset can only be run once per day.' },
        { id: 'D', text: 'git revert requires administrative permissions on GitHub.' }
      ],
      correct: 'A',
      explanation: 'reset --hard destroys commits and working directory modifications, which breaks shared remote history. revert is non-destructive: it records a new forward commit undoing previous changes without rewriting history.'
    },
    {
      id: 5,
      category: 'Git Stashing',
      difficulty: 'Beginner',
      question: 'What is the difference between git stash pop and git stash apply?',
      options: [
        { id: 'A', text: 'git stash pop applies the stashed changes and removes them from the stash stack; git stash apply keeps the stash saved in the list.' },
        { id: 'B', text: 'git stash apply only works on branches with no commits.' },
        { id: 'C', text: 'git stash pop deletes all unstaged files permanently.' },
        { id: 'D', text: 'They are identical commands.' }
      ],
      correct: 'A',
      explanation: 'git stash apply restores your stashed work while retaining the entry in your stash history. git stash pop restores the work and immediately removes (drops) the top stash entry.'
    },
    {
      id: 6,
      category: 'Remote Tracking',
      difficulty: 'Intermediate',
      question: 'What happens under the hood when you execute git pull origin main?',
      options: [
        { id: 'A', text: 'It pushes local commits to the remote server.' },
        { id: 'B', text: 'It runs git fetch to download new remote commits, followed immediately by git merge to combine origin/main into the current branch.' },
        { id: 'C', text: 'It resets local main to match origin/main and deletes local branches.' },
        { id: 'D', text: 'It creates a GitHub Pull Request.' }
      ],
      correct: 'B',
      explanation: 'git pull is essentially a shorthand command that executes git fetch (updating remote tracking branches) and then git merge FETCH_HEAD into your checked-out local branch.'
    },
    {
      id: 7,
      category: 'Selective Commits',
      difficulty: 'Intermediate',
      question: 'What is the purpose of git cherry-pick <commit-hash>?',
      options: [
        { id: 'A', text: 'It selects which branch to delete.' },
        { id: 'B', text: 'It applies the exact changes introduced by a specific commit from another branch onto your current checked-out branch.' },
        { id: 'C', text: 'It cleans up unreferenced Git objects.' },
        { id: 'D', text: 'It runs automated tests.' }
      ],
      correct: 'B',
      explanation: 'git cherry-pick enables picking a specific isolated commit from another branch (such as a critical hotfix) and applying it directly to your active branch without merging the entire branch history.'
    },
    {
      id: 8,
      category: 'Conflict Resolution',
      difficulty: 'Intermediate',
      question: 'When a Git merge conflict occurs, what do the markers <<<<<<< HEAD, =======, and >>>>>>> branch represent?',
      options: [
        { id: 'A', text: 'Syntax errors in JavaScript.' },
        { id: 'B', text: 'Content between <<<<<<< and ======= is from your current branch; content between ======= and >>>>>>> is from the branch being merged.' },
        { id: 'C', text: 'Markdown headers generated by GitHub Copilot.' },
        { id: 'D', text: 'Compiler warnings from Webpack.' }
      ],
      correct: 'B',
      explanation: 'Git inserts conflict markers directly into conflicting files: the top section represents the current branch (HEAD) version, and the bottom section represents the incoming branch version being merged.'
    },
    {
      id: 9,
      category: 'Commit Hygiene',
      difficulty: 'Intermediate',
      question: 'Why do engineering teams often squash commits (git merge --squash or rebase -i) before merging a pull request?',
      options: [
        { id: 'A', text: 'To compress PNG images.' },
        { id: 'B', text: 'To condense multiple messy "work-in-progress" or "fix typo" commits into a single clean, atomic commit for clean production git logs.' },
        { id: 'C', text: 'Because Git limits repositories to 100 total commits.' },
        { id: 'D', text: 'To delete git author information.' }
      ],
      correct: 'B',
      explanation: 'Squashing combines noisy intermediate commits created during feature development into a single meaningful commit, making production release auditing and bisecting significantly cleaner.'
    },
    {
      id: 10,
      category: 'Debugging History',
      difficulty: 'Advanced',
      question: 'How does git bisect help developers isolate regression bugs in large codebases?',
      options: [
        { id: 'A', text: 'It uses AI to rewrite broken functions.' },
        { id: 'B', text: 'It performs a binary search between a known good commit and bad commit, checking out midpoints until the exact breaking commit is identified.' },
        { id: 'C', text: 'It analyzes server access logs.' },
        { id: 'D', text: 'It deletes git tags.' }
      ],
      correct: 'B',
      explanation: 'git bisect uses binary search over commit history: by testing the midpoint between a good and bad commit, it pinpoints the single commit that introduced a regression in O(log N) iterations.'
    },
    {
      id: 11,
      category: 'Automation & Tooling',
      difficulty: 'Intermediate',
      question: 'What is a Git Hook (e.g. pre-commit, pre-push) and where are local hooks stored?',
      options: [
        { id: 'A', text: 'Executable scripts located in the .git/hooks directory that run automatically at key points in the Git workflow.' },
        { id: 'B', text: 'Third-party browser extensions.' },
        { id: 'C', text: 'A webhook sent to Slack on every pull request.' },
        { id: 'D', text: 'A React hook used for state management.' }
      ],
      correct: 'A',
      explanation: 'Git hooks are custom shell scripts stored in .git/hooks that trigger automatically before or after Git actions (like running linters before committing or running tests before pushing).'
    },
    {
      id: 12,
      category: 'Internal Storage',
      difficulty: 'Advanced',
      question: 'How does Git store file content internally in the .git/objects database?',
      options: [
        { id: 'A', text: 'As SQLite database rows.' },
        { id: 'B', text: 'As immutable zlib-compressed "blob" objects indexed by the SHA hash of their content and headers.' },
        { id: 'C', text: 'As plain text files in a zip archive.' },
        { id: 'D', text: 'In browser localStorage.' }
      ],
      correct: 'B',
      explanation: 'Git is a content-addressable storage system. Files are stored as immutable blob objects whose cryptographic SHA hash serves as the key and directory path in .git/objects.'
    },
    {
      id: 13,
      category: 'Release Management',
      difficulty: 'Beginner',
      question: 'What is the purpose of Git tags (git tag -a v1.0.0 -m "Release")?',
      options: [
        { id: 'A', text: 'To mark specific points in repository history as important releases, providing immutable reference points.' },
        { id: 'B', text: 'To rename files across all branches.' },
        { id: 'C', text: 'To assign Jira tickets to developers.' },
        { id: 'D', text: 'To compress Git commits into tarballs.' }
      ],
      correct: 'A',
      explanation: 'Tags create permanent, annotated milestones in commit history typically used to identify production releases (e.g. v1.2.0, SemVer) without moving as new commits arrive.'
    },
    {
      id: 14,
      category: 'Large Assets',
      difficulty: 'Intermediate',
      question: 'Why should large binary files (e.g. 500MB video models or dataset archives) be tracked using Git LFS instead of regular Git?',
      options: [
        { id: 'A', text: 'Regular Git downloads the entire full history of every binary modification on clone, causing repository size explosion.' },
        { id: 'B', text: 'Git cannot read binary files.' },
        { id: 'C', text: 'Git LFS encrypts files with AES-256.' },
        { id: 'D', text: 'Git LFS is a paid feature that is mandatory for GitHub.' }
      ],
      correct: 'A',
      explanation: 'Standard Git preserves every historical version of binary files, making repository clones gigantic. Git LFS stores small text pointer references in Git while storing large file payloads on dedicated asset storage.'
    },
    {
      id: 15,
      category: 'CI/CD Pipelines',
      difficulty: 'Intermediate',
      question: 'In modern GitHub Actions workflows, what is the significance of the pull_request event trigger?',
      options: [
        { id: 'A', text: 'It automatically deploys the application directly to production without tests.' },
        { id: 'B', text: 'It triggers automated test suites, linting, and build verification against the proposed merge before code is accepted into main.' },
        { id: 'C', text: 'It deletes conflicting branches.' },
        { id: 'D', text: 'It sends an invoice to the client.' }
      ],
      correct: 'B',
      explanation: 'The pull_request trigger initiates continuous integration pipelines to build and test incoming feature code in isolated containers, verifying code quality before merging into protected branches.'
    }
  ],
  rest: [
    {
      id: 1,
      category: 'HTTP Semantics',
      difficulty: 'Intermediate',
      question: 'Which HTTP methods are defined as idempotent according to RFC 7231?',
      options: [
        { id: 'A', text: 'POST and PATCH only.' },
        { id: 'B', text: 'GET, PUT, DELETE, HEAD, and OPTIONS (executing the request multiple times produces the same server state as a single execution).' },
        { id: 'C', text: 'Only GET is idempotent.' },
        { id: 'D', text: 'No HTTP methods are idempotent.' }
      ],
      correct: 'B',
      explanation: 'Idempotency means multiple identical requests have the exact same effect on server state as one request. GET, PUT (complete replacement), and DELETE are idempotent. POST is non-idempotent.'
    },
    {
      id: 2,
      category: 'REST Design',
      difficulty: 'Intermediate',
      question: 'What is the primary architectural difference between HTTP PUT and HTTP PATCH in RESTful APIs?',
      options: [
        { id: 'A', text: 'PUT is used for deleting, PATCH is used for fetching.' },
        { id: 'B', text: 'PUT replaces the target resource entirely with the request payload; PATCH applies partial modifications to the resource.' },
        { id: 'C', text: 'PUT only accepts XML, PATCH accepts JSON.' },
        { id: 'D', text: 'PATCH cannot return a 200 OK status code.' }
      ],
      correct: 'B',
      explanation: 'PUT expects a full representation of the entity and replaces the existing resource. PATCH contains a partial delta of fields to update on the target resource.'
    },
    {
      id: 3,
      category: 'HTTP Status Codes',
      difficulty: 'Beginner',
      question: 'What is the distinction between HTTP 401 Unauthorized and HTTP 403 Forbidden?',
      options: [
        { id: 'A', text: '401 means the client is unauthenticated (missing or invalid token); 403 means the client is authenticated but lacks required permissions/roles.' },
        { id: 'B', text: '401 is a server crash; 403 is a client typo.' },
        { id: 'C', text: '401 is for GET requests; 403 is for POST requests.' },
        { id: 'D', text: 'They are identical status codes.' }
      ],
      correct: 'A',
      explanation: '401 Unauthorized indicates authentication is required and has failed or not been provided. 403 Forbidden indicates the server knows who the user is, but the user does not possess authorization to access the resource.'
    },
    {
      id: 4,
      category: 'Authentication',
      difficulty: 'Advanced',
      question: 'Why should JSON Web Tokens (JWT) for session authentication be stored in HTTP-Only cookies instead of browser localStorage?',
      options: [
        { id: 'A', text: 'HTTP-Only cookies cannot be accessed by client-side JavaScript, protecting the token from theft via Cross-Site Scripting (XSS) attacks.' },
        { id: 'B', text: 'localStorage is limited to 10 bytes.' },
        { id: 'C', text: 'HTTP-Only cookies bypass CORS preflight.' },
        { id: 'D', text: 'Cookies encrypt data on the client automatically.' }
      ],
      correct: 'A',
      explanation: 'Tokens stored in localStorage or sessionStorage are vulnerable to extraction if any malicious JavaScript executes (XSS). HTTP-Only cookies block JavaScript access (document.cookie), preventing token exfiltration.'
    },
    {
      id: 5,
      category: 'Token Architecture',
      difficulty: 'Advanced',
      question: 'What are the three components of a JSON Web Token (JWT) separated by dots?',
      options: [
        { id: 'A', text: 'Username, Password, and Database Name.' },
        { id: 'B', text: 'Header (algorithm & type), Payload (claims & user data), and Signature (HMAC or RSA verification hash).' },
        { id: 'C', text: 'Protocol, Hostname, and Port.' },
        { id: 'D', text: 'Public Key, Private Key, and Certificate.' }
      ],
      correct: 'B',
      explanation: 'A JWT comprises three Base64URL-encoded strings: Header (specifying hashing algorithm), Payload (data claims such as userId and exp), and Signature (ensuring data integrity).'
    },
    {
      id: 6,
      category: 'Cross-Origin Security',
      difficulty: 'Intermediate',
      question: 'Why does a browser issue an HTTP OPTIONS preflight request before sending certain cross-origin API calls?',
      options: [
        { id: 'A', text: 'To download the favicon of the API.' },
        { id: 'B', text: 'To verify with the server that the request origin, HTTP method, and custom headers are permitted before executing non-simple requests.' },
        { id: 'C', text: 'To check internet connectivity.' },
        { id: 'D', text: 'To authenticate the user with basic auth.' }
      ],
      correct: 'B',
      explanation: 'For non-simple requests (methods other than GET/POST/HEAD or custom headers like Authorization), browsers send an OPTIONS preflight to confirm the server allows the cross-origin operation under CORS rules.'
    },
    {
      id: 7,
      category: 'Server Errors',
      difficulty: 'Intermediate',
      question: 'What is the difference between an HTTP 502 Bad Gateway and an HTTP 504 Gateway Timeout error?',
      options: [
        { id: 'A', text: '502 means an intermediate reverse proxy received an invalid response from the upstream server; 504 means the upstream server did not respond within the gateway timeout window.' },
        { id: 'B', text: '502 is client error, 504 is server error.' },
        { id: 'C', text: '502 is only returned by Nginx, 504 is only returned by Apache.' },
        { id: 'D', text: 'They are identical status codes.' }
      ],
      correct: 'A',
      explanation: 'Both represent reverse proxy issues: 502 indicates the backend microservice returned a malformed response or closed connection, while 504 means the upstream microservice took too long to respond.'
    },
    {
      id: 8,
      category: 'API Rate Limiting',
      difficulty: 'Intermediate',
      question: 'When an API enforces rate limiting and a client exceeds their allowance, which HTTP status code and response header should be returned?',
      options: [
        { id: 'A', text: 'HTTP 400 Bad Request with Location header.' },
        { id: 'B', text: 'HTTP 429 Too Many Requests, typically accompanied by a Retry-After header indicating when to retry.' },
        { id: 'C', text: 'HTTP 500 Internal Server Error.' },
        { id: 'D', text: 'HTTP 404 Not Found.' }
      ],
      correct: 'B',
      explanation: 'RFC 6585 specifies HTTP 429 Too Many Requests for rate limiting, along with Retry-After (seconds or date) and X-RateLimit-Remaining headers to guide client backoff.'
    },
    {
      id: 9,
      category: 'Token Expiration',
      difficulty: 'Advanced',
      question: 'Why do modern authentication architectures pair short-lived Access Tokens (e.g. 15m) with long-lived Refresh Tokens (e.g. 7d)?',
      options: [
        { id: 'A', text: 'Because access tokens can only hold 5 characters.' },
        { id: 'B', text: 'To minimize the vulnerability window if an access token is intercepted, while enabling silent session renewal without forcing the user to re-login.' },
        { id: 'C', text: 'To reduce MongoDB storage requirements.' },
        { id: 'D', text: 'Refresh tokens are required by CSS specifications.' }
      ],
      correct: 'B',
      explanation: 'Short-lived access tokens limit the window of risk if leaked. The long-lived refresh token (stored securely in an HTTP-Only cookie) is exchanged for new access tokens, allowing invalidation on server-side logout.'
    },
    {
      id: 10,
      category: 'Pagination',
      difficulty: 'Advanced',
      question: 'Why is Cursor-based pagination (keyset pagination) superior to Offset-based pagination (LIMIT/OFFSET) for large datasets?',
      options: [
        { id: 'A', text: 'Cursor pagination avoids O(N) database row scanning overhead and prevents missing or duplicate items when records are inserted concurrently.' },
        { id: 'B', text: 'Offset pagination cannot handle strings.' },
        { id: 'C', text: 'Cursor pagination converts SQL to NoSQL.' },
        { id: 'D', text: 'Offset pagination does not support sorting.' }
      ],
      correct: 'A',
      explanation: 'With OFFSET 100000, the database must scan and discard 100,000 index rows before returning data. Keyset/cursor pagination uses WHERE id > last_seen_id LIMIT 20, maintaining constant O(1) B-tree lookup speed.'
    },
    {
      id: 11,
      category: 'API Versioning',
      difficulty: 'Intermediate',
      question: 'Which of the following is considered the most transparent and common API versioning strategy for public REST APIs?',
      options: [
        { id: 'A', text: 'URI path versioning (e.g. /api/v1/resumes and /api/v2/resumes).' },
        { id: 'B', text: 'Changing the server IP address for every new feature.' },
        { id: 'C', text: 'Deleting older endpoints immediately without warning.' },
        { id: 'D', text: 'Random query parameters.' }
      ],
      correct: 'A',
      explanation: 'URI path versioning (/api/v1/) is widely adopted (Stripe, GitHub, Google) because it is unambiguous, browser-cache friendly, easily testable in Postman, and prevents breaking existing client integrations.'
    },
    {
      id: 12,
      category: 'API Testing & Tooling',
      difficulty: 'Beginner',
      question: 'What is the primary role of Postman or automated API integration tests in a microservices deployment pipeline?',
      options: [
        { id: 'A', text: 'To validate API request contracts, status codes, payload schemas, and response latency before deploying to production.' },
        { id: 'B', text: 'To design CSS color palettes.' },
        { id: 'C', text: 'To format hard drives on the server.' },
        { id: 'D', text: 'To replace web browsers completely.' }
      ],
      correct: 'A',
      explanation: 'Postman collections and automated contract test runners verify that endpoints conform to expected schemas, return accurate status codes, and reject malformed requests before code reaches production.'
    },
    {
      id: 13,
      category: 'Real-Time Communication',
      difficulty: 'Intermediate',
      question: 'What is the fundamental difference between client polling and HTTP Webhooks?',
      options: [
        { id: 'A', text: 'Polling repeatedly asks the server for updates on an interval; webhooks push data to a client-provided callback URL as soon as the event happens.' },
        { id: 'B', text: 'Webhooks only work with SMS messages.' },
        { id: 'C', text: 'Polling is event-driven; webhooks are synchronous.' },
        { id: 'D', text: 'Webhooks are deprecated in HTTP/2.' }
      ],
      correct: 'A',
      explanation: 'Polling is client-initiated and wastes bandwidth with empty responses. Webhooks are server-initiated event notifications that POST payloads to the client webhook endpoint only when an event occurs.'
    },
    {
      id: 14,
      category: 'Content Negotiation',
      difficulty: 'Intermediate',
      question: 'What is the role of the Accept and Content-Type HTTP headers in REST client-server negotiation?',
      options: [
        { id: 'A', text: 'Content-Type informs the receiver what media type is being sent; Accept informs the server what media format the client can handle.' },
        { id: 'B', text: 'Accept is for cookies, Content-Type is for passwords.' },
        { id: 'C', text: 'Content-Type is only used in FTP.' },
        { id: 'D', text: 'Accept dictates the port number.' }
      ],
      correct: 'A',
      explanation: 'Content-Type describes the MIME type of the payload currently in the request or response body (e.g. application/json). Accept tells the server what representations the client prefers in response.'
    },
    {
      id: 15,
      category: 'Architecture Principles',
      difficulty: 'Advanced',
      question: 'What does the "Statelessness" constraint in REST architecture mandate?',
      options: [
        { id: 'A', text: 'The server must not store any client context between requests; each request must contain all information required to understand and process it.' },
        { id: 'B', text: 'The database must be dropped after every query.' },
        { id: 'C', text: 'Clients cannot store cookies in memory.' },
        { id: 'D', text: 'The server cannot use SSL/TLS encryption.' }
      ],
      correct: 'A',
      explanation: 'Statelessness requires that no session state is kept on the server between requests. Every request carries its own authentication credentials and context, allowing servers to scale horizontally without sticky sessions.'
    }
  ],
  'deep-learning': [
    {
      id: 1,
      category: 'Deep Learning',
      difficulty: 'Intermediate',
      question: 'Why does the vanishing gradient problem occur in deep networks using Sigmoid or Tanh activations, and how does ReLU mitigate it?',
      options: [
        { id: 'A', text: 'Sigmoid and Tanh saturate for extreme values, causing their derivatives to approach zero; ReLU has a constant derivative of 1 for positive inputs.' },
        { id: 'B', text: 'ReLU computes matrix inverses faster than Sigmoid.' },
        { id: 'C', text: 'Sigmoid forces weights to become negative during backpropagation.' },
        { id: 'D', text: 'ReLU eliminates the need for computing loss gradients entirely.' }
      ],
      correct: 'A',
      explanation: 'Sigmoid derivatives peak at only 0.25 and Tanh at 1.0, rapidly decaying to ~0 for large inputs. Multiplied through dozens of layers via the chain rule, gradients vanish. ReLU f(x)=max(0,x) maintains a derivative of 1 for positive inputs, preventing gradient degradation.'
    },
    {
      id: 2,
      category: 'Deep Learning',
      difficulty: 'Intermediate',
      question: 'What mathematical principle forms the fundamental basis of backpropagation in training artificial neural networks?',
      options: [
        { id: 'A', text: 'The Chain Rule of Calculus applied iteratively backward from output to input layers.' },
        { id: 'B', text: 'Gauss-Jordan elimination on weight matrices.' },
        { id: 'C', text: 'Monte Carlo randomized sampling of gradients.' },
        { id: 'D', text: 'Discrete Fourier Transform on loss surfaces.' }
      ],
      correct: 'A',
      explanation: 'Backpropagation computes the gradient of the loss function with respect to every weight in the network by applying the chain rule of calculus in reverse topological order from the output layer back to early layers.'
    },
    {
      id: 3,
      category: 'Deep Learning',
      difficulty: 'Intermediate',
      question: 'In Convolutional Neural Networks (CNNs), what is the key motivation for using Parameter Sharing across spatial feature maps?',
      options: [
        { id: 'A', text: 'To allow the same filter kernel to detect features (e.g. edges) anywhere in the image while drastically reducing parameter count.' },
        { id: 'B', text: 'To force all convolution layers to have identical receptive fields.' },
        { id: 'C', text: 'To prevent using floating-point multiplication in GPUs.' },
        { id: 'D', text: 'To make images strictly 1-dimensional vectors.' }
      ],
      correct: 'A',
      explanation: 'Parameter sharing means the weights of a convolutional kernel are swept across the entire input grid. This enforces translation equivariance (detecting a feature wherever it appears) and vastly reduces the number of learnable parameters compared to fully connected layers.'
    },
    {
      id: 4,
      category: 'Deep Learning',
      difficulty: 'Intermediate',
      question: 'What is the primary role of Max Pooling layers in deep convolutional architectures?',
      options: [
        { id: 'A', text: 'Downsampling spatial dimensions to reduce computational complexity and provide slight translation invariance.' },
        { id: 'B', text: 'Normalizing weight matrices to unit variance.' },
        { id: 'C', text: 'Multiplying activations by random Gaussian noise.' },
        { id: 'D', text: 'Converting RGB channels into grayscale values.' }
      ],
      correct: 'A',
      explanation: 'Max pooling extracts the maximum value within localized receptive pooling windows, halving or reducing spatial height and width. This reduces computational overhead, controls overfitting, and grants local translation invariance.'
    },
    {
      id: 5,
      category: 'Deep Learning',
      difficulty: 'Intermediate',
      question: 'How does Dropout regularization operate differently between training and inference (evaluation) phases?',
      options: [
        { id: 'A', text: 'During training, activations are randomly dropped with probability p; during inference, all units remain active.' },
        { id: 'B', text: 'Dropout permanently deletes weights during both training and inference.' },
        { id: 'C', text: 'Dropout is only activated during inference on unseen test sets.' },
        { id: 'D', text: 'Dropout converts floating point activations to 8-bit integers during training.' }
      ],
      correct: 'A',
      explanation: 'During training, Dropout zeros out a random fraction p of neurons to prevent co-adaptation of features. In modern inverted dropout, activations are scaled by 1/(1-p) during training so inference runs unmodified with full network capacity.'
    },
    {
      id: 6,
      category: 'Deep Learning',
      difficulty: 'Advanced',
      question: 'What distinct adaptive mechanisms are combined to create the Adam (Adaptive Moment Estimation) optimizer?',
      options: [
        { id: 'A', text: 'First-order momentum (exponential moving average of gradients) and RMSprop (exponential moving average of squared gradients).' },
        { id: 'B', text: 'Simulated annealing combined with genetic algorithm mutation.' },
        { id: 'C', text: 'Second-order Hessian matrix inversion combined with gradient descent.' },
        { id: 'D', text: 'Stochastic coordinate descent with random restarts.' }
      ],
      correct: 'A',
      explanation: 'Adam computes individual adaptive learning rates for each parameter by tracking the first moment (mean of past gradients, like Momentum) and the second raw moment (uncentered variance of squared gradients, like RMSprop), with bias correction terms.'
    },
    {
      id: 7,
      category: 'Deep Learning',
      difficulty: 'Intermediate',
      question: 'Which technique is most commonly utilized during training to prevent the Exploding Gradient problem in recurrent architectures?',
      options: [
        { id: 'A', text: 'Gradient Clipping (rescaling gradient norms when they exceed a threshold).' },
        { id: 'B', text: 'Increasing the learning rate tenfold.' },
        { id: 'C', text: 'Replacing all activation functions with Sigmoid.' },
        { id: 'D', text: 'Removing all bias vectors from the network.' }
      ],
      correct: 'A',
      explanation: 'Gradient clipping caps gradient vectors to a maximum value or rescales the global L2 norm (e.g. clipnorm=1.0) whenever they exceed a predefined threshold, preventing sudden catastrophic weight divergence during backpropagation through time (BPTT).'
    },
    {
      id: 8,
      category: 'Deep Learning',
      difficulty: 'Advanced',
      question: 'Why are Long Short-Term Memory (LSTM) networks able to maintain long-term sequence dependencies better than vanilla RNNs?',
      options: [
        { id: 'A', text: 'LSTMs possess an uninterrupted constant error carousel (Cell State) regulated by Forget, Input, and Output gates.' },
        { id: 'B', text: 'LSTMs do not compute gradients through time.' },
        { id: 'C', text: 'LSTMs use convolutional kernels rather than recurrent weights.' },
        { id: 'D', text: 'Vanilla RNNs cannot handle continuous numerical values.' }
      ],
      correct: 'A',
      explanation: 'Vanilla RNNs suffer from exponential gradient decay across many time steps. LSTMs maintain a linear Cell State where information flows with minimal attenuation, precisely modulated by multiplicative sigmoid gates (Forget, Input, Output).'
    },
    {
      id: 9,
      category: 'Deep Learning',
      difficulty: 'Intermediate',
      question: 'What is the primary architectural objective and benefit of Batch Normalization in deep networks?',
      options: [
        { id: 'A', text: 'Normalizing mini-batch layer inputs to mean 0 and variance 1, reducing internal covariate shift and accelerating convergence.' },
        { id: 'B', text: 'Dividing dataset images into exactly 16 equal patches.' },
        { id: 'C', text: 'Replacing backpropagation with batch matrix factorization.' },
        { id: 'D', text: 'Zero-centering dataset labels before feeding to loss functions.' }
      ],
      correct: 'A',
      explanation: 'Batch Normalization standardizes intermediate activations within each mini-batch using learnable scale (gamma) and shift (beta) parameters. This stabilizes gradient updates, reduces dependency on meticulous weight initialization, and allows higher learning rates.'
    },
    {
      id: 10,
      category: 'Deep Learning',
      difficulty: 'Intermediate',
      question: 'For a multi-class classification model whose final layer outputs probabilities via Softmax, which loss function is mathematically appropriate?',
      options: [
        { id: 'A', text: 'Categorical Cross-Entropy.' },
        { id: 'B', text: 'Mean Squared Error (MSE).' },
        { id: 'C', text: 'Mean Absolute Percentage Error (MAPE).' },
        { id: 'D', text: 'Hinge Loss.' }
      ],
      correct: 'A',
      explanation: 'Categorical Cross-Entropy measures the distance between the true one-hot distribution and the predicted Softmax probability distribution. Paired with Softmax, its derivative simplifies cleanly to (p_i - y_i), providing robust linear gradients for updates.'
    },
    {
      id: 11,
      category: 'Deep Learning',
      difficulty: 'Advanced',
      question: 'In the Scaled Dot-Product Attention mechanism of Transformers, what are the three fundamental projection matrices derived from input representations?',
      options: [
        { id: 'A', text: 'Query (Q), Key (K), and Value (V).' },
        { id: 'B', text: 'Weight (W), Bias (B), and Error (E).' },
        { id: 'C', text: 'Input (I), Hidden (H), and Output (O).' },
        { id: 'D', text: 'Prior (P), Likelihood (L), and Posterior (Pos).' }
      ],
      correct: 'A',
      explanation: 'Scaled Dot-Product Attention computes Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V. Query vectors match against Key vectors to produce similarity attention weights, which scale the Value vectors to form context representations.'
    },
    {
      id: 12,
      category: 'Deep Learning',
      difficulty: 'Intermediate',
      question: 'When performing Transfer Learning on a small domain-specific dataset using a pre-trained backbone (e.g. ResNet50), what is standard best practice?',
      options: [
        { id: 'A', text: 'Freeze the convolutional backbone weights and train only newly initialized classification head layers.' },
        { id: 'B', text: 'Randomly re-initialize all backbone weights from scratch.' },
        { id: 'C', text: 'Train with an extremely high learning rate on all layers simultaneously.' },
        { id: 'D', text: 'Delete all convolutional layers and keep only the final output layer.' }
      ],
      correct: 'A',
      explanation: 'Pretrained backbones already possess generic feature extractors (edges, textures, shapes). Freezing their weights prevents catastrophic forgetting while training a lightweight custom head. Afterward, optional fine-tuning with a very small learning rate can adapt top layers.'
    },
    {
      id: 13,
      category: 'Deep Learning',
      difficulty: 'Intermediate',
      question: 'What is the architectural purpose of the "bottleneck layer" (latent code) in an Autoencoder?',
      options: [
        { id: 'A', text: 'Forces the network to learn a compressed, low-dimensional representation capturing the most salient underlying data features.' },
        { id: 'B', text: 'Increases the spatial resolution of images before classification.' },
        { id: 'C', text: 'Encrypts the input using SHA-256 for secure transmission.' },
        { id: 'D', text: 'Guarantees 100% training accuracy on raw inputs.' }
      ],
      correct: 'A',
      explanation: 'An autoencoder maps high-dimensional input into a constrained lower-dimensional bottleneck (encoder) before reconstructing the original input (decoder). This dimensional bottleneck compels the network to discard noise and retain only the most informative latent representations.'
    },
    {
      id: 14,
      category: 'Deep Learning',
      difficulty: 'Intermediate',
      question: 'In model training telemetry, what pattern between Training Loss and Validation Loss indicates severe overfitting?',
      options: [
        { id: 'A', text: 'Training loss steadily decreases while validation loss plateaus and begins diverging upwards.' },
        { id: 'B', text: 'Both training loss and validation loss decrease synchronously.' },
        { id: 'C', text: 'Training loss remains constant while validation loss drops to zero.' },
        { id: 'D', text: 'Validation loss is strictly identical to training loss across all epochs.' }
      ],
      correct: 'A',
      explanation: 'Overfitting occurs when the network memorizes specific idiosyncrasies and noise in the training set rather than learning generalizable patterns. Consequently, training loss drops continuously while validation error starts escalating.'
    },
    {
      id: 15,
      category: 'Deep Learning',
      difficulty: 'Advanced',
      question: 'What is the rationale behind utilizing a Learning Rate Warmup schedule in training large modern deep architectures?',
      options: [
        { id: 'A', text: 'Gradually ramps learning rate from near zero to prevent large, erratic early gradient updates from destabilizing randomly initialized weights.' },
        { id: 'B', text: 'Heats up the GPU core temperature to increase clock speed.' },
        { id: 'C', text: 'Bypasses the first 1,000 training iterations without computing losses.' },
        { id: 'D', text: 'Prevents backpropagation from computing derivatives for bias terms.' }
      ],
      correct: 'A',
      explanation: 'In the initial training steps, weights are random and gradients have high variance. A warmup schedule starts with a very small learning rate and increments linearly over early epochs, allowing initial stability before transitioning into full-rate decay schedules.'
    }
  ],
  'machine-learning': [
    {
      id: 1,
      category: 'Machine Learning',
      difficulty: 'Intermediate',
      question: 'What does high variance in a machine learning model signify in terms of the Bias-Variance tradeoff?',
      options: [
        { id: 'A', text: 'The model has overfitted to the training data, capturing noise and failing to generalize to unseen test data.' },
        { id: 'B', text: 'The model is too simple and underfits both training and test data.' },
        { id: 'C', text: 'The model training time is excessively slow.' },
        { id: 'D', text: 'The dataset has too few features.' }
      ],
      correct: 'A',
      explanation: 'High variance indicates sensitivity to small fluctuations in training data (overfitting). While training error is low, the model generalizes poorly to test sets. High bias, conversely, represents underfitting due to oversimplified assumptions.'
    },
    {
      id: 2,
      category: 'Machine Learning',
      difficulty: 'Intermediate',
      question: 'What is the fundamental operational difference between L1 (Lasso) and L2 (Ridge) regularization?',
      options: [
        { id: 'A', text: 'L1 adds the absolute sum of coefficients and can shrink weights to exactly zero (feature selection); L2 adds squared weights and shrinks weights smoothly toward zero.' },
        { id: 'B', text: 'L1 is for classification, while L2 is strictly for regression.' },
        { id: 'C', text: 'L2 eliminates uninformative features completely, whereas L1 keeps all features.' },
        { id: 'D', text: 'L1 does not require a regularization penalty lambda.' }
      ],
      correct: 'A',
      explanation: 'L1 regularization penalty |w| creates diamond-shaped constraint boundaries that intersect axes at zero, yielding sparse weight vectors (automatic feature selection). L2 penalty w^2 creates spherical boundaries, shrinking coefficients asymptotically toward zero without setting them strictly to zero.'
    },
    {
      id: 3,
      category: 'Machine Learning',
      difficulty: 'Intermediate',
      question: 'In a medical diagnostics model where missing a disease case (false negative) is catastrophic, which metric must be prioritized?',
      options: [
        { id: 'A', text: 'Recall (Sensitivity).' },
        { id: 'B', text: 'Precision.' },
        { id: 'C', text: 'Raw Accuracy.' },
        { id: 'D', text: 'Specificity.' }
      ],
      correct: 'A',
      explanation: 'Recall = TP / (TP + FN). When false negatives carry severe consequences (such as undiagnosed malignant tumors or fraud), maximizing Recall guarantees that the highest proportion of actual positive cases are captured.'
    },
    {
      id: 4,
      category: 'Machine Learning',
      difficulty: 'Intermediate',
      question: 'What does an Area Under the ROC Curve (ROC-AUC) score of 0.5 indicate for a binary classification model?',
      options: [
        { id: 'A', text: 'Model discrimination is equivalent to random guessing.' },
        { id: 'B', text: 'The model is 100% accurate on all test instances.' },
        { id: 'C', text: 'The model predicts only the negative class.' },
        { id: 'D', text: 'The model has zero false positives.' }
      ],
      correct: 'A',
      explanation: 'The diagonal line from (0,0) to (1,1) in an ROC curve represents a random baseline with an AUC of 0.5. An AUC of 1.0 indicates perfect separation between positive and negative classes, while 0.5 represents no diagnostic ability.'
    },
    {
      id: 5,
      category: 'Machine Learning',
      difficulty: 'Intermediate',
      question: 'Why does a Random Forest ensemble achieve lower generalization error compared to a single deep Decision Tree?',
      options: [
        { id: 'A', text: 'Bagging and random feature subsets create uncorrelated trees; averaging their predictions reduces overall variance without increasing bias.' },
        { id: 'B', text: 'Random Forests use gradient descent instead of recursive splitting.' },
        { id: 'C', text: 'Random Forests convert categorical data into continuous linear equations.' },
        { id: 'D', text: 'Random Forests eliminate the need for cross-validation.' }
      ],
      correct: 'A',
      explanation: 'Individual deep decision trees have high variance and easily overfit. By bootstrapping training samples and randomly selecting feature candidate subsets at each split (bagging), Random Forests aggregate predictions across multiple diverse trees, dampening variance.'
    },
    {
      id: 6,
      category: 'Machine Learning',
      difficulty: 'Advanced',
      question: 'How does Gradient Boosting (e.g. XGBoost, LightGBM) fundamentally differ from Random Forest bagging?',
      options: [
        { id: 'A', text: 'Boosting trains trees sequentially, where each new weak learner is fitted to the pseudo-residuals (gradients of the loss) of prior trees.' },
        { id: 'B', text: 'Boosting trains all trees in parallel completely independently of one another.' },
        { id: 'C', text: 'Boosting only uses linear regression models as base learners.' },
        { id: 'D', text: 'Boosting evaluates models without computing loss functions.' }
      ],
      correct: 'A',
      explanation: 'Bagging (Random Forest) builds independent models in parallel to reduce variance. Boosting builds models iteratively in sequence, with each subsequent tree targeted to minimize the residual errors of the existing ensemble via gradient descent in function space.'
    },
    {
      id: 7,
      category: 'Machine Learning',
      difficulty: 'Intermediate',
      question: 'Which of the following machine learning algorithms is naturally invariant to monotonic feature scaling (e.g. StandardScaler / MinMaxScaler)?',
      options: [
        { id: 'A', text: 'Decision Trees / Tree-based Ensembles.' },
        { id: 'B', text: 'K-Nearest Neighbors (KNN).' },
        { id: 'C', text: 'Support Vector Machines (SVM).' },
        { id: 'D', text: 'Principal Component Analysis (PCA).' }
      ],
      correct: 'A',
      explanation: 'Decision tree splits evaluate thresholds on individual features independently (e.g. x > 5.0). Rescaling or shifting a feature monotonically preserves the relative ordering of data points, leaving split choices and model predictions completely unaffected.'
    },
    {
      id: 8,
      category: 'Machine Learning',
      difficulty: 'Intermediate',
      question: 'In unsupervised K-Means clustering, what is the role of the "Elbow Method"?',
      options: [
        { id: 'A', text: 'Determining the optimal number of clusters k by identifying the point where the reduction in Within-Cluster Sum of Squares (inertia) bends.' },
        { id: 'B', text: 'Measuring the distance between outliers and the dataset mean.' },
        { id: 'C', text: 'Sorting features by variance explained.' },
        { id: 'D', text: 'Converting unsupervised clusters into supervised regression labels.' }
      ],
      correct: 'A',
      explanation: 'Plotting inertia (WCSS) against cluster count k creates an elbow curve. As k increases, inertia naturally decreases. The elbow point marks the trade-off where adding further clusters yields diminishing returns in variance explanation.'
    },
    {
      id: 9,
      category: 'Machine Learning',
      difficulty: 'Advanced',
      question: 'What is the "Kernel Trick" in Support Vector Machines (SVM)?',
      options: [
        { id: 'A', text: 'Computing inner products in a high-dimensional feature space using a kernel function without explicitly transforming coordinates.' },
        { id: 'B', text: 'Encrypting support vector coordinates in memory.' },
        { id: 'C', text: 'Using OS kernel system calls to accelerate matrix inversion.' },
        { id: 'D', text: 'Dropping all non-support vector data points before training.' }
      ],
      correct: 'A',
      explanation: 'The kernel trick allows SVMs to find non-linear decision boundaries by computing the dot product between instances in an implicit higher (or infinite) dimensional Hilbert space using Mercer kernels (e.g. RBF kernel), avoiding computational explosion.'
    },
    {
      id: 10,
      category: 'Machine Learning',
      difficulty: 'Intermediate',
      question: 'What constitutes the most common source of Data Leakage in a machine learning evaluation pipeline?',
      options: [
        { id: 'A', text: 'Fitting scalers, imputers, or encoders on the entire dataset prior to splitting into train and test sets.' },
        { id: 'B', text: 'Using cross-validation with 5 folds instead of 10 folds.' },
        { id: 'C', text: 'Training on a GPU rather than a CPU.' },
        { id: 'D', text: 'Using random seeds for reproducibility.' }
      ],
      correct: 'A',
      explanation: 'Fitting preprocessing transformations (mean imputation, standard scaling, target encoding) on the full dataset before splitting introduces statistical information from the test set into the training pipeline, producing artificially optimistic evaluation metrics.'
    },
    {
      id: 11,
      category: 'Machine Learning',
      difficulty: 'Intermediate',
      question: 'How does SMOTE (Synthetic Minority Over-sampling Technique) address class imbalance in training data?',
      options: [
        { id: 'A', text: 'Synthesizes novel minority instances by interpolating along line segments connecting existing minority examples to their k-nearest neighbors.' },
        { id: 'B', text: 'Duplicates existing minority samples with zero variation.' },
        { id: 'C', text: 'Deletes 90% of majority class instances randomly.' },
        { id: 'D', text: 'Flips target labels from majority to minority.' }
      ],
      correct: 'A',
      explanation: 'Unlike naive random oversampling which duplicates rows and causes overfitting, SMOTE creates synthetic minority instances by selecting a minority sample, computing its k-nearest minority neighbors, and generating points along the connecting line segments.'
    },
    {
      id: 12,
      category: 'Machine Learning',
      difficulty: 'Advanced',
      question: 'What criterion does Principal Component Analysis (PCA) optimize when projecting high-dimensional features onto principal components?',
      options: [
        { id: 'A', text: 'Maximizing the variance of the projected data while minimizing reconstruction error.' },
        { id: 'B', text: 'Maximizing classification accuracy on labeled data.' },
        { id: 'C', text: 'Minimizing the number of non-zero eigenvalues.' },
        { id: 'D', text: 'Separating classes by their mean distance.' }
      ],
      correct: 'A',
      explanation: 'PCA computes the eigenvectors of the feature covariance matrix. The first principal component aligns with the direction of maximal variance. Orthogonal successive components maximize remaining variance, ensuring minimal information loss under linear projection.'
    },
    {
      id: 13,
      category: 'Machine Learning',
      difficulty: 'Intermediate',
      question: 'Why is Stratified K-Fold cross-validation strongly recommended over standard K-Fold for classification tasks?',
      options: [
        { id: 'A', text: 'It ensures that each fold contains approximately the same percentage of target class labels as the complete dataset.' },
        { id: 'B', text: 'It runs twice as fast as standard K-Fold.' },
        { id: 'C', text: 'It completely eliminates the test fold.' },
        { id: 'D', text: 'It converts multi-class problems into regression.' }
      ],
      correct: 'A',
      explanation: 'Standard K-Fold randomly assigns samples, which on imbalanced datasets can produce folds with zero or few minority instances. Stratified K-Fold guarantees proportional representation of all target classes across every fold.'
    },
    {
      id: 14,
      category: 'Machine Learning',
      difficulty: 'Intermediate',
      question: 'In Logistic Regression, what function is utilized to map a linear combination of input features into a valid probability between 0 and 1?',
      options: [
        { id: 'A', text: 'Sigmoid / Logistic Function: 1 / (1 + e^(-z)).' },
        { id: 'B', text: 'Rectified Linear Unit (ReLU).' },
        { id: 'C', text: 'Signum step function.' },
        { id: 'D', text: 'Hyperbolic Secant.' }
      ],
      correct: 'A',
      explanation: 'Logistic Regression models log-odds as a linear equation z = w^T x + b. The Sigmoid function sigma(z) = 1/(1+e^(-z)) maps the real number line into the bounded interval (0, 1), representing class probability.'
    },
    {
      id: 15,
      category: 'Machine Learning',
      difficulty: 'Intermediate',
      question: 'If a trained machine learning model exhibits High Bias (severe underfitting), what is the most appropriate remediation step?',
      options: [
        { id: 'A', text: 'Increase model complexity, engineer interaction/polynomial features, or decrease regularization penalties.' },
        { id: 'B', text: 'Collect fewer training examples.' },
        { id: 'C', text: 'Increase L1/L2 regularization penalties significantly.' },
        { id: 'D', text: 'Prune the decision tree to a maximum depth of 1.' }
      ],
      correct: 'A',
      explanation: 'High bias means the model lacks the capacity to capture patterns in the data. Remediation requires enhancing expressive power: selecting a more complex model family, adding informative non-linear features, or relaxing regularization constraints.'
    }
  ],
  'data-analytics': [
    {
      id: 1,
      category: 'Data Analytics & Matplotlib',
      difficulty: 'Intermediate',
      question: 'In Matplotlib object-oriented plotting, what is the core structural difference between a Figure and an Axes?',
      options: [
        { id: 'A', text: 'Figure is the top-level container window/canvas; Axes is the actual subplot area containing data, ticks, labels, and title.' },
        { id: 'B', text: 'Axes is the 3D version of a Figure.' },
        { id: 'C', text: 'Figure only holds text, while Axes holds charts.' },
        { id: 'D', text: 'They are completely identical synonyms.' }
      ],
      correct: 'A',
      explanation: 'The Figure represents the entire bounding canvas window or image file. An Axes is an individual plot or subplot attached to that Figure where data points, coordinate axes, tick locators, lines, and legends are drawn.'
    },
    {
      id: 2,
      category: 'Data Analytics & Matplotlib',
      difficulty: 'Intermediate',
      question: 'In Pandas, what is the key difference between df.dropna() and df.fillna()?',
      options: [
        { id: 'A', text: 'dropna() eliminates rows or columns containing missing values; fillna() replaces missing values with a designated constant or statistic.' },
        { id: 'B', text: 'fillna() drops null values, while dropna() replaces them.' },
        { id: 'C', text: 'dropna() only works on integer columns.' },
        { id: 'D', text: 'Both modify data in place without returning a DataFrame.' }
      ],
      correct: 'A',
      explanation: 'dropna() filters out null (NaN) records based on axis parameters. fillna() preserves the dataset shape by imputing missing values with specified values, such as column medians, means, forward-fill, or placeholder constants.'
    },
    {
      id: 3,
      category: 'Data Analytics & Matplotlib',
      difficulty: 'Intermediate',
      question: 'In statistical exploratory data analysis, how does the Interquartile Range (IQR) rule identify numerical outliers?',
      options: [
        { id: 'A', text: 'Values falling below Q1 - 1.5 * IQR or above Q3 + 1.5 * IQR.' },
        { id: 'B', text: 'Any value greater than the sample mean.' },
        { id: 'C', text: 'Any value with an odd number of digits.' },
        { id: 'D', text: 'Values within the top 50% percentile.' }
      ],
      correct: 'A',
      explanation: 'IQR is computed as Q3 - Q1 (the range of the middle 50% of sorted data). Tukey outlier thresholds consider points outside [Q1 - 1.5*IQR, Q3 + 1.5*IQR] as mild outliers, and outside 3.0*IQR as extreme outliers.'
    },
    {
      id: 4,
      category: 'Data Analytics & Matplotlib',
      difficulty: 'Intermediate',
      question: 'What is a major advantage of Seaborn over vanilla Matplotlib for data visualization?',
      options: [
        { id: 'A', text: 'Seaborn natively accepts tidy Pandas DataFrames, handling statistical aggregations and color mappings automatically.' },
        { id: 'B', text: 'Seaborn does not require Python.' },
        { id: 'C', text: 'Seaborn renders exclusively in 3D WebGL.' },
        { id: 'D', text: 'Seaborn cannot produce scatter plots.' }
      ],
      correct: 'A',
      explanation: 'Seaborn builds directly on Matplotlib with high-level semantic APIs. Passing DataFrame columns directly to hue, style, and size parameters produces publication-ready statistical visualizations with automatic legends and confidence intervals.'
    },
    {
      id: 5,
      category: 'Data Analytics & Matplotlib',
      difficulty: 'Intermediate',
      question: 'What does a Pearson correlation coefficient of r = -0.87 between two continuous variables indicate?',
      options: [
        { id: 'A', text: 'A strong negative linear association, but does not prove direct causality.' },
        { id: 'B', text: 'Zero relationship between the variables.' },
        { id: 'C', text: 'Variable X causes Variable Y to decrease.' },
        { id: 'D', text: 'A calculation error because correlation cannot be negative.' }
      ],
      correct: 'A',
      explanation: 'Pearson correlation ranges from -1.0 to +1.0. A score of -0.87 indicates a strong linear tendency for Y to decrease as X increases. However, correlation does not establish causation without controlled experimental evidence.'
    },
    {
      id: 6,
      category: 'Data Analytics & Matplotlib',
      difficulty: 'Intermediate',
      question: 'In Pandas, what does df.groupby("department")["salary"].agg(["mean", "median", "std"]) produce?',
      options: [
        { id: 'A', text: 'A multi-column summary DataFrame detailing mean, median, and standard deviation of salary per department.' },
        { id: 'B', text: 'A 1D numpy array containing department names.' },
        { id: 'C', text: 'An error because multiple aggregation functions cannot be passed to agg().' },
        { id: 'D', text: 'A single integer representing total company payroll.' }
      ],
      correct: 'A',
      explanation: 'Passing a list of statistical functions to agg() performs split-apply-combine, computing each specified metric independently across the grouped category subsets and returning an aggregated DataFrame.'
    },
    {
      id: 7,
      category: 'Data Analytics & Matplotlib',
      difficulty: 'Intermediate',
      question: 'How do you create a 2x2 grid of subplots using Matplotlib modern object-oriented API?',
      options: [
        { id: 'A', text: 'fig, axes = plt.subplots(2, 2)' },
        { id: 'B', text: 'plt.make_grid(rows=2, cols=2)' },
        { id: 'C', text: 'fig = plt.multi_plot([2, 2])' },
        { id: 'D', text: 'axes = plt.quadrant()' }
      ],
      correct: 'A',
      explanation: 'plt.subplots(2, 2) instantiates a Figure and returns a 2x2 NumPy array of Axes objects (axes[row, col]), allowing clean iterative plotting across multiple subpanels.'
    },
    {
      id: 8,
      category: 'Data Analytics & Matplotlib',
      difficulty: 'Intermediate',
      question: 'What relationship between Mean and Median is characteristic of a Right-Skewed (positively skewed) distribution?',
      options: [
        { id: 'A', text: 'Mean is greater than Median, as extreme high values pull the arithmetic average rightward.' },
        { id: 'B', text: 'Median is greater than Mean.' },
        { id: 'C', text: 'Mean and Median are strictly identical.' },
        { id: 'D', text: 'Standard deviation is zero.' }
      ],
      correct: 'A',
      explanation: 'In a right-skewed distribution (e.g. household income), the long right tail of extreme values inflates the Mean, while the Median remains resistant, remaining lower than the Mean.'
    },
    {
      id: 9,
      category: 'Data Analytics & Matplotlib',
      difficulty: 'Intermediate',
      question: 'When should One-Hot Encoding be chosen over Ordinal Encoding for categorical features?',
      options: [
        { id: 'A', text: 'When categories are nominal with no natural ranking or hierarchical order (e.g. Country, Department).' },
        { id: 'B', text: 'When categories represent education levels (High School < Bachelor < Master).' },
        { id: 'C', text: 'When the feature contains continuous floating point values.' },
        { id: 'D', text: 'When the cardinality of the column is greater than 1,000,000 unique values.' }
      ],
      correct: 'A',
      explanation: 'Ordinal encoding assigns integers (0, 1, 2) which implies a spurious mathematical ordering (2 > 1). One-Hot Encoding creates binary indicator columns, avoiding artificial order assumptions on nominal data.'
    },
    {
      id: 10,
      category: 'Data Analytics & Matplotlib',
      difficulty: 'Intermediate',
      question: 'Which Matplotlib command properly saves a high-resolution image without clipping axis labels or legends?',
      options: [
        { id: 'A', text: 'plt.savefig("chart.png", dpi=300, bbox_inches="tight")' },
        { id: 'B', text: 'plt.export("chart.png")' },
        { id: 'C', text: 'fig.download("chart.png", high_res=True)' },
        { id: 'D', text: 'plt.render("chart.png")' }
      ],
      correct: 'A',
      explanation: 'plt.savefig() takes dpi=300 for crisp publication quality, and bbox_inches="tight" dynamically adjusts the figure canvas boundaries so outside tick labels and legends are not cropped.'
    },
    {
      id: 11,
      category: 'Data Analytics & Matplotlib',
      difficulty: 'Intermediate',
      question: 'In Pandas, what is the default join operation performed by pd.merge(df1, df2, on="key")?',
      options: [
        { id: 'A', text: 'Inner join (retains only rows with matching keys in both DataFrames).' },
        { id: 'B', text: 'Outer join (retains all rows from both tables).' },
        { id: 'C', text: 'Left join.' },
        { id: 'D', text: 'Cross join / Cartesian product.' }
      ],
      correct: 'A',
      explanation: 'By default, pd.merge uses how="inner", retaining only records that have intersecting key values across both input DataFrames.'
    },
    {
      id: 12,
      category: 'Data Analytics & Matplotlib',
      difficulty: 'Intermediate',
      question: 'What is the key functional difference between a Histogram and a Bar Chart?',
      options: [
        { id: 'A', text: 'Histograms show the continuous frequency distribution of numerical bins; Bar Charts compare discrete categorical values.' },
        { id: 'B', text: 'Histograms are only plotted horizontally.' },
        { id: 'C', text: 'Bar charts cannot display numerical counts.' },
        { id: 'D', text: 'Histograms require a machine learning model.' }
      ],
      correct: 'A',
      explanation: 'A histogram groups continuous quantitative data into adjacent numerical bins (with no gaps between bars) to reveal data shape. A bar chart represents distinct discrete categorical items with spaced bars.'
    },
    {
      id: 13,
      category: 'Data Analytics & Matplotlib',
      difficulty: 'Intermediate',
      question: 'When creating a correlation heatmap with Seaborn: sns.heatmap(df.corr(), annot=True), what does annot=True do?',
      options: [
        { id: 'A', text: 'Displays the numerical correlation coefficients inside each cell.' },
        { id: 'B', text: 'Hides negative correlation values.' },
        { id: 'C', text: 'Converts the heatmap into a scatter plot.' },
        { id: 'D', text: 'Inverts the color palette automatically.' }
      ],
      correct: 'A',
      explanation: 'annot=True writes the actual numerical values from the matrix into each respective colored rectangle cell, providing immediate numeric and visual inspection.'
    },
    {
      id: 14,
      category: 'Data Analytics & Matplotlib',
      difficulty: 'Advanced',
      question: 'Why are vectorized operations in Pandas/NumPy substantially faster than iterating with Python for loops (e.g. iterrows)?',
      options: [
        { id: 'A', text: 'Vectorized operations delegate execution to pre-compiled C/Fortran routines utilizing contiguous memory and SIMD processor instructions.' },
        { id: 'B', text: 'Python for-loops disable CPU cache memory.' },
        { id: 'C', text: 'Vectorized code runs in the cloud automatically.' },
        { id: 'D', text: 'Iterrows creates separate processes for every row.' }
      ],
      correct: 'A',
      explanation: 'Python for-loops incur dynamic type-checking and interpreter overhead on every iteration. Vectorized operations run compiled C code operating across contiguous memory buffers, enabling SIMD parallelization and hardware acceleration.'
    },
    {
      id: 15,
      category: 'Data Analytics & Matplotlib',
      difficulty: 'Intermediate',
      question: 'In a standard Box Plot (Box-and-Whisker), what statistical metric is represented by the line inside the box?',
      options: [
        { id: 'A', text: 'The Median (50th percentile).' },
        { id: 'B', text: 'The Arithmetic Mean.' },
        { id: 'C', text: 'The Standard Deviation.' },
        { id: 'D', text: 'The Maximum value.' }
      ],
      correct: 'A',
      explanation: 'The box in a box plot spans the 25th percentile (Q1) to the 75th percentile (Q3). The solid line traversing the interior of the box marks the sample Median (Q2).'
    }
  ],
  'nlp': [
    {
      id: 1,
      category: 'Natural Language Processing',
      difficulty: 'Intermediate',
      question: 'What is the role of Tokenization in an NLP preprocessing pipeline?',
      options: [
        { id: 'A', text: 'Segmenting raw text strings into discrete atomic units (tokens) such as words, subwords, or characters.' },
        { id: 'B', text: 'Translating text into binary machine code.' },
        { id: 'C', text: 'Checking spelling and grammatical syntax.' },
        { id: 'D', text: 'Encrypting documents for secure API transmission.' }
      ],
      correct: 'A',
      explanation: 'Tokenization is the first essential step in NLP, breaking continuous unstructured text strings into discrete lexical items (tokens) that downstream algorithms, vectorizers, and models can process.'
    },
    {
      id: 2,
      category: 'Natural Language Processing',
      difficulty: 'Intermediate',
      question: 'Why is Lemmatization generally preferred over Stemming when linguistic precision is required?',
      options: [
        { id: 'A', text: 'Lemmatization utilizes morphological vocabulary analysis to produce valid root dictionary words (lemmas); stemming uses heuristic chopping.' },
        { id: 'B', text: 'Stemming only works on verbs, while lemmatization works only on nouns.' },
        { id: 'C', text: 'Stemming is much slower than lemmatization.' },
        { id: 'D', text: 'Lemmatization does not require part-of-speech context.' }
      ],
      correct: 'A',
      explanation: 'Stemming applies heuristic rules that chop word endings, often resulting in non-words. Lemmatization analyzes morphology and part-of-speech to return legitimate dictionary base forms ("better" -> "good").'
    },
    {
      id: 3,
      category: 'Natural Language Processing',
      difficulty: 'Intermediate',
      question: 'In NLTK, why are Stopwords commonly removed during text classification preprocessing?',
      options: [
        { id: 'A', text: 'High-frequency function words (e.g. "the", "is", "at") carry negligible domain-specific sentiment or topical distinction.' },
        { id: 'B', text: 'Stopwords cause segmentation faults in text tokenizers.' },
        { id: 'C', text: 'Stopwords are non-ASCII characters.' },
        { id: 'D', text: 'Removing stopwords increases vocabulary size.' }
      ],
      correct: 'A',
      explanation: 'Stopwords occur abundantly across all text categories, dominating frequency counts without providing discriminatory semantic signal. Removing them reduces vocabulary dimensionality and focuses models on content words.'
    },
    {
      id: 4,
      category: 'Natural Language Processing',
      difficulty: 'Intermediate',
      question: 'What does a high TF-IDF score for a word in a specific document signify?',
      options: [
        { id: 'A', text: 'The word appears frequently within that document but rarely across the wider collection of documents, making it highly descriptive.' },
        { id: 'B', text: 'The word is a common stopword across all documents.' },
        { id: 'C', text: 'The word is spelled incorrectly.' },
        { id: 'D', text: 'The word has multiple dictionary definitions.' }
      ],
      correct: 'A',
      explanation: 'TF-IDF balances local Term Frequency against Inverse Document Frequency. A word that appears frequently in one text while being scarce across the rest of the corpus receives a high weight, identifying key distinguishing topical terms.'
    },
    {
      id: 5,
      category: 'Natural Language Processing',
      difficulty: 'Intermediate',
      question: 'What was the major breakthrough of Dense Word Embeddings (Word2Vec / GloVe) compared to traditional One-Hot Bag-of-Words?',
      options: [
        { id: 'A', text: 'Words are mapped into dense continuous vector spaces where geometric proximity and vector arithmetic reflect semantic relationships.' },
        { id: 'B', text: 'Embeddings eliminate the need for training neural networks.' },
        { id: 'C', text: 'One-hot encoding was incapable of storing strings.' },
        { id: 'D', text: 'Embeddings guarantee 100% classification accuracy.' }
      ],
      correct: 'A',
      explanation: 'One-hot vectors are sparse, orthogonal, and treat all word pairs as equally distant. Word embeddings map words into low-dimensional continuous spaces where semantic concepts cluster together (king - man + woman = queen).'
    },
    {
      id: 6,
      category: 'Natural Language Processing',
      difficulty: 'Intermediate',
      question: 'In language modeling, what constitutes a "trigram"?',
      options: [
        { id: 'A', text: 'A contiguous sequence of 3 tokens extracted from a given text.' },
        { id: 'B', text: 'A word with three syllables.' },
        { id: 'C', text: 'A triangular vocabulary matrix.' },
        { id: 'D', text: 'A sentence containing exactly three nouns.' }
      ],
      correct: 'A',
      explanation: 'An n-gram is a contiguous slice of n items from a text sequence. A unigram has 1 token, a bigram has 2, and a trigram has 3 (e.g. "natural language processing").'
    },
    {
      id: 7,
      category: 'Natural Language Processing',
      difficulty: 'Advanced',
      question: 'In modern Transformer models, what capability does the Self-Attention mechanism unlock?',
      options: [
        { id: 'A', text: 'Allows every word token to dynamically attend to and weigh every other token in the sequence regardless of distance, in parallel.' },
        { id: 'B', text: 'Forces sentences to be processed sequentially one word at a time.' },
        { id: 'C', text: 'Prevents models from using multi-head projections.' },
        { id: 'D', text: 'Eliminates matrix multiplications entirely.' }
      ],
      correct: 'A',
      explanation: 'Self-attention resolves the bottleneck of recurrent models (which process tokens one-by-one). It computes all pairwise token interactions in parallel, allowing words to capture contextual meaning across arbitrary sequence spans.'
    },
    {
      id: 8,
      category: 'Natural Language Processing',
      difficulty: 'Advanced',
      question: 'What is the architectural and pre-training distinction between BERT and autoregressive models like GPT?',
      options: [
        { id: 'A', text: 'BERT is a bidirectional masked language model encoder; GPT is a unidirectional causal autoregressive decoder.' },
        { id: 'B', text: 'BERT cannot process English text.' },
        { id: 'C', text: 'GPT does not use Transformer attention.' },
        { id: 'D', text: 'BERT generates output text token-by-token from left to right.' }
      ],
      correct: 'A',
      explanation: 'BERT uses the Transformer encoder, attending to both left and right context simultaneously to predict masked tokens. GPT uses causal masked decoders, predicting the next token strictly from previous left tokens, making it ideal for generation.'
    },
    {
      id: 9,
      category: 'Natural Language Processing',
      difficulty: 'Intermediate',
      question: 'What objective does a Named Entity Recognition (NER) pipeline fulfill?',
      options: [
        { id: 'A', text: 'Locating and classifying entities in unstructured text into categories such as Persons, Organizations, Locations, and Dates.' },
        { id: 'B', text: 'Renaming variables in Python source code.' },
        { id: 'C', text: 'Translating English text into French.' },
        { id: 'D', text: 'Compressing text documents into ZIP files.' }
      ],
      correct: 'A',
      explanation: 'NER is an information extraction task that scans text to tag spans referencing real-world entities (e.g. "Google" -> ORG, "London" -> LOC, "2026" -> DATE).'
    },
    {
      id: 10,
      category: 'Natural Language Processing',
      difficulty: 'Intermediate',
      question: 'In NLTK, what information does nltk.pos_tag(tokens) provide?',
      options: [
        { id: 'A', text: 'Tuples mapping each word token to its syntactic Part-of-Speech tag (e.g. NN for noun, VB for verb).' },
        { id: 'B', text: 'Sentiment scores ranging from -1 to +1.' },
        { id: 'C', text: 'Character coordinates of tokens in the original document.' },
        { id: 'D', text: 'The language identity of each word.' }
      ],
      correct: 'A',
      explanation: 'nltk.pos_tag() runs a pre-trained part-of-speech tagger, annotating tokens with Penn Treebank tags like NN (singular noun), NNS (plural noun), VB (verb base form), and JJ (adjective).'
    },
    {
      id: 11,
      category: 'Natural Language Processing',
      difficulty: 'Advanced',
      question: 'In language model evaluation, what does a lower Perplexity score indicate?',
      options: [
        { id: 'A', text: 'The model predicts the test text sequence with greater probability and lower uncertainty.' },
        { id: 'B', text: 'The model has overfitted and failed completely.' },
        { id: 'C', text: 'The model output is incomprehensible.' },
        { id: 'D', text: 'The sequence length is too short.' }
      ],
      correct: 'A',
      explanation: 'Perplexity is the exponentiated cross-entropy loss of the sequence. Lower perplexity means the language model is less surprised by the sample text, assigning higher probabilities to true test tokens.'
    },
    {
      id: 12,
      category: 'Natural Language Processing',
      difficulty: 'Intermediate',
      question: 'How do subword tokenization algorithms (Byte-Pair Encoding, WordPiece) overcome the Out-Of-Vocabulary (OOV) problem?',
      options: [
        { id: 'A', text: 'Decomposing rare or unseen words into known subword constituent units and individual characters.' },
        { id: 'B', text: 'Replacing all unseen words with random numbers.' },
        { id: 'C', text: 'Ignoring any sentence that contains an unknown word.' },
        { id: 'D', text: 'Expanding dictionary memory to infinity.' }
      ],
      correct: 'A',
      explanation: 'Subword tokenization learns frequent subword fragments (e.g. "play", "##ing"). If a novel word like "unplayable" appears, it decomposes into known fragments ["un", "play", "able"], preventing unknown token [UNK] degradation.'
    },
    {
      id: 13,
      category: 'Natural Language Processing',
      difficulty: 'Intermediate',
      question: 'Which NLP evaluation benchmark relies primarily on the BLEU metric?',
      options: [
        { id: 'A', text: 'Machine Translation and text generation against human reference texts.' },
        { id: 'B', text: 'Named Entity Recognition recall.' },
        { id: 'C', text: 'Speech-to-text audio sampling rate.' },
        { id: 'D', text: 'Database query execution speed.' }
      ],
      correct: 'A',
      explanation: 'BLEU evaluates candidate machine translation against reference human translations by computing n-gram precision penalized for brevity, scoring similarity between 0 and 1.'
    },
    {
      id: 14,
      category: 'Natural Language Processing',
      difficulty: 'Intermediate',
      question: 'In text classification, how does a Softmax output layer transform raw model logits?',
      options: [
        { id: 'A', text: 'Applies exponentiation and normalizes logits into a valid probability distribution that sums strictly to 1.0.' },
        { id: 'B', text: 'Rounds all values to 0 or 1.' },
        { id: 'C', text: 'Sorts tokens in alphabetical order.' },
        { id: 'D', text: 'Multiplies logits by word count.' }
      ],
      correct: 'A',
      explanation: 'The Softmax function e^(z_i) / sum(e^(z_j)) converts unconstrained real-valued logits into non-negative probabilities summing to 1.0, enabling probabilistic classification and cross-entropy optimization.'
    },
    {
      id: 15,
      category: 'Natural Language Processing',
      difficulty: 'Advanced',
      question: 'Why do Transformer architectures strictly require Positional Encodings added to input token embeddings?',
      options: [
        { id: 'A', text: 'Transformers process all sequence tokens concurrently without recurrence, so positional embeddings provide word order awareness.' },
        { id: 'B', text: 'To encrypt token embeddings against adversarial attacks.' },
        { id: 'C', text: 'To force all sentences to have identical byte sizes.' },
        { id: 'D', text: 'To prevent attention matrices from being square.' }
      ],
      correct: 'A',
      explanation: 'Because the self-attention operation is permutation-invariant, shuffling the words in a sentence would yield identical attention results without positional encodings injected to signal token order.'
    }
  ],
  'tensorflow-keras': [
    {
      id: 1,
      category: 'TensorFlow & Keras',
      difficulty: 'Intermediate',
      question: 'When is the Keras Functional API strictly required instead of the Sequential model API?',
      options: [
        { id: 'A', text: 'When designing architectures with multiple inputs, multiple outputs, shared layers, or non-linear residual skip connections.' },
        { id: 'B', text: 'When training on a GPU rather than a CPU.' },
        { id: 'C', text: 'When using Adam optimizer.' },
        { id: 'D', text: 'When the dataset has fewer than 100 rows.' }
      ],
      correct: 'A',
      explanation: 'The Sequential API only supports linear stacks of single-input, single-output layers. Complex architectures (ResNet skip connections, multi-branch inputs like text + tabular, or multi-task prediction heads) require the Functional API or model subclassing.'
    },
    {
      id: 2,
      category: 'TensorFlow & Keras',
      difficulty: 'Intermediate',
      question: 'In TensorFlow/Keras, what are the three indispensable arguments passed to model.compile()?',
      options: [
        { id: 'A', text: 'optimizer, loss, and metrics.' },
        { id: 'B', text: 'epochs, batch_size, and validation_split.' },
        { id: 'C', text: 'layers, weights, and biases.' },
        { id: 'D', text: 'learning_rate, momentum, and decay.' }
      ],
      correct: 'A',
      explanation: 'model.compile(optimizer=..., loss=..., metrics=[...]) configures the learning process before training begins by binding the gradient optimization algorithm, loss objective function, and performance evaluation metrics.'
    },
    {
      id: 3,
      category: 'TensorFlow & Keras',
      difficulty: 'Intermediate',
      question: 'What is the primary objective of the EarlyStopping callback in Keras during model.fit()?',
      options: [
        { id: 'A', text: 'Monitoring a validation metric and halting training when improvement ceases, preventing overfitting and saving compute.' },
        { id: 'B', text: 'Stopping execution if the computer overheats.' },
        { id: 'C', text: 'Terminating the process immediately after epoch 1.' },
        { id: 'D', text: 'Resetting model weights to zero.' }
      ],
      correct: 'A',
      explanation: 'tf.keras.callbacks.EarlyStopping monitors a metric (such as val_loss) with a patience parameter. If the metric fails to improve for patience epochs, training terminates early and optionally restores the best weights.'
    },
    {
      id: 4,
      category: 'TensorFlow & Keras',
      difficulty: 'Intermediate',
      question: 'How does callbacks.ModelCheckpoint(save_best_only=True) protect against saving degraded model weights?',
      options: [
        { id: 'A', text: 'Overwrites the checkpoint file only when the monitored validation loss achieves a new minimum.' },
        { id: 'B', text: 'Saves weights only on the very last epoch.' },
        { id: 'C', text: 'Compresses files into ZIP archives.' },
        { id: 'D', text: 'Deletes weights if validation accuracy falls below 50%.' }
      ],
      correct: 'A',
      explanation: 'ModelCheckpoint with save_best_only=True checks whether the latest epoch achieved a superior monitored metric (e.g. lower val_loss). If not, the file on disk remains untouched, ensuring you retain optimal model weights.'
    },
    {
      id: 5,
      category: 'TensorFlow & Keras',
      difficulty: 'Intermediate',
      question: 'In TensorFlow, what does the tensor shape (None, 224, 224, 3) signify for image input models?',
      options: [
        { id: 'A', text: 'Dynamic/variable batch size (None), followed by 224 height, 224 width, and 3 RGB color channels.' },
        { id: 'B', text: 'An image with no height or width.' },
        { id: 'C', text: 'A corrupted tensor with missing values.' },
        { id: 'D', text: 'A 2D matrix of shape 224x224.' }
      ],
      correct: 'A',
      explanation: 'In TensorFlow NHWC conventions, the leading dimension represents batch size (represented as None in symbolic graphs to accept arbitrary batch sizes during inference or training), followed by height, width, and channels.'
    },
    {
      id: 6,
      category: 'TensorFlow & Keras',
      difficulty: 'Advanced',
      question: 'How does tf.GradientTape() execute automatic differentiation in custom TensorFlow training loops?',
      options: [
        { id: 'A', text: 'Records all forward operations on tracked tensors within its context and calculates exact gradients via reverse-mode automatic differentiation.' },
        { id: 'B', text: 'Saves computation graphs to magnetic tape backups.' },
        { id: 'C', text: 'Approximates derivatives using finite differences.' },
        { id: 'D', text: 'Disables GPU memory allocation.' }
      ],
      correct: 'A',
      explanation: 'Inside with tf.GradientTape() as tape:, TensorFlow logs all operations performed on trainable tf.Variable objects onto an internal tape. Calling tape.gradient(loss, model.trainable_variables) computes derivatives efficiently via reverse-mode autodiff.'
    },
    {
      id: 7,
      category: 'TensorFlow & Keras',
      difficulty: 'Intermediate',
      question: 'When should sparse_categorical_crossentropy be chosen over categorical_crossentropy in Keras?',
      options: [
        { id: 'A', text: 'When target class labels are integers (e.g. [0, 1, 2]) rather than one-hot encoded vectors (e.g. [[1,0,0], [0,1,0]]).' },
        { id: 'B', text: 'When the dataset has fewer than 10 samples.' },
        { id: 'C', text: 'When working with binary classification.' },
        { id: 'D', text: 'When using regression models.' }
      ],
      correct: 'A',
      explanation: 'Both calculate identical cross-entropy losses, but sparse_categorical_crossentropy accepts integer label arrays directly, eliminating the memory and computation overhead of generating large one-hot matrices.'
    },
    {
      id: 8,
      category: 'TensorFlow & Keras',
      difficulty: 'Advanced',
      question: 'What performance benefit does dataset.prefetch(tf.data.AUTOTUNE) deliver in tf.data input pipelines?',
      options: [
        { id: 'A', text: 'Overlaps CPU data preprocessing with GPU model computation to eliminate GPU idle starvation.' },
        { id: 'B', text: 'Loads the entire dataset into RAM at once.' },
        { id: 'C', text: 'Increases model parameter count.' },
        { id: 'D', text: 'Compresses image files.' }
      ],
      correct: 'A',
      explanation: 'Prefetching decouples data preparation from model execution. While the GPU is training step N, the CPU concurrently prepares and buffers the batch for step N+1, preventing GPU starvation and maximizing throughput.'
    },
    {
      id: 9,
      category: 'TensorFlow & Keras',
      difficulty: 'Intermediate',
      question: 'How does tf.keras.optimizers.schedules.ExponentialDecay adapt the learning rate during training?',
      options: [
        { id: 'A', text: 'Reduces the learning rate by multiplying by a decay rate factor at specified training step intervals.' },
        { id: 'B', text: 'Increases learning rate exponentially to infinity.' },
        { id: 'C', text: 'Maintains a strictly static learning rate throughout.' },
        { id: 'D', text: 'Randomly fluctuates learning rate every batch.' }
      ],
      correct: 'A',
      explanation: 'ExponentialDecay computes: lr = initial_lr * (decay_rate ^ (step / decay_steps)). As training progresses, the learning rate decreases steadily to facilitate fine convergence toward minimum loss basins.'
    },
    {
      id: 10,
      category: 'TensorFlow & Keras',
      difficulty: 'Intermediate',
      question: 'In transfer learning, what does tf.keras.applications.ResNet50(include_top=False) accomplish?',
      options: [
        { id: 'A', text: 'Excludes the final 1000-class fully-connected classification head, allowing attachment of custom task layers.' },
        { id: 'B', text: 'Deletes the first convolutional layer.' },
        { id: 'C', text: 'Disables all residual skip connections.' },
        { id: 'D', text: 'Loads uninitialized random weights.' }
      ],
      correct: 'A',
      explanation: 'include_top=False drops the final dense classification layer of ImageNet backbones, giving developers the convolutional feature extraction base onto which custom GlobalAveragePooling and dense heads can be attached.'
    },
    {
      id: 11,
      category: 'TensorFlow & Keras',
      difficulty: 'Intermediate',
      question: 'What is the advantage of using tf.keras.layers.RandomFlip and RandomRotation directly inside a model?',
      options: [
        { id: 'A', text: 'Augmentation runs on GPU acceleration during training and is automatically bypassed during model.predict() inference.' },
        { id: 'B', text: 'They double dataset storage on disk.' },
        { id: 'C', text: 'They make model weights permanent.' },
        { id: 'D', text: 'They prevent using batch normalization.' }
      ],
      correct: 'A',
      explanation: 'Keras preprocessing layers embedded inside the model execute on GPU devices, bundle with SavedModel serialization, and have training-aware flags that turn off augmentation during evaluation.'
    },
    {
      id: 12,
      category: 'TensorFlow & Keras',
      difficulty: 'Intermediate',
      question: 'What is the difference between model.save("model.keras") and model.save_weights("weights.h5")?',
      options: [
        { id: 'A', text: 'model.save() saves model architecture, weights, and optimizer state; save_weights() preserves only weight parameter tensors.' },
        { id: 'B', text: 'save_weights() saves source code, while model.save() saves documentation.' },
        { id: 'C', text: 'model.save() works only on CPUs.' },
        { id: 'D', text: 'save_weights() cannot be restored in Python.' }
      ],
      correct: 'A',
      explanation: 'model.save() creates a standalone asset containing full architecture graph, weights, and optimizer state so the model can be resumed without original code. save_weights() requires reinstantiating the exact architecture in code first.'
    },
    {
      id: 13,
      category: 'TensorFlow & Keras',
      difficulty: 'Advanced',
      question: 'When creating a custom layer by subclassing tf.keras.layers.Layer, which method defines trainable weight variables?',
      options: [
        { id: 'A', text: 'build(self, input_shape)' },
        { id: 'B', text: 'call(self, inputs)' },
        { id: 'C', text: 'compute_output_shape(self, input_shape)' },
        { id: 'D', text: '__init__(self)' }
      ],
      correct: 'A',
      explanation: 'The build(input_shape) method is called lazily when input shapes are known, allowing dynamic instantiation of weights via self.add_weight(). The call() method defines the forward pass computation.'
    },
    {
      id: 14,
      category: 'TensorFlow & Keras',
      difficulty: 'Intermediate',
      question: 'How do you attach TensorBoard visualization logging to a model.fit() training routine?',
      options: [
        { id: 'A', text: 'Pass tf.keras.callbacks.TensorBoard(log_dir="./logs") to the callbacks list.' },
        { id: 'B', text: 'Set tensorboard=True in model.compile().' },
        { id: 'C', text: 'Call plt.tensorboard().' },
        { id: 'D', text: 'Import tensorboard into index.html.' }
      ],
      correct: 'A',
      explanation: 'Attaching the TensorBoard callback logs scalar losses, metric curves, histogram weight distributions, and computational graphs to the target log directory for inspection in the TensorBoard dashboard.'
    },
    {
      id: 15,
      category: 'TensorFlow & Keras',
      difficulty: 'Advanced',
      question: 'What does tf.function decorator do when applied to a Python function in TensorFlow 2.x?',
      options: [
        { id: 'A', text: 'Converts eager Python code into an optimized, high-performance static computation graph (AutoGraph).' },
        { id: 'B', text: 'Translates Python into JavaScript.' },
        { id: 'C', text: 'Restricts the function to single-threaded CPU execution.' },
        { id: 'D', text: 'Automatically sets learning rate to 0.001.' }
      ],
      correct: 'A',
      explanation: '@tf.function parses Python code and builds an optimized TensorFlow computation graph. This provides dramatic speed improvements, operator fusion, and device scheduling advantages over eager execution.'
    }
  ],
  'bi-analytics': [
    {
      id: 1,
      category: 'Power BI, Tableau & Excel',
      difficulty: 'Intermediate',
      question: 'In Power BI, why are DAX Measures preferred over Calculated Columns for aggregations?',
      options: [
        { id: 'A', text: 'Measures evaluate dynamically in CPU memory based on visual filter context without consuming disk storage or RAM.' },
        { id: 'B', text: 'Calculated columns cannot compute sums.' },
        { id: 'C', text: 'Measures only work on text data.' },
        { id: 'D', text: 'Calculated columns run twice as fast.' }
      ],
      correct: 'A',
      explanation: 'Calculated columns are evaluated row-by-row during data refresh and stored statically in the tabular model (consuming RAM and disk). DAX Measures compute on the fly responding dynamically to slicers and visual filters.'
    },
    {
      id: 2,
      category: 'Power BI, Tableau & Excel',
      difficulty: 'Intermediate',
      question: 'What constitutes the architecture of a Star Schema data model in Power BI and BI warehouses?',
      options: [
        { id: 'A', text: 'A central Fact table containing numeric metrics surrounded by Dimension tables containing descriptive attributes.' },
        { id: 'B', text: 'A single flat denormalized 500-column Excel sheet.' },
        { id: 'C', text: 'A circular linked list of tables.' },
        { id: 'D', text: 'Multiple Fact tables with no relationships.' }
      ],
      correct: 'A',
      explanation: 'Star schemas feature a central Fact table (transactions, sales, measurements) connected via 1-to-many relationships to Dimension tables (customers, products, calendar). This optimizes tabular engine performance and DAX simplicity.'
    },
    {
      id: 3,
      category: 'Power BI, Tableau & Excel',
      difficulty: 'Intermediate',
      question: 'What is the underlying functional language utilized for ETL and data transformations in Power Query?',
      options: [
        { id: 'A', text: 'M Language (Power Query Formula Language).' },
        { id: 'B', text: 'VBA.' },
        { id: 'C', text: 'Transact-SQL.' },
        { id: 'D', text: 'DAX.' }
      ],
      correct: 'A',
      explanation: 'Power Query uses the functional, case-sensitive M language behind the GUI to define repeatable ETL step pipelines (cleaning, merging, pivoting, type transformations) before data loads into the model.'
    },
    {
      id: 4,
      category: 'Power BI, Tableau & Excel',
      difficulty: 'Advanced',
      question: 'In Tableau, what is the behavior of a FIXED Level of Detail (LOD) expression?',
      options: [
        { id: 'A', text: 'Computes an aggregation using only the specified dimensions, completely independent of the dimensions in the visual view.' },
        { id: 'B', text: 'Fixes the axis range so it cannot zoom.' },
        { id: 'C', text: 'Only runs on date fields.' },
        { id: 'D', text: 'Calculates values after the view filter is applied.' }
      ],
      correct: 'A',
      explanation: '{FIXED [Region] : SUM([Sales])} calculates sales aggregated at the Region level regardless of whether State, City, or Category are present in the visualization. It executes before dimension filters in Tableau order of operations.'
    },
    {
      id: 5,
      category: 'Power BI, Tableau & Excel',
      difficulty: 'Intermediate',
      question: 'In Tableau, what is the fundamental difference between Dimensions and Measures?',
      options: [
        { id: 'A', text: 'Dimensions contain qualitative/categorical values that slice data (creating headers); Measures contain quantitative numeric values that can be aggregated.' },
        { id: 'B', text: 'Dimensions are always green, while Measures are always blue.' },
        { id: 'C', text: 'Measures cannot be used in formulas.' },
        { id: 'D', text: 'Dimensions are generated exclusively from SQL databases.' }
      ],
      correct: 'A',
      explanation: 'Dimensions set the granularity or level of detail for a view (e.g. Region, Product Name). Measures provide numeric values (e.g. Profit, Sales, Quantity) that Tableau aggregates via SUM, AVG, COUNT.'
    },
    {
      id: 6,
      category: 'Power BI, Tableau & Excel',
      difficulty: 'Intermediate',
      question: 'Why is modern Excel XLOOKUP considered superior to legacy VLOOKUP?',
      options: [
        { id: 'A', text: 'XLOOKUP can search to the left or right, defaults to exact match, and does not break when columns are inserted or deleted.' },
        { id: 'B', text: 'XLOOKUP requires knowing the exact column index number.' },
        { id: 'C', text: 'VLOOKUP is faster on large datasets.' },
        { id: 'D', text: 'XLOOKUP only works on numbers.' }
      ],
      correct: 'A',
      explanation: 'VLOOKUP requires the lookup column to be the leftmost column and uses static column index numbers that break upon layout edits. XLOOKUP accepts distinct lookup and return arrays, searches in any direction, and includes native if_not_found handling.'
    },
    {
      id: 7,
      category: 'Power BI, Tableau & Excel',
      difficulty: 'Intermediate',
      question: 'Why should Many-to-Many relationships generally be avoided or bridged in Power BI data modeling?',
      options: [
        { id: 'A', text: 'They introduce ambiguous cross-filtering paths, potential duplicate counting, and significant performance overhead.' },
        { id: 'B', text: 'Power BI crashes when many-to-many relationships are created.' },
        { id: 'C', text: 'They prevent creating bar charts.' },
        { id: 'D', text: 'They convert integers to text.' }
      ],
      correct: 'A',
      explanation: 'Many-to-many relationships cannot determine unique row lineages, creating ambiguous filter propagation and Cartesian explosions. Standard practice introduces a dedicated bridge table to establish two clean 1-to-many relationships.'
    },
    {
      id: 8,
      category: 'Power BI, Tableau & Excel',
      difficulty: 'Intermediate',
      question: 'How does Row-Level Security (RLS) restrict data access in Power BI reports?',
      options: [
        { id: 'A', text: 'Filters are applied at the tabular model layer based on user roles and USERPRINCIPALNAME() DAX expressions.' },
        { id: 'B', text: 'Hiding pages with passwords.' },
        { id: 'C', text: 'Encrypting report PDF exports.' },
        { id: 'D', text: 'Deleting rows from source SQL databases.' }
      ],
      correct: 'A',
      explanation: 'RLS defines roles in Power BI Desktop with DAX filter rules (e.g. [Region] = USERPRINCIPALNAME()). When published to Power BI Service, users viewing the report see only records permitted by their assigned security role.'
    },
    {
      id: 9,
      category: 'Power BI, Tableau & Excel',
      difficulty: 'Intermediate',
      question: 'When is a Table Calculation computed in Tableau order of operations?',
      options: [
        { id: 'A', text: 'After the initial query returns aggregated results from the data source, computed locally across marks in the view.' },
        { id: 'B', text: 'Inside the source database before SQL queries execute.' },
        { id: 'C', text: 'Before extract filters are evaluated.' },
        { id: 'D', text: 'Simultaneously with Context Filters.' }
      ],
      correct: 'A',
      explanation: 'Table calculations (e.g. Running Total, Percent of Total, Rank) are computed on the client side after all data source, extract, context, and dimension filters have executed on the returned aggregated query dataset.'
    },
    {
      id: 10,
      category: 'Power BI, Tableau & Excel',
      difficulty: 'Intermediate',
      question: 'In Excel, why was the combination of INDEX and MATCH widely preferred over legacy VLOOKUP?',
      options: [
        { id: 'A', text: 'It decouples lookup and return columns, allowing leftward lookups and dynamic column insertions without formula breakage.' },
        { id: 'B', text: 'It requires VBA macro permissions.' },
        { id: 'C', text: 'It only works with Pivot Tables.' },
        { id: 'D', text: 'It automatically formats numbers as currency.' }
      ],
      correct: 'A',
      explanation: 'VLOOKUP hardcodes an integer column index offset. INDEX(return_range, MATCH(lookup_val, lookup_range, 0)) provides flexible two-dimensional retrieval in any orientation resilient to column structural rearrangements.'
    },
    {
      id: 11,
      category: 'Power BI, Tableau & Excel',
      difficulty: 'Advanced',
      question: 'In DAX, how does the CALCULATE() function modify filter context?',
      options: [
        { id: 'A', text: 'It evaluates an expression under modified filter parameters, overriding, adding to, or removing existing visual filter context.' },
        { id: 'B', text: 'It only performs basic arithmetic addition.' },
        { id: 'C', text: 'It converts DAX into SQL queries.' },
        { id: 'D', text: 'It deletes filtered rows permanently.' }
      ],
      correct: 'A',
      explanation: 'CALCULATE(Expression, Filter1, Filter2...) is the cornerstone of DAX. It initiates context transition (converting row context to filter context) and modifies existing filter context by injecting or replacing filter criteria.'
    },
    {
      id: 12,
      category: 'Power BI, Tableau & Excel',
      difficulty: 'Intermediate',
      question: 'What is the operational distinction between Import Mode and DirectQuery in Power BI?',
      options: [
        { id: 'A', text: 'Import mode loads compressed data into the VertiPaq in-memory engine; DirectQuery passes queries to the underlying database in real time.' },
        { id: 'B', text: 'DirectQuery is always faster than Import mode.' },
        { id: 'C', text: 'Import mode cannot refresh on schedule.' },
        { id: 'D', text: 'DirectQuery stores all historical data in local browser memory.' }
      ],
      correct: 'A',
      explanation: 'Import mode provides maximum query performance using VertiPaq columnar in-memory compression. DirectQuery avoids data caching by translating visual interactions into live SQL/source queries, suitable for massive real-time datasets.'
    },
    {
      id: 13,
      category: 'Power BI, Tableau & Excel',
      difficulty: 'Intermediate',
      question: 'In Excel, what is the primary benefit of connecting a single Slicer to multiple Pivot Tables via Report Connections?',
      options: [
        { id: 'A', text: 'Enables interactive cross-filtering of multiple analytical summaries simultaneously with a single click.' },
        { id: 'B', text: 'Converts Pivot Tables into static images.' },
        { id: 'C', text: 'Eliminates the underlying data sheet.' },
        { id: 'D', text: 'Requires using Power BI Pro licensing.' }
      ],
      correct: 'A',
      explanation: 'Report Connections links a Slicer or Timeline to multiple Pivot Tables referencing the same data model. Selecting a category dynamically updates all connected dashboards and summary charts synchronously.'
    },
    {
      id: 14,
      category: 'Power BI, Tableau & Excel',
      difficulty: 'Intermediate',
      question: 'What is a Parameter in Tableau and how does it differ from a standard Filter?',
      options: [
        { id: 'A', text: 'A dynamic global workbook variable (number, date, string) that users can manipulate to drive calculations, thresholds, and view state.' },
        { id: 'B', text: 'A tool used exclusively for publishing to Tableau Server.' },
        { id: 'C', text: 'A filter that only works on boolean columns.' },
        { id: 'D', text: 'A column stored in a SQL database.' }
      ],
      correct: 'A',
      explanation: 'Filters directly reduce data points displayed in a view based on column values. Parameters are independent user inputs that can be referenced across multiple calculated fields, top N filters, reference lines, and swap sheets.'
    },
    {
      id: 15,
      category: 'Power BI, Tableau & Excel',
      difficulty: 'Intermediate',
      question: 'What capability does a Drill-Through page provide to Power BI report users?',
      options: [
        { id: 'A', text: 'Allows users to right-click a high-level summary visual and navigate to a dedicated detail page pre-filtered to that selected entity.' },
        { id: 'B', text: 'Exports data directly to raw CSV.' },
        { id: 'C', text: 'Allows editing underlying database rows.' },
        { id: 'D', text: 'Refreshes the entire dataset from scratch.' }
      ],
      correct: 'A',
      explanation: 'Placing a dimension in the Drill-Through field of a target page enables contextual drill-down. When a user right-clicks a customer or product in an overview visual, they can jump to the detail page filtered specifically to that selection.'
    }
  ],
  'python': [
    {
      id: 1,
      category: 'Python Programming',
      difficulty: 'Intermediate',
      question: 'What is the Global Interpreter Lock (GIL) in CPython and how does it impact multi-threaded code?',
      options: [
        { id: 'A', text: 'A mutex that prevents multiple native threads from executing Python bytecode simultaneously, limiting CPU-bound threads to a single core.' },
        { id: 'B', text: 'A security feature that blocks network requests from untrusted threads.' },
        { id: 'C', text: 'A garbage collection mechanism that pauses execution during memory allocation.' },
        { id: 'D', text: 'A compiler flag that disables function recursion.' }
      ],
      correct: 'A',
      explanation: 'The CPython GIL ensures thread safety by allowing only one thread to hold the Python interpreter lock at any moment. While beneficial for I/O-bound tasks, CPU-intensive parallel processing requires multiprocessing rather than threading.'
    },
    {
      id: 2,
      category: 'Python Programming',
      difficulty: 'Intermediate',
      question: 'Why do Python Generators (using yield) provide superior memory efficiency when iterating large datasets?',
      options: [
        { id: 'A', text: 'They produce items lazily on demand one at a time without storing the entire sequence in RAM.' },
        { id: 'B', text: 'They compress data into gzip format in memory.' },
        { id: 'C', text: 'They run asynchronously in web worker threads.' },
        { id: 'D', text: 'They convert integers to 8-bit bytes.' }
      ],
      correct: 'A',
      explanation: 'Unlike lists that allocate contiguous memory for all elements upfront, generator functions yield items on demand, maintaining state between iterations with O(1) auxiliary memory consumption.'
    },
    {
      id: 3,
      category: 'Python Programming',
      difficulty: 'Intermediate',
      question: 'What is a Python Decorator conceptually and syntactically?',
      options: [
        { id: 'A', text: 'A higher-order callable that takes a function as an argument, wraps or enhances its behavior, and returns a callable.' },
        { id: 'B', text: 'A CSS class used for styling Python output.' },
        { id: 'C', text: 'A type annotation for function return values.' },
        { id: 'D', text: 'A magic method that initializes object attributes.' }
      ],
      correct: 'A',
      explanation: 'The @decorator syntax is syntactic sugar for func = decorator(func). Decorators wrap target callables to execute logging, authentication, timing, or caching without altering the underlying function implementation.'
    },
    {
      id: 4,
      category: 'Python Programming',
      difficulty: 'Intermediate',
      question: 'Why is defining a function with a mutable default argument: def append_item(x, lst=[]) a dangerous bug in Python?',
      options: [
        { id: 'A', text: 'The default list is instantiated once at function definition time, sharing the same mutated object across all subsequent calls.' },
        { id: 'B', text: 'Python throws a SyntaxError on list default arguments.' },
        { id: 'C', text: 'The list is deleted from memory after the first function call.' },
        { id: 'D', text: 'Mutable arguments force functions to execute synchronously.' }
      ],
      correct: 'A',
      explanation: 'Default argument expressions evaluate once when the function is defined. If modified (e.g. lst.append(x)), the mutations persist across subsequent invocations. The idiom is to default to None: def append_item(x, lst=None): if lst is None: lst = [].'
    },
    {
      id: 5,
      category: 'Python Programming',
      difficulty: 'Intermediate',
      question: 'What is the distinction between copy.copy() (shallow copy) and copy.deepcopy() in Python?',
      options: [
        { id: 'A', text: 'Shallow copy constructs a new compound object but inserts references to original inner children; Deep copy recursively clones all nested objects.' },
        { id: 'B', text: 'Deep copy works only on primitive strings and integers.' },
        { id: 'C', text: 'Shallow copy converts objects to JSON format.' },
        { id: 'D', text: 'There is no functional difference.' }
      ],
      correct: 'A',
      explanation: 'A shallow copy duplicates the outer container while inner mutable objects (nested lists, dicts) are shared. Modifying a nested child affects both copies. A deep copy recursively duplicates every child node, ensuring total independence.'
    },
    {
      id: 6,
      category: 'Python Programming',
      difficulty: 'Intermediate',
      question: 'Why are List Comprehensions generally faster than equivalent procedural for-loops with .append() in Python?',
      options: [
        { id: 'A', text: 'List comprehensions execute optimized C-level loop bytecode (LIST_APPEND) without repeated Python-level attribute lookups.' },
        { id: 'B', text: 'List comprehensions run on multiple CPU threads.' },
        { id: 'C', text: 'List comprehensions skip memory allocation.' },
        { id: 'D', text: 'For-loops require disk I/O.' }
      ],
      correct: 'A',
      explanation: 'In procedural loops, lst.append() requires resolving the .append attribute lookup on the list object on every single iteration. List comprehensions utilize specialized CPython bytecode instructions that append directly to the preallocated list.'
    },
    {
      id: 7,
      category: 'Python Programming',
      difficulty: 'Intermediate',
      question: 'In Python function signatures, what do *args and **kwargs capture respectively?',
      options: [
        { id: 'A', text: '*args captures arbitrary positional arguments as a tuple; **kwargs captures arbitrary keyword arguments as a dictionary.' },
        { id: 'B', text: '*args captures keyword arguments; **kwargs captures positional arguments.' },
        { id: 'C', text: '*args indicates pointers to C memory addresses.' },
        { id: 'D', text: '**kwargs squares the function return value.' }
      ],
      correct: 'A',
      explanation: '*args collects any extra positional arguments into a tuple. **kwargs collects any extra named keyword arguments into a standard key-value dictionary, allowing flexible parameter passing.'
    },
    {
      id: 8,
      category: 'Python Programming',
      difficulty: 'Intermediate',
      question: 'Which special dunder method defines an unambiguous string representation of an object intended for developers and debugging?',
      options: [
        { id: 'A', text: '__repr__' },
        { id: 'B', text: '__str__' },
        { id: 'C', text: '__doc__' },
        { id: 'D', text: '__format__' }
      ],
      correct: 'A',
      explanation: '__repr__() is designed for developers, ideally returning an unambiguous string that could recreate the object (e.g. eval(repr(obj)) == obj). __str__() is for informal, user-friendly end-user presentation.'
    },
    {
      id: 9,
      category: 'Python Programming',
      difficulty: 'Intermediate',
      question: 'Which two dunder methods must a Python class implement to support the context manager protocol (with statement)?',
      options: [
        { id: 'A', text: '__enter__ and __exit__' },
        { id: 'B', text: '__init__ and __del__' },
        { id: 'C', text: '__open__ and __close__' },
        { id: 'D', text: '__start__ and __stop__' }
      ],
      correct: 'A',
      explanation: 'The with statement calls __enter__() when entering the block (returning the managed resource) and guarantees that __exit__(exc_type, exc_val, exc_tb) is executed when leaving the block, ensuring deterministic resource cleanup.'
    },
    {
      id: 10,
      category: 'Python Programming',
      difficulty: 'Intermediate',
      question: 'How does CPython primarily perform memory management and garbage collection?',
      options: [
        { id: 'A', text: 'Reference Counting as the primary mechanism, backed by a cyclic generational garbage collector for circular references.' },
        { id: 'B', text: 'Mark-and-sweep algorithm exclusively.' },
        { id: 'C', text: 'Manual memory deallocation using free().' },
        { id: 'D', text: 'Operating system page fault eviction.' }
      ],
      correct: 'A',
      explanation: 'Every CPython object has an ob_refcnt counter. When references drop to 0, memory is immediately reclaimed. To resolve circular references (A points to B, B points to A), Python runs a generational cyclic GC periodically.'
    },
    {
      id: 11,
      category: 'Python Programming',
      difficulty: 'Intermediate',
      question: 'Why is the multiprocessing module preferred over threading for CPU-bound computations in Python?',
      options: [
        { id: 'A', text: 'Each process spawns an independent Python interpreter instance with separate memory space, bypassing the GIL.' },
        { id: 'B', text: 'Processes consume less RAM than threads.' },
        { id: 'C', text: 'Multiprocessing does not require importing any standard libraries.' },
        { id: 'D', text: 'Threading is deprecated in Python 3.12+.' }
      ],
      correct: 'A',
      explanation: 'Because the GIL prevents multiple threads from executing bytecode simultaneously, CPU-intensive work gains no speedup from threading. Multiprocessing forks separate processes, each with its own GIL and interpreter, achieving true multi-core parallel computation.'
    },
    {
      id: 12,
      category: 'Python Programming',
      difficulty: 'Intermediate',
      question: 'What is the syntactic constraint on Python anonymous lambda functions?',
      options: [
        { id: 'A', text: 'They are restricted to a single expression whose evaluated value is implicitly returned; statements and multi-line blocks are prohibited.' },
        { id: 'B', text: 'They cannot accept parameters.' },
        { id: 'C', text: 'They can only return boolean values.' },
        { id: 'D', text: 'They must be declared inside classes.' }
      ],
      correct: 'A',
      explanation: 'lambda arguments: expression is restricted by design to an inline single expression. Statements such as return, pass, assert, or assignments are syntactically disallowed inside lambda expressions.'
    },
    {
      id: 13,
      category: 'Python Programming',
      difficulty: 'Intermediate',
      question: 'What is the operational difference between the "is" keyword and the "==" operator in Python?',
      options: [
        { id: 'A', text: '"is" checks object identity (whether two references point to the exact same memory address); "==" checks value equality.' },
        { id: 'B', text: '"is" checks value equality; "==" checks memory address.' },
        { id: 'C', text: '"is" is used only for strings.' },
        { id: 'D', text: '"==" can only compare floating point numbers.' }
      ],
      correct: 'A',
      explanation: 'a is b evaluates id(a) == id(b) (checking whether both refer to the same object in RAM). a == b invokes the __eq__ method to evaluate whether their contents/values are equal.'
    },
    {
      id: 14,
      category: 'Python Programming',
      difficulty: 'Intermediate',
      question: 'What does the @dataclass decorator (introduced in Python 3.7) automatically synthesize for a class?',
      options: [
        { id: 'A', text: 'Boilerplate special methods including __init__(), __repr__(), and __eq__() based on annotated class attributes.' },
        { id: 'B', text: 'A database table in SQLite.' },
        { id: 'C', text: 'An asynchronous REST API endpoint.' },
        { id: 'D', text: 'A GUI window.' }
      ],
      correct: 'A',
      explanation: '@dataclass inspects type-annotated field definitions and automatically writes __init__(), __repr__(), and __eq__() methods, eliminating repetitive boilerplate code.'
    },
    {
      id: 15,
      category: 'Python Programming',
      difficulty: 'Advanced',
      question: 'In Python asyncio, what does the await keyword do when placed inside an async def coroutine?',
      options: [
        { id: 'A', text: 'Suspends execution of the coroutine and yields control back to the event loop until the awaited task/Future completes.' },
        { id: 'B', text: 'Blocks the entire operating system process synchronously.' },
        { id: 'C', text: 'Kills the background thread.' },
        { id: 'D', text: 'Converts async code into multi-threaded code.' }
      ],
      correct: 'A',
      explanation: 'await pauses the current coroutine, allowing the single-threaded event loop to switch context and run other pending tasks or handle I/O events. Once the awaited awaitable finishes, execution resumes from the paused point.'
    }
  ]

};

// Map any candidate skill string from their resume to the closest question track
export function getTrackForSkill(skillName) {
  if (!skillName) return 'mern';
  const s = skillName.toLowerCase().trim();

  // 1. Deep Learning & Neural Networks
  if (
    s.includes('deep learning') || 
    s.includes('neural') || 
    s.includes('cnn') || 
    s.includes('rnn') || 
    s.includes('lstm') || 
    s.includes('transformer') || 
    s.includes('backpropagation') ||
    s.includes('autoencoder') ||
    s.includes('deep')
  ) {
    return 'deep-learning';
  }

  // 2. Natural Language Processing & NLTK
  if (
    s.includes('nlp') || 
    s.includes('natural language') || 
    s.includes('nltk') || 
    s.includes('spacy') || 
    s.includes('tokeniz') || 
    s.includes('lemmatiz') || 
    s.includes('text processing') || 
    s.includes('bert') || 
    s.includes('word2vec') || 
    s.includes('llm')
  ) {
    return 'nlp';
  }

  // 3. TensorFlow & Keras / PyTorch
  if (
    s.includes('tensorflow') || 
    s.includes('keras') || 
    s.includes('pytorch') || 
    s.includes('torch') || 
    s.includes('tensor')
  ) {
    return 'tensorflow-keras';
  }

  // 4. Machine Learning & Algorithms
  if (
    s.includes('machine learning') || 
    s.includes('scikit') || 
    s.includes('sklearn') || 
    s.includes('random forest') || 
    s.includes('xgboost') || 
    s.includes('gradient boost') || 
    s.includes('svm') || 
    s.includes('regression') || 
    s.includes('classification') || 
    s.includes('clustering') || 
    s.includes('k-means')
  ) {
    return 'machine-learning';
  }

  // 5. Data Analytics, Matplotlib & Visualization
  if (
    s.includes('data analytic') || 
    s.includes('data analysis') || 
    s.includes('data science') || 
    s.includes('matplotlib') || 
    s.includes('seaborn') || 
    s.includes('pandas') || 
    s.includes('numpy') || 
    s.includes('eda') || 
    s.includes('exploratory') || 
    s.includes('visualization') ||
    s.includes('feature engineering') ||
    s.includes('statistics')
  ) {
    return 'data-analytics';
  }

  // 6. Power BI, Tableau & Excel
  if (
    s.includes('power bi') || 
    s.includes('powerbi') || 
    s.includes('tableau') || 
    s.includes('excel') || 
    s.includes('bi') || 
    s.includes('business intelligence') || 
    s.includes('dax') || 
    s.includes('power query') || 
    s.includes('dashboard') ||
    s.includes('looker')
  ) {
    return 'bi-analytics';
  }

  // 7. Python & Notebooks
  if (
    s.includes('python') || 
    s.includes('jupyter') || 
    s.includes('notebook') || 
    s.includes('colab') ||
    s.includes('django') ||
    s.includes('flask')
  ) {
    return 'python';
  }

  // 8. Styling & UI CSS
  if (
    s.includes('tailwind') || 
    s.includes('css') || 
    s.includes('html') || 
    s.includes('bootstrap') || 
    s.includes('responsive') ||
    s.includes('sass')
  ) {
    return 'tailwind';
  }

  // 9. Git, GitHub & DevOps Tools
  if (
    s.includes('git') || 
    s.includes('hub') || 
    s.includes('ci/cd') || 
    s.includes('version control') || 
    s.includes('vs code') || 
    s.includes('vscode') || 
    s.includes('docker') || 
    s.includes('tooling')
  ) {
    return 'git';
  }

  // 10. REST APIs & Auth
  if (
    s.includes('rest') || 
    s.includes('api') || 
    s.includes('postman') || 
    s.includes('jwt') || 
    s.includes('auth') || 
    s.includes('fastapi') ||
    s.includes('mvc')
  ) {
    return 'rest';
  }

  // 11. React.js & UI
  if (
    s.includes('react') || 
    s.includes('next') || 
    s.includes('redux') || 
    s.includes('frontend') || 
    s.includes('ui')
  ) {
    return 'react';
  }

  // 12. Node.js & Backend
  if (
    s.includes('node') || 
    s.includes('express') || 
    s.includes('backend') || 
    s.includes('server')
  ) {
    return 'node';
  }

  // 13. Databases & SQL / MongoDB
  if (
    s.includes('mongo') || 
    s.includes('mongoose') || 
    s.includes('database') || 
    s.includes('db') || 
    s.includes('nosql') || 
    s.includes('sql') ||
    s.includes('postgres') ||
    s.includes('mysql')
  ) {
    return 'mongodb';
  }

  // 14. JavaScript & TypeScript
  if (
    s.includes('javascript') || 
    s.includes('typescript') || 
    s.includes('script') || 
    s.includes('js') || 
    s.includes('ts')
  ) {
    return 'javascript';
  }

  // 15. System Design & Cloud
  if (
    s.includes('system') || 
    s.includes('design') || 
    s.includes('microservice') || 
    s.includes('redis') || 
    s.includes('cloud') || 
    s.includes('aws') || 
    s.includes('azure') || 
    s.includes('security')
  ) {
    return 'system-design';
  }

  // Fallbacks based on common domain prefixes
  if (s.includes('data') || s.includes('analytic') || s.includes('plot')) return 'data-analytics';
  if (s.includes('model') || s.includes('ai') || s.includes('learn')) return 'machine-learning';

  return 'mern';
}

// Skill icon helper (Clean text mode, no emojis)
export function getSkillIcon(skillName) {
  return '';
}
