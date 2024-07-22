// components/CourseList.tsx
import React from 'react'
import CourseCard from './CourseCard'
import { Course } from '@/types'

const courses: Course[] = [
  {
    id: 1,
    title: "Basics",
    description: "A comprehensive journey through React's core concepts and best practices",
    level: "Beginner to Intermediate",
    content: `
# Mastering React Fundamentals

## What is React?

React is a powerful JavaScript library for building user interfaces. Developed by Facebook, it's known for its efficiency, flexibility, and component-based architecture.

## Key Concepts

1. **Components**: The building blocks of React applications
2. **JSX**: A syntax extension for JavaScript that looks similar to XML or HTML
3. **State and Props**: Mechanisms for managing and passing data in React
4. **Hooks**: Functions that let you use state and other React features without writing a class

## Your First React Component

Let's create a simple React component:

\`\`\`jsx
import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

export default Welcome;
\`\`\`

## Interactive Exercise: State Management

Let's create a counter component using React's useState hook:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

Try implementing this counter component in your React application!

## Challenge

Create a ToDo list component that allows users to add and remove items. Use the useState hook to manage the list of tasks.

## Further Reading

1. [React Official Documentation](https://reactjs.org/docs/getting-started.html)
2. [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
3. [React DevTools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)

Happy coding with React!
    `,
    author: "John Paul",
    authorLink: "https://john-porfolio.vercel.app"
  },
  {
    id: 2,
    title: "Advanced",
    description: "Dive deep into advanced JavaScript concepts and patterns",
    level: "Intermediate to Advanced",
    content: `
# Advanced JavaScript Mastery

## Topics Covered

1. Closures and Lexical Scope
2. Promises, Async/Await, and Error Handling
3. Prototypal Inheritance and ES6 Classes
4. Functional Programming Concepts
5. Design Patterns in JavaScript

## Closures

Closures are a powerful feature in JavaScript. They allow a function to access variables from its outer (enclosing) lexical scope even after the outer function has returned.

Example:

\`\`\`javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  }
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3
\`\`\`

## Promises and Async/Await

Promises provide a way to handle asynchronous operations. Async/Await is syntactic sugar built on top of promises, making asynchronous code look and behave more like synchronous code.

\`\`\`javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    const userData = await response.json();
    console.log(userData);
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
}

fetchUserData(123);
\`\`\`

## Interactive Exercise: Implementing a Debounce Function

Let's implement a debounce function, which is useful for performance optimization:

\`\`\`javascript
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Usage
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

// Simulate rapid typing
debouncedSearch('a');
debouncedSearch('ap');
debouncedSearch('app');
debouncedSearch('appl');
debouncedSearch('apple');
\`\`\`

Try implementing this debounce function and use it in a real-world scenario, like an autocomplete search input!

## Challenge

Implement a simple pub/sub (publish-subscribe) pattern in JavaScript. This pattern allows for better decoupling of components in your application.

## Further Reading

1. [You Don't Know JS (book series)](https://github.com/getify/You-Dont-Know-JS)
2. [JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)
3. [Functional-Light JavaScript](https://github.com/getify/Functional-Light-JS)

Master these concepts to become a JavaScript pro!
    `,
    author: "John Paul",
    authorLink: "https://john-porfolio.vercel.app"
  },
]

interface CourseListProps {
  onSelectCourse: (course: Course) => void
}

export default function CourseList({ onSelectCourse }: CourseListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            level={course.level}
            author={course.author}
            authorLink={course.authorLink}
            onClick={() => onSelectCourse(course)}
          />
        ))}
      </div>
    </div>
  )
}