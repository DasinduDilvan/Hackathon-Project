// src/data/coursesData.js

export const COURSES_DATA = [
  {
    id: 1,
    title: 'HTML Fundamentals',
    desc: 'Learn the building blocks of web pages.',
    category: 'programming',
    level: 'Beginner',
    icon: '🌐',
    lessons: 12,
    duration: '4 hours',
    rating: 4.8,
    students: 2340,
    points: 100,
    skills: ['HTML', 'Semantic HTML'],
    curriculum: [
      {
        id: 'html-1',
        title: 'Introduction to HTML',
        duration: '15 min',
        type: 'video',
        content: `
          <h2>What is HTML?</h2>
          <p>HTML (HyperText Markup Language) is the standard language for creating web pages. 
          It describes the structure of a web page using elements and tags.</p>
          <h3>Key Concepts:</h3>
          <ul>
            <li>HTML stands for HyperText Markup Language</li>
            <li>HTML describes the structure of a Web page</li>
            <li>HTML consists of a series of elements</li>
            <li>HTML elements tell the browser how to display content</li>
          </ul>
          <h3>Your First HTML Page:</h3>
          <pre><code>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello World!&lt;/h1&gt;
    &lt;p&gt;This is my first web page.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;
          </code></pre>
        `
      },
      {
        id: 'html-2',
        title: 'HTML Elements & Tags',
        duration: '20 min',
        type: 'video',
        content: `
          <h2>HTML Elements & Tags</h2>
          <p>HTML elements are the building blocks of HTML pages. 
          An HTML element is defined by a start tag, some content, and an end tag.</p>
          <h3>Common HTML Tags:</h3>
          <ul>
            <li><strong>&lt;h1&gt; to &lt;h6&gt;</strong> - Headings</li>
            <li><strong>&lt;p&gt;</strong> - Paragraphs</li>
            <li><strong>&lt;a&gt;</strong> - Links</li>
            <li><strong>&lt;img&gt;</strong> - Images</li>
            <li><strong>&lt;div&gt;</strong> - Division/Section</li>
            <li><strong>&lt;span&gt;</strong> - Inline container</li>
          </ul>
          <pre><code>
&lt;h1&gt;This is a Heading&lt;/h1&gt;
&lt;p&gt;This is a paragraph.&lt;/p&gt;
&lt;a href="https://example.com"&gt;This is a link&lt;/a&gt;
&lt;img src="image.jpg" alt="My Image"&gt;
          </code></pre>
        `
      },
      {
        id: 'html-3',
        title: 'Semantic HTML',
        duration: '25 min',
        type: 'video',
        content: `
          <h2>Semantic HTML</h2>
          <p>Semantic HTML elements clearly describe their meaning to both the browser and the developer.</p>
          <h3>Semantic Elements:</h3>
          <ul>
            <li><strong>&lt;header&gt;</strong> - Page or section header</li>
            <li><strong>&lt;nav&gt;</strong> - Navigation links</li>
            <li><strong>&lt;main&gt;</strong> - Main content</li>
            <li><strong>&lt;article&gt;</strong> - Independent content</li>
            <li><strong>&lt;section&gt;</strong> - Thematic grouping</li>
            <li><strong>&lt;footer&gt;</strong> - Page or section footer</li>
          </ul>
          <pre><code>
&lt;header&gt;
  &lt;nav&gt;...&lt;/nav&gt;
&lt;/header&gt;
&lt;main&gt;
  &lt;article&gt;
    &lt;section&gt;...&lt;/section&gt;
  &lt;/article&gt;
&lt;/main&gt;
&lt;footer&gt;...&lt;/footer&gt;
          </code></pre>
        `
      },
      {
        id: 'html-quiz-1',
        title: 'Quiz: HTML Basics',
        duration: '10 min',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            question: 'What does HTML stand for?',
            options: [
              'Hyper Text Markup Language',
              'High Tech Modern Language',
              'Hyper Transfer Markup Language',
              'Home Tool Markup Language'
            ],
            correct: 0
          },
          {
            id: 'q2',
            question: 'Which tag is used for the largest heading?',
            options: ['<h6>', '<heading>', '<h1>', '<head>'],
            correct: 2
          },
          {
            id: 'q3',
            question: 'Which HTML element defines the main content of a document?',
            options: ['<content>', '<main>', '<body>', '<div>'],
            correct: 1
          }
        ]
      }
    ]
  },

  {
    id: 2,
    title: 'CSS Fundamentals',
    desc: 'Style web pages with CSS, flexbox and grid.',
    category: 'programming',
    level: 'Beginner',
    icon: '🎨',
    lessons: 18,
    duration: '6 hours',
    rating: 4.7,
    students: 2100,
    points: 120,
    skills: ['CSS', 'Flexbox', 'Grid'],
    curriculum: [
      {
        id: 'css-1',
        title: 'Introduction to CSS',
        duration: '15 min',
        type: 'video',
        content: `
          <h2>What is CSS?</h2>
          <p>CSS (Cascading Style Sheets) is used to style and layout web pages.</p>
          <h3>Three Ways to Add CSS:</h3>
          <ul>
            <li><strong>Inline</strong> - Using the style attribute</li>
            <li><strong>Internal</strong> - Using the &lt;style&gt; tag</li>
            <li><strong>External</strong> - Using a .css file</li>
          </ul>
          <pre><code>
/* External CSS */
body {
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
  color: #333;
}

h1 {
  color: #2b8b76;
  font-size: 2rem;
}
          </code></pre>
        `
      },
      {
        id: 'css-2',
        title: 'CSS Flexbox',
        duration: '30 min',
        type: 'video',
        content: `
          <h2>CSS Flexbox</h2>
          <p>Flexbox is a one-dimensional layout method for arranging items in rows or columns.</p>
          <h3>Key Flexbox Properties:</h3>
          <ul>
            <li><strong>display: flex</strong> - Enables flexbox</li>
            <li><strong>flex-direction</strong> - Row or column</li>
            <li><strong>justify-content</strong> - Horizontal alignment</li>
            <li><strong>align-items</strong> - Vertical alignment</li>
            <li><strong>gap</strong> - Space between items</li>
          </ul>
          <pre><code>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
          </code></pre>
        `
      },
      {
        id: 'css-3',
        title: 'CSS Grid',
        duration: '30 min',
        type: 'video',
        content: `
          <h2>CSS Grid</h2>
          <p>CSS Grid is a two-dimensional layout system for creating complex layouts.</p>
          <pre><code>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}

.grid-item {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
}
          </code></pre>
        `
      },
      {
        id: 'css-quiz-1',
        title: 'Quiz: CSS Basics',
        duration: '10 min',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            question: 'What does CSS stand for?',
            options: [
              'Cascading Style Sheets',
              'Creative Style System',
              'Computer Style Sheets',
              'Colorful Style Sheets'
            ],
            correct: 0
          },
          {
            id: 'q2',
            question: 'Which property is used to change text color?',
            options: ['text-color', 'font-color', 'color', 'foreground'],
            correct: 2
          },
          {
            id: 'q3',
            question: 'Which display value enables Flexbox?',
            options: ['block', 'flex', 'inline', 'grid'],
            correct: 1
          }
        ]
      }
    ]
  },

  {
    id: 3,
    title: 'JavaScript Basics',
    desc: 'Master JS fundamentals, DOM and ES6+.',
    category: 'programming',
    level: 'Beginner',
    icon: '⚡',
    lessons: 24,
    duration: '10 hours',
    rating: 4.9,
    students: 3200,
    points: 150,
    skills: ['JavaScript', 'ES6+', 'DOM'],
    curriculum: [
      {
        id: 'js-1',
        title: 'JavaScript Variables',
        duration: '20 min',
        type: 'video',
        content: `
          <h2>JavaScript Variables</h2>
          <p>Variables are containers for storing data values.</p>
          <h3>Variable Declarations:</h3>
          <ul>
            <li><strong>var</strong> - Old way (avoid)</li>
            <li><strong>let</strong> - Block-scoped, can reassign</li>
            <li><strong>const</strong> - Block-scoped, cannot reassign</li>
          </ul>
          <pre><code>
const name = 'John';
let age = 25;
let isStudent = true;

// Arrays
const fruits = ['apple', 'banana', 'orange'];

// Objects
const person = {
  name: 'John',
  age: 25,
  city: 'New York'
};
          </code></pre>
        `
      },
      {
        id: 'js-2',
        title: 'Functions & Arrow Functions',
        duration: '25 min',
        type: 'video',
        content: `
          <h2>Functions in JavaScript</h2>
          <p>Functions are reusable blocks of code that perform a specific task.</p>
          <pre><code>
// Regular Function
function greet(name) {
  return 'Hello, ' + name + '!';
}

// Arrow Function (ES6+)
const greet = (name) => {
  return \`Hello, \${name}!\`;
};

// Short Arrow Function
const add = (a, b) => a + b;

console.log(greet('World')); // Hello, World!
console.log(add(5, 3));      // 8
          </code></pre>
        `
      },
      {
        id: 'js-3',
        title: 'DOM Manipulation',
        duration: '30 min',
        type: 'video',
        content: `
          <h2>DOM Manipulation</h2>
          <p>The DOM (Document Object Model) allows JavaScript to access and change HTML elements.</p>
          <pre><code>
// Select Elements
const title = document.getElementById('title');
const buttons = document.querySelectorAll('.btn');

// Change Content
title.textContent = 'New Title';
title.innerHTML = '<span>New Title</span>';

// Change Styles
title.style.color = 'red';
title.classList.add('active');

// Event Listeners
const btn = document.querySelector('#myBtn');
btn.addEventListener('click', () => {
  console.log('Button clicked!');
});
          </code></pre>
        `
      },
      {
        id: 'js-quiz-1',
        title: 'Quiz: JavaScript Basics',
        duration: '10 min',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            question: 'Which keyword creates a block-scoped variable that cannot be reassigned?',
            options: ['var', 'let', 'const', 'static'],
            correct: 2
          },
          {
            id: 'q2',
            question: 'What does DOM stand for?',
            options: [
              'Document Object Model',
              'Data Object Management',
              'Document Oriented Model',
              'Dynamic Object Manipulation'
            ],
            correct: 0
          },
          {
            id: 'q3',
            question: 'Which method adds an event listener to an element?',
            options: [
              'element.onClick()',
              'element.addEvent()',
              'element.addEventListener()',
              'element.listen()'
            ],
            correct: 2
          }
        ]
      }
    ]
  },

  {
    id: 4,
    title: 'React Fundamentals',
    desc: 'Build modern UIs with React hooks and routing.',
    category: 'programming',
    level: 'Intermediate',
    icon: '⚛️',
    lessons: 28,
    duration: '12 hours',
    rating: 4.8,
    students: 1800,
    points: 200,
    skills: ['React', 'Hooks', 'JSX'],
    curriculum: [
      {
        id: 'react-1',
        title: 'Introduction to React',
        duration: '20 min',
        type: 'video',
        content: `
          <h2>What is React?</h2>
          <p>React is a JavaScript library for building user interfaces, developed by Facebook.</p>
          <h3>Key Concepts:</h3>
          <ul>
            <li><strong>Components</strong> - Reusable UI pieces</li>
            <li><strong>JSX</strong> - JavaScript XML syntax</li>
            <li><strong>Props</strong> - Data passed to components</li>
            <li><strong>State</strong> - Component's own data</li>
          </ul>
          <pre><code>
// Functional Component
function Welcome({ name }) {
  return (
    &lt;div className="welcome"&gt;
      &lt;h1&gt;Hello, {name}!&lt;/h1&gt;
      &lt;p&gt;Welcome to React.&lt;/p&gt;
    &lt;/div&gt;
  );
}

export default Welcome;
          </code></pre>
        `
      },
      {
        id: 'react-2',
        title: 'React Hooks - useState & useEffect',
        duration: '35 min',
        type: 'video',
        content: `
          <h2>React Hooks</h2>
          <p>Hooks let you use state and other React features in functional components.</p>
          <pre><code>
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Runs after every render
    document.title = \`Count: \${count}\`;

    // Fetch data
    fetch('/api/data')
      .then(r => r.json())
      .then(d => setData(d));

    // Cleanup
    return () => {
      document.title = 'App';
    };
  }, [count]); // Dependency array

  return (
    &lt;div&gt;
      &lt;p&gt;Count: {count}&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Increment
      &lt;/button&gt;
    &lt;/div&gt;
  );
}
          </code></pre>
        `
      },
      {
        id: 'react-quiz-1',
        title: 'Quiz: React Fundamentals',
        duration: '10 min',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            question: 'What hook is used to manage state in a functional component?',
            options: ['useEffect', 'useState', 'useContext', 'useReducer'],
            correct: 1
          },
          {
            id: 'q2',
            question: 'What does JSX stand for?',
            options: [
              'JavaScript XML',
              'Java Syntax Extension',
              'JSON XML',
              'JavaScript Extension'
            ],
            correct: 0
          },
          {
            id: 'q3',
            question: 'Which hook is used for side effects in React?',
            options: ['useState', 'useRef', 'useEffect', 'useMemo'],
            correct: 2
          }
        ]
      }
    ]
  },

  {
    id: 5,
    title: 'Node.js Fundamentals',
    desc: 'Build server-side apps with Express.',
    category: 'programming',
    level: 'Intermediate',
    icon: '🖥️',
    lessons: 20,
    duration: '8 hours',
    rating: 4.6,
    students: 1400,
    points: 180,
    skills: ['Node.js', 'Express'],
    curriculum: [
      {
        id: 'node-1',
        title: 'Introduction to Node.js',
        duration: '20 min',
        type: 'video',
        content: `
          <h2>What is Node.js?</h2>
          <p>Node.js is a JavaScript runtime built on Chrome's V8 engine that allows 
          you to run JavaScript on the server side.</p>
          <h3>Key Features:</h3>
          <ul>
            <li>Non-blocking I/O</li>
            <li>Event-driven architecture</li>
            <li>NPM ecosystem</li>
            <li>Cross-platform</li>
          </ul>
          <pre><code>
// Basic Node.js server
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
          </code></pre>
        `
      },
      {
        id: 'node-2',
        title: 'Express.js Basics',
        duration: '30 min',
        type: 'video',
        content: `
          <h2>Express.js</h2>
          <p>Express is a minimal and flexible Node.js web application framework.</p>
          <pre><code>
const express = require('express');
const app = express();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

app.get('/users', (req, res) => {
  res.json({ users: [] });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ name, email });
});

app.listen(3000, () => {
  console.log('Express server on port 3000');
});
          </code></pre>
        `
      },
      {
        id: 'node-quiz-1',
        title: 'Quiz: Node.js Basics',
        duration: '10 min',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            question: 'What is Node.js?',
            options: [
              'A browser',
              'A JavaScript runtime environment',
              'A CSS framework',
              'A database'
            ],
            correct: 1
          },
          {
            id: 'q2',
            question: 'Which framework is commonly used with Node.js for building APIs?',
            options: ['Django', 'Laravel', 'Express', 'Flask'],
            correct: 2
          },
          {
            id: 'q3',
            question: 'What does NPM stand for?',
            options: [
              'Node Package Manager',
              'New Programming Method',
              'Node Process Manager',
              'Network Package Module'
            ],
            correct: 0
          }
        ]
      }
    ]
  },

  {
    id: 6,
    title: 'UI/UX Design',
    desc: 'User-centered design and prototyping.',
    category: 'design',
    level: 'Beginner',
    icon: '✏️',
    lessons: 16,
    duration: '8 hours',
    rating: 4.7,
    students: 1600,
    points: 130,
    skills: ['UI Design', 'Wireframing'],
    curriculum: [
      {
        id: 'uiux-1',
        title: 'Design Principles',
        duration: '25 min',
        type: 'video',
        content: `
          <h2>Core Design Principles</h2>
          <p>Good UI/UX design follows fundamental principles that create 
          intuitive and enjoyable user experiences.</p>
          <h3>The 5 Key Principles:</h3>
          <ul>
            <li><strong>Contrast</strong> - Make important elements stand out</li>
            <li><strong>Repetition</strong> - Consistent visual patterns</li>
            <li><strong>Alignment</strong> - Organize elements on a grid</li>
            <li><strong>Proximity</strong> - Group related items together</li>
            <li><strong>White Space</strong> - Give elements room to breathe</li>
          </ul>
          <h3>Color Theory:</h3>
          <ul>
            <li>Use a primary, secondary, and accent color</li>
            <li>Maintain a contrast ratio of at least 4.5:1 for accessibility</li>
            <li>Use color to convey meaning consistently</li>
          </ul>
        `
      },
      {
        id: 'uiux-quiz-1',
        title: 'Quiz: UI/UX Basics',
        duration: '10 min',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            question: 'What does UX stand for?',
            options: [
              'User Experience',
              'Universal Extension',
              'Unique Expression',
              'User Extension'
            ],
            correct: 0
          },
          {
            id: 'q2',
            question: 'What is the purpose of a wireframe?',
            options: [
              'Final visual design',
              'Basic layout and structure planning',
              'Writing code',
              'Testing performance'
            ],
            correct: 1
          },
          {
            id: 'q3',
            question: 'Which principle groups related items together?',
            options: ['Contrast', 'Alignment', 'Proximity', 'Repetition'],
            correct: 2
          }
        ]
      }
    ]
  },

  {
    id: 7,
    title: 'Figma Masterclass',
    desc: 'Master Figma for UI design and prototyping.',
    category: 'design',
    level: 'Beginner',
    icon: '🎯',
    lessons: 22,
    duration: '10 hours',
    rating: 4.9,
    students: 2800,
    points: 140,
    skills: ['Figma', 'Prototyping'],
    curriculum: [
      {
        id: 'figma-1',
        title: 'Getting Started with Figma',
        duration: '20 min',
        type: 'video',
        content: `
          <h2>Introduction to Figma</h2>
          <p>Figma is a cloud-based design tool used for UI/UX design and prototyping.</p>
          <h3>Key Features:</h3>
          <ul>
            <li><strong>Frames</strong> - Containers for your designs</li>
            <li><strong>Components</strong> - Reusable design elements</li>
            <li><strong>Auto Layout</strong> - Responsive design behavior</li>
            <li><strong>Prototyping</strong> - Interactive mockups</li>
            <li><strong>Team Libraries</strong> - Shared design systems</li>
          </ul>
          <h3>Basic Shortcuts:</h3>
          <ul>
            <li><strong>F</strong> - Create frame</li>
            <li><strong>R</strong> - Rectangle tool</li>
            <li><strong>T</strong> - Text tool</li>
            <li><strong>Ctrl+G</strong> - Group selection</li>
            <li><strong>Ctrl+D</strong> - Duplicate</li>
          </ul>
        `
      },
      {
        id: 'figma-quiz-1',
        title: 'Quiz: Figma Basics',
        duration: '10 min',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            question: 'What type of tool is Figma?',
            options: [
              'Code Editor',
              'Cloud-based Design Tool',
              'Database Tool',
              'Project Management Tool'
            ],
            correct: 1
          },
          {
            id: 'q2',
            question: 'What are reusable design elements in Figma called?',
            options: ['Templates', 'Plugins', 'Components', 'Frames'],
            correct: 2
          },
          {
            id: 'q3',
            question: 'Which Figma shortcut creates a new frame?',
            options: ['R', 'T', 'F', 'G'],
            correct: 2
          }
        ]
      }
    ]
  },

  {
    id: 8,
    title: 'Digital Marketing',
    desc: 'SEO, social media and analytics.',
    category: 'marketing',
    level: 'Beginner',
    icon: '📈',
    lessons: 14,
    duration: '6 hours',
    rating: 4.6,
    students: 1200,
    points: 110,
    skills: ['SEO', 'Social Media'],
    curriculum: [
      {
        id: 'dm-1',
        title: 'SEO Fundamentals',
        duration: '30 min',
        type: 'video',
        content: `
          <h2>Search Engine Optimization</h2>
          <p>SEO is the practice of optimizing your website to rank higher in search engine results.</p>
          <h3>On-Page SEO:</h3>
          <ul>
            <li><strong>Title Tags</strong> - Include target keywords</li>
            <li><strong>Meta Descriptions</strong> - 150-160 characters</li>
            <li><strong>Header Tags</strong> - H1, H2, H3 hierarchy</li>
            <li><strong>Image Alt Text</strong> - Describe images</li>
            <li><strong>URL Structure</strong> - Clean, readable URLs</li>
          </ul>
          <h3>Off-Page SEO:</h3>
          <ul>
            <li>Backlink building</li>
            <li>Social media signals</li>
            <li>Guest posting</li>
          </ul>
        `
      },
      {
        id: 'dm-quiz-1',
        title: 'Quiz: Digital Marketing',
        duration: '10 min',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            question: 'What does SEO stand for?',
            options: [
              'Search Engine Optimization',
              'Social Engine Output',
              'Search Engine Operation',
              'Site Engine Optimization'
            ],
            correct: 0
          },
          {
            id: 'q2',
            question: 'What is the ideal length for a meta description?',
            options: [
              '50-70 characters',
              '150-160 characters',
              '200-250 characters',
              '300+ characters'
            ],
            correct: 1
          },
          {
            id: 'q3',
            question: 'What is a backlink?',
            options: [
              'An internal link',
              'A broken link',
              'A link from another website to yours',
              'A navigation menu link'
            ],
            correct: 2
          }
        ]
      }
    ]
  },

  {
    id: 9,
    title: 'Python for Data',
    desc: 'Data analysis with pandas and numpy.',
    category: 'data',
    level: 'Beginner',
    icon: '📊',
    lessons: 20,
    duration: '8 hours',
    rating: 4.8,
    students: 2100,
    points: 160,
    skills: ['Python', 'Pandas'],
    curriculum: [
      {
        id: 'py-1',
        title: 'Python Basics for Data',
        duration: '25 min',
        type: 'video',
        content: `
          <h2>Python for Data Science</h2>
          <p>Python is the most popular language for data analysis and machine learning.</p>
          <pre><code>
# Variables and Data Types
name = "Data Analyst"
age = 25
salary = 75000.50
is_employed = True

# Lists
skills = ['Python', 'Pandas', 'NumPy', 'SQL']

# Dictionaries
profile = {
  'name': 'John',
  'skills': skills,
  'experience': 2
}

# List Comprehension
squares = [x**2 for x in range(1, 11)]
print(squares)  # [1, 4, 9, 16, 25, ...]
          </code></pre>
        `
      },
      {
        id: 'py-2',
        title: 'Pandas for Data Analysis',
        duration: '35 min',
        type: 'video',
        content: `
          <h2>Pandas Library</h2>
          <p>Pandas is a powerful data manipulation library for Python.</p>
          <pre><code>
import pandas as pd

# Create DataFrame
data = {
  'Name': ['Alice', 'Bob', 'Charlie'],
  'Age': [25, 30, 35],
  'Salary': [50000, 60000, 70000]
}
df = pd.DataFrame(data)

# Basic Operations
print(df.head())         # First 5 rows
print(df.describe())     # Statistics
print(df['Age'].mean())  # Average age

# Filtering
senior = df[df['Age'] > 28]
high_salary = df[df['Salary'] >= 60000]

# Read CSV
df = pd.read_csv('data.csv')
          </code></pre>
        `
      },
      {
        id: 'py-quiz-1',
        title: 'Quiz: Python for Data',
        duration: '10 min',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            question: 'Which library is used for data manipulation in Python?',
            options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
            correct: 1
          },
          {
            id: 'q2',
            question: 'What method shows the first 5 rows of a DataFrame?',
            options: ['df.show()', 'df.first()', 'df.head()', 'df.top()'],
            correct: 2
          },
          {
            id: 'q3',
            question: 'What is a Python list comprehension?',
            options: [
              'A way to import libraries',
              'A concise way to create lists',
              'A data type',
              'A loop function'
            ],
            correct: 1
          }
        ]
      }
    ]
  },

  {
    id: 10,
    title: 'Content Writing',
    desc: 'Write compelling blogs and web content.',
    category: 'writing',
    level: 'Beginner',
    icon: '✍️',
    lessons: 12,
    duration: '5 hours',
    rating: 4.5,
    students: 800,
    points: 100,
    skills: ['Writing', 'SEO Writing'],
    curriculum: [
      {
        id: 'cw-1',
        title: 'Content Writing Fundamentals',
        duration: '20 min',
        type: 'video',
        content: `
          <h2>Content Writing Basics</h2>
          <p>Content writing is the process of planning, writing, and editing web content 
          for digital marketing purposes.</p>
          <h3>Types of Content:</h3>
          <ul>
            <li><strong>Blog Posts</strong> - Informational articles</li>
            <li><strong>Landing Pages</strong> - Conversion-focused copy</li>
            <li><strong>Social Media</strong> - Short, engaging posts</li>
            <li><strong>Email Newsletters</strong> - Direct audience communication</li>
            <li><strong>Product Descriptions</strong> - Persuasive copy</li>
          </ul>
          <h3>The Writing Process:</h3>
          <ol>
            <li>Research your topic thoroughly</li>
            <li>Create an outline</li>
            <li>Write a compelling headline</li>
            <li>Draft your content</li>
            <li>Edit and proofread</li>
            <li>Optimize for SEO</li>
          </ol>
        `
      },
      {
        id: 'cw-quiz-1',
        title: 'Quiz: Content Writing',
        duration: '10 min',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            question: 'What is the first step in the writing process?',
            options: [
              'Writing the draft',
              'Researching your topic',
              'Creating the headline',
              'Publishing the content'
            ],
            correct: 1
          },
          {
            id: 'q2',
            question: 'What type of content focuses on conversions?',
            options: [
              'Blog Posts',
              'Social Media Posts',
              'Landing Pages',
              'Email Newsletters'
            ],
            correct: 2
          },
          {
            id: 'q3',
            question: 'What does SEO writing involve?',
            options: [
              'Writing code',
              'Optimizing content for search engines',
              'Social media management',
              'Email marketing'
            ],
            correct: 1
          }
        ]
      }
    ]
  },

  {
    id: 11,
    title: 'Video Editing',
    desc: 'Edit videos with Premiere Pro.',
    category: 'media',
    level: 'Beginner',
    icon: '🎬',
    lessons: 24,
    duration: '10 hours',
    rating: 4.7,
    students: 1100,
    points: 140,
    skills: ['Video Editing', 'Premiere Pro'],
    curriculum: [
      {
        id: 've-1',
        title: 'Introduction to Video Editing',
        duration: '20 min',
        type: 'video',
        content: `
          <h2>Video Editing Basics</h2>
          <p>Video editing is the process of manipulating and rearranging video shots 
          to create a new work.</p>
          <h3>Key Concepts:</h3>
          <ul>
            <li><strong>Timeline</strong> - Where you arrange your clips</li>
            <li><strong>Cut</strong> - Remove unwanted footage</li>
            <li><strong>Transition</strong> - Smooth change between clips</li>
            <li><strong>Color Grading</strong> - Adjust colors and tone</li>
            <li><strong>Audio Mixing</strong> - Balance sound levels</li>
          </ul>
          <h3>Essential Premiere Pro Shortcuts:</h3>
          <ul>
            <li><strong>Ctrl+I</strong> - Import media</li>
            <li><strong>C</strong> - Razor/Cut tool</li>
            <li><strong>V</strong> - Selection tool</li>
            <li><strong>Space</strong> - Play/Pause</li>
            <li><strong>Ctrl+M</strong> - Export media</li>
          </ul>
        `
      },
      {
        id: 've-quiz-1',
        title: 'Quiz: Video Editing',
        duration: '10 min',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            question: 'What is the timeline in video editing?',
            options: [
              'A clock feature',
              'Where you arrange and edit clips',
              'An export setting',
              'A color tool'
            ],
            correct: 1
          },
          {
            id: 'q2',
            question: 'What does color grading do?',
            options: [
              'Adds text to videos',
              'Cuts unwanted footage',
              'Adjusts colors and tone',
              'Exports the video'
            ],
            correct: 2
          },
          {
            id: 'q3',
            question: 'Which shortcut exports media in Premiere Pro?',
            options: ['Ctrl+E', 'Ctrl+S', 'Ctrl+M', 'Ctrl+X'],
            correct: 2
          }
        ]
      }
    ]
  },

  {
    id: 12,
    title: 'MongoDB Basics',
    desc: 'NoSQL database design and CRUD.',
    category: 'programming',
    level: 'Intermediate',
    icon: '🗄️',
    lessons: 15,
    duration: '6 hours',
    rating: 4.5,
    students: 950,
    points: 150,
    skills: ['MongoDB', 'NoSQL'],
    curriculum: [
      {
        id: 'mongo-1',
        title: 'Introduction to MongoDB',
        duration: '20 min',
        type: 'video',
        content: `
          <h2>What is MongoDB?</h2>
          <p>MongoDB is a NoSQL document database that stores data in flexible, 
          JSON-like documents.</p>
          <h3>Key Concepts:</h3>
          <ul>
            <li><strong>Database</strong> - Container for collections</li>
            <li><strong>Collection</strong> - Group of documents (like a table)</li>
            <li><strong>Document</strong> - A record (like a row)</li>
            <li><strong>Field</strong> - A key-value pair</li>
          </ul>
          <pre><code>
// MongoDB Document Example
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "skills": ["JavaScript", "MongoDB"],
  "address": {
    "city": "New York",
    "country": "USA"
  }
}
          </code></pre>
        `
      },
      {
        id: 'mongo-2',
        title: 'CRUD Operations',
        duration: '30 min',
        type: 'video',
        content: `
          <h2>CRUD Operations in MongoDB</h2>
          <p>CRUD stands for Create, Read, Update, and Delete.</p>
          <pre><code>
// CREATE
db.users.insertOne({
  name: "Alice",
  email: "alice@example.com",
  age: 28
});

// READ
db.users.find({ age: { $gte: 25 } });
db.users.findOne({ email: "alice@example.com" });

// UPDATE
db.users.updateOne(
  { email: "alice@example.com" },
  { $set: { age: 29 } }
);

// DELETE
db.users.deleteOne({ email: "alice@example.com" });
          </code></pre>
        `
      },
      {
        id: 'mongo-quiz-1',
        title: 'Quiz: MongoDB Basics',
        duration: '10 min',
        type: 'quiz',
        questions: [
          {
            id: 'q1',
            question: 'What type of database is MongoDB?',
            options: [
              'Relational Database',
              'NoSQL Document Database',
              'Graph Database',
              'Key-Value Store'
            ],
            correct: 1
          },
          {
            id: 'q2',
            question: 'What is a MongoDB collection?',
            options: [
              'A single document',
              'A database',
              'A group of documents',
              'A field'
            ],
            correct: 2
          },
          {
            id: 'q3',
            question: 'Which MongoDB method reads a single document?',
            options: [
              'db.find()',
              'db.findOne()',
              'db.getOne()',
              'db.readOne()'
            ],
            correct: 1
          }
        ]
      }
    ]
  }
];