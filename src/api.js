const QUESTIONS = {
  'Frontend Developer': [
    'What is the difference between flexbox and CSS Grid? When would you use each?',
    'Explain how the virtual DOM works in React and why it improves performance.',
    'What are closures in JavaScript? Give a real-world example.',
    'How do you optimize the performance of a React application?',
    'Explain the difference between localStorage, sessionStorage, and cookies.',
  ],
  'Backend Developer': [
    'What is the difference between SQL and NoSQL databases? When would you choose one over the other?',
    'Explain REST API principles and what makes an API RESTful.',
    'What is middleware in Express.js and how does it work?',
    'How do you handle authentication and authorization in a backend application?',
    'What is database indexing and why is it important for performance?',
  ],
  'Full Stack Developer': [
    'Walk me through how a request travels from the browser to the server and back.',
    'How do you manage state in a large React application?',
    'What is CORS and how do you handle it in a full stack application?',
    'Explain the difference between server-side rendering and client-side rendering.',
    'How do you secure a full stack application against common vulnerabilities like XSS and CSRF?',
  ],
  'Data Scientist': [
    'What is the difference between supervised and unsupervised learning?',
    'How do you handle missing data in a dataset?',
    'Explain overfitting and how you would prevent it in a machine learning model.',
    'What is the difference between precision and recall? When is each more important?',
    'Walk me through how you would approach a new data science problem from scratch.',
  ],
  'UI/UX Designer': [
    'What is the difference between UI and UX design?',
    'Walk me through your design process from research to final delivery.',
    'How do you conduct user research and incorporate feedback into your designs?',
    'What is a design system and why is it important?',
    'How do you ensure your designs are accessible to users with disabilities?',
  ],
  'Product Manager': [
    'How do you prioritize features when you have limited resources?',
    'Walk me through how you would define success metrics for a new feature.',
    'How do you handle disagreements between engineering and design teams?',
    'Describe a product you use daily and how you would improve it.',
    'How do you gather and incorporate user feedback into product decisions?',
  ],
}

const KEYWORDS = {
  'Frontend Developer': {
    0: ['flexbox', 'grid', 'layout', 'responsive', 'axis', 'container'],
    1: ['virtual dom', 'reconciliation', 'diffing', 'render', 'performance'],
    2: ['closure', 'scope', 'function', 'variable', 'outer', 'inner'],
    3: ['memo', 'lazy', 'code splitting', 'usecallback', 'usememo', 'optimize'],
    4: ['localstorage', 'sessionstorage', 'cookie', 'expiry', 'server', 'persist'],
  },
  'Backend Developer': {
    0: ['sql', 'nosql', 'relational', 'schema', 'scale', 'mongodb', 'postgres'],
    1: ['rest', 'stateless', 'http', 'endpoint', 'resource', 'crud'],
    2: ['middleware', 'request', 'response', 'next', 'pipeline', 'chain'],
    3: ['jwt', 'token', 'session', 'oauth', 'bcrypt', 'hash', 'role'],
    4: ['index', 'query', 'performance', 'search', 'column', 'slow'],
  },
  'Full Stack Developer': {
    0: ['dns', 'http', 'request', 'response', 'server', 'client', 'browser'],
    1: ['redux', 'context', 'state', 'props', 'zustand', 'global'],
    2: ['cors', 'origin', 'header', 'cross', 'allow', 'policy'],
    3: ['ssr', 'csr', 'seo', 'server', 'client', 'hydration', 'next'],
    4: ['xss', 'csrf', 'sanitize', 'token', 'https', 'secure', 'inject'],
  },
  'Data Scientist': {
    0: ['supervised', 'unsupervised', 'label', 'cluster', 'classification', 'regression'],
    1: ['impute', 'drop', 'mean', 'median', 'missing', 'null', 'fill'],
    2: ['overfit', 'regularization', 'dropout', 'validation', 'cross', 'bias'],
    3: ['precision', 'recall', 'false positive', 'false negative', 'f1', 'tradeoff'],
    4: ['eda', 'explore', 'clean', 'model', 'evaluate', 'deploy', 'metric'],
  },
  'UI/UX Designer': {
    0: ['ui', 'ux', 'visual', 'experience', 'interface', 'user', 'interaction'],
    1: ['research', 'wireframe', 'prototype', 'test', 'iterate', 'figma'],
    2: ['interview', 'survey', 'persona', 'feedback', 'usability', 'test'],
    3: ['design system', 'component', 'consistent', 'token', 'library', 'pattern'],
    4: ['wcag', 'accessible', 'contrast', 'screen reader', 'aria', 'color'],
  },
  'Product Manager': {
    0: ['priority', 'impact', 'effort', 'rice', 'moscow', 'roadmap', 'stakeholder'],
    1: ['metric', 'kpi', 'success', 'measure', 'data', 'goal', 'outcome'],
    2: ['communicate', 'align', 'tradeoff', 'compromise', 'data', 'user', 'empathy'],
    3: ['improve', 'feature', 'pain point', 'user', 'metric', 'growth'],
    4: ['feedback', 'survey', 'interview', 'data', 'iterate', 'prioritize'],
  },
}

