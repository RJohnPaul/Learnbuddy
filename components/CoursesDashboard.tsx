// components/CoursesDashboard.tsx
import React, { useState } from 'react'
import CourseCard from './CourseCard'
import CourseContent from './CouseContent'
import { Card, CardContent } from "@/components/ui/card"
import { Course } from '@/types'
import { Toaster } from "@/components/ui/toaster"


const mockCourses: Course[] = [
  {
    id: 1,
    title: "Introduction to React Basics",
    description: "Learn the basics of React",
    level: "Beginner",
    content: `
# Introduction to React Basics

React is a popular JavaScript library for building user interfaces. Let's learn some basics!

## Components

Components are the building blocks of React applications. They are reusable pieces of code that define how a part of the UI should appear and function.

## JSX

JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code in your JavaScript files.

## Props

Props are a way to pass data from parent components to child components. They are read-only and help make your components reusable.

Now, let's test your knowledge!
    `,
    author: "John Doe",
    authorLink: "https://johndoe.com",
    quizzes: [
      {
        question: "What are the building blocks of React applications?",
        options: ["Elements", "Components", "Functions", "Classes"],
        correctAnswer: 1
      },
      {
        question: "What does JSX stand for?",
        options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "Java XML"],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into JavaScript concepts",
    level: "Intermediate",
    content: `
# Advanced JavaScript Concepts

Let's explore some advanced JavaScript topics!

## Closures

Closures are functions that have access to variables in their outer (enclosing) lexical scope, even after the outer function has returned.

## Promises

Promises are objects representing the eventual completion or failure of an asynchronous operation. They help manage asynchronous code more effectively.

## Async/Await

Async/Await is syntactic sugar built on top of promises, making asynchronous code look and behave more like synchronous code.

Let's test your understanding!
    `,
    author: "Jane Smith",
    authorLink: "https://janesmith.com",
    quizzes: [
      {
        question: "What do closures have access to?",
        options: ["Global variables only", "Local variables only", "Variables in their outer lexical scope", "No variables"],
        correctAnswer: 2
      },
      {
        question: "What is Async/Await built on top of?",
        options: ["Callbacks", "Promises", "Classes", "Arrays"],
        correctAnswer: 1
      }
    ]
  },
]
