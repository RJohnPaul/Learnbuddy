// components/CourseView.tsx
import React, { useState } from 'react'
import { Course, Quiz } from '@/types'
import ReactMarkdown from 'react-markdown'

interface CourseViewProps {
  course: Course
  onProgress: (progress: number) => void
}

export default function CourseView({ course, onProgress }: CourseViewProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleQuizSubmit = (selectedAnswer: number) => {
    if (selectedAnswer === course.quizzes[currentQuizIndex].correctAnswer) {
      if (currentQuizIndex < course.quizzes.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1)
      } else {
        setQuizCompleted(true)
        onProgress(100) // Assume course is completed when all quizzes are done
      }
    } else {
      alert("Oops! That's not correct. Try again!")
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <ReactMarkdown>{course.content}</ReactMarkdown>
      {!quizCompleted && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Quiz Time!</h2>
          <p>{course.quizzes[currentQuizIndex].question}</p>
          {course.quizzes[currentQuizIndex].options.map((option, index) => (
            <button
              key={index}
              className="block w-full text-left p-2 my-2 bg-gray-100 hover:bg-gray-200 rounded"
              onClick={() => handleQuizSubmit(index)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {quizCompleted && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
          <p>You've completed this course. Great job!</p>
        </div>
      )}
    </div>
  )
}