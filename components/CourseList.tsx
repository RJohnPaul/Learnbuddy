// components/CourseList.tsx
import React from 'react'
import CourseCard from './CourseCard'
import { Course } from '@/types'

const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to React Basics",
    description: "Learn the basics of React",
    level: "Beginner",
    content: `
# Introduction to React Basics

## What is React?

React is a JavaScript library for building user interfaces. It's declarative, efficient, and flexible.

## Key Concepts

1. Components
2. JSX
3. State and Props

## Your First React Component

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

Start building with React today!
    `
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into JavaScript concepts",
    level: "Intermediate",
    content: `
# Advanced JavaScript

## Topics Covered

1. Closures
2. Promises and Async/Await
3. Prototypal Inheritance

## Example: Closure

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
\`\`\`

Master these concepts to become a JavaScript pro!
    `
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
            onClick={() => onSelectCourse(course)}
          />
        ))}
      </div>
    </div>
  )
}