// components/CourseList.tsx
import React, { useState } from 'react'
import CourseCard from './CourseCard'
import { Course } from '@/types'

const courses: Course[] = [
  {
    id: 1,
    title: "React for Everyone",
    description: "Learn the basics of React in a fun and interactive way",
    level: "Beginner",
    content: `
# Welcome to React for Everyone!

## What is React?

React is a popular tool for building websites and apps. Think of it like digital Lego blocks that help create interactive web pages.

## Key Concepts

1. **Components**: These are like building blocks for your website
2. **Props**: A way to pass information between components
3. **State**: How React remembers and updates information

## Let's Build Something!

We'll create a simple greeting component:

\`\`\`jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

This component says hello to anyone you want!

## Interactive Exercise: A Like Button

Let's create a button that counts likes:

\`\`\`jsx
function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <div>
      <p>This post has {likes} likes</p>
      <button onClick={() => setLikes(likes + 1)}>
        Like this!
      </button>
    </div>
  );
}
\`\`\`

Try making this button and see how many likes you can get!

## Fun Fact

Did you know? React was first used on Facebook's newsfeed in 2011!

Keep exploring and have fun with React!
    `,
    author: "John Paul",
    authorLink: "https://john-porfolio.vercel.app",
    quizzes: [
      {
        question: "What is a component in React?",
        options: [
          "A type of CSS style",
          "A building block for creating user interfaces",
          "A JavaScript function",
          "A database table"
        ],
        correctAnswer: 1
      },
      {
        question: "What does JSX stand for?",
        options: [
          "JavaScript XML",
          "Java Syntax Extension",
          "JSON XML",
          "JavaScript Extension"
        ],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 2,
    title: "JavaScript Magic",
    description: "Discover the wonders of JavaScript through fun examples",
    level: "Beginner to Intermediate",
    content: `
# JavaScript Magic

## What is JavaScript?

JavaScript is like a magician's wand for websites. It can make web pages come alive with interactivity!

## Cool Things You Can Do

1. Make buttons do things when clicked
2. Create pop-up messages
3. Change colors and styles on the fly
4. Build games and animations

## Let's Try Some Magic!

Here's a spell to make a message appear:

\`\`\`javascript
function revealMessage() {
  alert("🎉 You've discovered the secret message! 🎉");
}
\`\`\`

## Interactive Exercise: Color Changer

Let's create a button that changes colors:

\`\`\`javascript
function changeColor() {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
}
\`\`\`

Try making this color-changing button on your webpage!

## Fun Fact

JavaScript was created in just 10 days in 1995 by Brendan Eich!

Keep exploring and enjoy the magic of JavaScript!
    `,
    author: "John Paul",
    authorLink: "https://john-porfolio.vercel.app",
    quizzes: [
      {
        question: "What can JavaScript do on a webpage?",
        options: [
          "Make coffee",
          "Change colors",
          "Cook dinner",
          "Drive a car"
        ],
        correctAnswer: 1
      },
      {
        question: "How long did it take to create JavaScript?",
        options: [
          "10 years",
          "10 months",
          "10 weeks",
          "10 days"
        ],
        correctAnswer: 3
      }
    ]
  },
]

interface CourseListProps {
  onSelectCourse: (course: Course) => void;
  onUpdateProgress: (progress: number) => void;
}

export default function CourseList({ onSelectCourse, onUpdateProgress }: CourseListProps) {
  const [progress, setProgress] = useState<{[key: number]: number}>({})

  const handleProgress = (courseId: number, newProgress: number) => {
    setProgress(prev => ({...prev, [courseId]: newProgress}))
    onUpdateProgress(newProgress)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Fun Learning Adventures</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            level={course.level}
            author={course.author}
            authorLink={course.authorLink}
            progress={progress[course.id] || 0}
            onClick={() => onSelectCourse(course)}
          />
        ))}
      </div>
    </div>
  )
}