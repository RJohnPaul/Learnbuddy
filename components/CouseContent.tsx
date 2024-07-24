// components/CourseContent.tsx
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import ReactMarkdown from 'react-markdown'
import { Course } from '@/types'
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

interface CourseContentProps {
  course: Course;
  onBack: () => void;
  onProgress: (progress: number) => void;
}

export default function CourseContent({ course, onBack, onProgress }: CourseContentProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const { toast } = useToast()

  const handleQuizSubmit = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === course.quizzes[currentQuizIndex].correctAnswer

    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Great job! Moving to the next question.",
        variant: "success" as "default" | "destructive" | null | undefined,
      })

      setTimeout(() => {
        if (currentQuizIndex < course.quizzes.length - 1) {
          setCurrentQuizIndex(currentQuizIndex + 1)
          onProgress(((currentQuizIndex + 2) / course.quizzes.length) * 100)
        } else {
          setQuizCompleted(true)
          onProgress(100)
        }
        setSelectedAnswer(null)
      }, 1500) // Wait for 1.5 seconds before moving to the next question
    } else {
      toast({
        title: "Incorrect",
        description: "Sorry, that's not the right answer. Try again!",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <Button onClick={onBack} className="mb-4">Back to Courses</Button>
      <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
      <div className="prose max-w-none mb-8">
        <ReactMarkdown>{course.content}</ReactMarkdown>
      </div>
      {!quizCompleted ? (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Quiz</h3>
          <p className="mb-4">{course.quizzes[currentQuizIndex].question}</p>
          {course.quizzes[currentQuizIndex].options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1 }}
              animate={{
                opacity: selectedAnswer === index && selectedAnswer === course.quizzes[currentQuizIndex].correctAnswer ? 0 : 1,
                backgroundColor: selectedAnswer === index && selectedAnswer === course.quizzes[currentQuizIndex].correctAnswer ? "#4ade80" : "transparent"
              }}
              transition={{ duration: 1 }}
            >
              <Button
                className={`block w-full text-left p-2 my-2 ${selectedAnswer === index && selectedAnswer === course.quizzes[currentQuizIndex].correctAnswer ? 'bg-green-400' : ''}`}
                onClick={() => handleQuizSubmit(index)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </Button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Congratulations!</h3>
          <p>You've completed this course. Great job!</p>
        </div>
      )}
    </div>
  )
}