function scoreAnswer(answer, role, questionIndex) {
  const lower = answer.toLowerCase()
  const keys = KEYWORDS[role]?.[questionIndex] || []
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length

  let score = 3

  const matches = keys.filter(k => lower.includes(k)).length
  score += Math.min(matches * 1.2, 5)

  if (wordCount >= 80) score += 1.5
  else if (wordCount >= 40) score += 1
  else if (wordCount >= 20) score += 0.5
  else score -= 1

  if (lower.includes('for example') || lower.includes('such as') || lower.includes('instance')) score += 0.5
  if (lower.includes('because') || lower.includes('therefore') || lower.includes('so that')) score += 0.5

  score = Math.max(1, Math.min(10, Math.round(score)))
  return score
}

function buildFeedback(answer, role, questionIndex, score) {
  const lower = answer.toLowerCase()
  const keys = KEYWORDS[role]?.[questionIndex] || []
  const matched = keys.filter(k => lower.includes(k))
  const missed = keys.filter(k => !lower.includes(k))
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length

  const goodPoints = []
  const missingPoints = []

  if (matched.length > 0) goodPoints.push(`You mentioned key concepts like: ${matched.slice(0, 3).join(', ')}.`)
  if (wordCount >= 40) goodPoints.push('Your answer had good length and detail.')
  if (lower.includes('example') || lower.includes('instance')) goodPoints.push('Good use of examples to support your answer.')
  if (goodPoints.length === 0) goodPoints.push('You attempted to answer the question.')

  if (missed.length > 0) missingPoints.push(`Consider mentioning: ${missed.slice(0, 3).join(', ')}.`)
  if (wordCount < 30) missingPoints.push('Try to elaborate more — aim for at least 40-50 words.')
  if (!lower.includes('example') && !lower.includes('instance')) missingPoints.push('Adding a real-world example would strengthen your answer.')
  if (missingPoints.length === 0) missingPoints.push('Try to go deeper into the technical details.')

  const ideals = {
    'Frontend Developer': [
      'Flexbox is one-dimensional (row or column), ideal for navigation bars and aligning items. CSS Grid is two-dimensional, perfect for full page layouts. Use Flexbox for components, Grid for page structure.',
      'The virtual DOM is a lightweight copy of the real DOM. React compares it with the previous version (diffing), then updates only the changed parts in the real DOM, avoiding expensive full re-renders.',
      'A closure is a function that remembers variables from its outer scope even after the outer function returns. Example: a counter function that keeps its count value private.',
      'Use React.memo, useMemo, useCallback to prevent unnecessary re-renders. Implement code splitting with React.lazy, optimize images, and use production builds.',
      'localStorage persists until manually cleared. sessionStorage clears when the tab closes. Cookies can be set with expiry dates and are sent to the server with every request.',
    ],
    'Backend Developer': [
      'SQL databases use structured tables with schemas, great for complex queries and relationships. NoSQL is flexible and scalable, ideal for unstructured data. Choose SQL for consistency, NoSQL for scale and flexibility.',
      'REST APIs are stateless, use HTTP methods (GET, POST, PUT, DELETE), and treat everything as a resource with a unique URL. Each request contains all the information needed to process it.',
      'Middleware functions execute between the request and response cycle. They can modify req/res objects, end the request, or call next() to pass control. Used for logging, auth, and error handling.',
      'Use JWT tokens for stateless auth — the server signs a token, the client stores and sends it with requests. Passwords are hashed with bcrypt. Role-based access controls what each user can do.',
      'An index is a data structure that speeds up lookups on specific columns. Without an index, the DB scans every row. With one, it jumps directly to matching rows — critical for large tables.',
    ],
    'Full Stack Developer': [
      'The browser sends a DNS request to resolve the domain to an IP, then sends an HTTP request to the server. The server processes it, queries the database if needed, and returns an HTTP response with HTML/JSON.',
      'For small apps use React Context + useReducer. For large apps use Redux Toolkit or Zustand for predictable global state, keeping server state separate with React Query or SWR.',
      'CORS is a browser security feature that blocks requests to a different domain. Fix it server-side by setting Access-Control-Allow-Origin headers, specifying which origins, methods, and headers are allowed.',
      'SSR renders HTML on the server — better for SEO and initial load. CSR renders in the browser — better for interactivity. Next.js supports both, letting you choose per page.',
      'Sanitize all inputs to prevent XSS. Use CSRF tokens for form submissions. Implement HTTPS, Content Security Policy headers, parameterized queries for SQL injection prevention.',
    ],
    'Data Scientist': [
      'Supervised learning uses labeled data to train models to predict outputs. Unsupervised learning finds patterns in unlabeled data through clustering or dimensionality reduction.',
      'Options include dropping rows/columns if data is sparse, imputing with mean/median/mode, or using model-based imputation. The choice depends on the amount and pattern of missing data.',
      'Overfitting is when a model memorizes training data but fails on new data. Prevent it with regularization (L1/L2), dropout, cross-validation, early stopping, or collecting more training data.',
      'Precision is the ratio of true positives to all predicted positives. Recall is true positives to all actual positives. Use precision when false positives are costly, recall when false negatives are costly.',
      'Start with EDA to understand the data, clean and preprocess it, select and engineer features, train multiple models, evaluate with appropriate metrics, then deploy and monitor in production.',
    ],
    'UI/UX Designer': [
      'UI focuses on the visual elements — buttons, colors, typography. UX covers the entire user journey — research, information architecture, usability. Good products need both working together.',
      'Start with user research (interviews, surveys), define personas and user journeys, create wireframes, build prototypes in Figma, conduct usability testing, then iterate based on feedback.',
      'Conduct interviews and usability tests, create affinity maps from findings, build user personas, and prioritize changes by impact. Feedback should be continuous, not just at the start.',
      'A design system is a collection of reusable components, guidelines, and tokens that ensure consistency across a product. It speeds up development and keeps the UI coherent at scale.',
      'Follow WCAG guidelines — ensure sufficient color contrast, add alt text to images, support keyboard navigation, use semantic HTML, and test with screen readers like NVDA or VoiceOver.',
    ],
    'Product Manager': [
      'Use frameworks like RICE (Reach, Impact, Confidence, Effort) or MoSCoW. Align features with company goals, gather data on user impact, and involve stakeholders in tradeoff discussions.',
      'Define success metrics before launching — conversion rate, retention, NPS, or revenue impact. Set a baseline, launch with A/B testing if possible, and review after a defined period.',
      'Present data to align both teams on the user problem. Facilitate a tradeoff discussion focused on user value and business goals. Document decisions and ensure everyone understands the reasoning.',
      'I use [product] daily. I would improve [specific pain point] by [solution], which would increase [metric]. I validated this by noticing [user behavior] and [data point].',
      'Use surveys, user interviews, support tickets, and analytics. Cluster feedback into themes, quantify frequency and impact, then feed insights into the roadmap prioritization process.',
    ],
  }

  const ideal = ideals[role]?.[questionIndex] || 'A strong answer includes specific technical details, a real-world example, and a clear explanation of the underlying concept.'

  return {
    score,
    good: goodPoints.join(' '),
    missing: missingPoints.join(' '),
    ideal,
  }
}

export async function generateQuestions(role, level) {
  await new Promise(r => setTimeout(r, 800))
  const questions = QUESTIONS[role]
  if (!questions) throw new Error('Role not found')
  return questions
}

export async function evaluateAnswer(role, level, question, answer) {
  await new Promise(r => setTimeout(r, 1000))
  const questions = QUESTIONS[role] || []
  const questionIndex = questions.indexOf(question)
  const score = scoreAnswer(answer, role, questionIndex)
  return buildFeedback(answer, role, questionIndex, score)
}