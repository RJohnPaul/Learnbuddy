// components/CourseContent.tsx
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import ReactMarkdown from 'react-markdown'
import { Course } from '@/types'
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"

interface CourseContentProps {
  course: Course;
  onBack: () => void;
  onProgress: (progress: number) => void;
}

export default function CourseContent({ course, onBack, onProgress }: CourseContentProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizProgress, setQuizProgress] = useState(0)
  const [aiResponse, setAiResponse] = useState('')
  const [userQuestion, setUserQuestion] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    setQuizProgress((currentQuizIndex / course.quizzes.length) * 100)
  }, [currentQuizIndex, course.quizzes.length])

  const handleQuizSubmit = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === course.quizzes[currentQuizIndex].correctAnswer

    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Great job! Moving to the next question.",
        variant: "default",
      })

      setTimeout(() => {
        if (currentQuizIndex < course.quizzes.length - 1) {
          setCurrentQuizIndex(currentQuizIndex + 1)
          const newProgress = ((currentQuizIndex + 2) / course.quizzes.length) * 100
          setQuizProgress(newProgress)
          onProgress(newProgress)
        } else {
          setQuizCompleted(true)
          setQuizProgress(100)
          onProgress(100)
        }
        setSelectedAnswer(null)
      }, 1500)
    } else {
      toast({
        title: "Incorrect",
        description: "Sorry, that's not the right answer. Try again!",
        variant: "destructive",
      })
      setSelectedAnswer(null)
    }
  }

  const resetQuiz = () => {
    setCurrentQuizIndex(0)
    setQuizCompleted(false)
    setSelectedAnswer(null)
    setQuizProgress(0)
    onProgress(0)
  }

  const handleAskAI = async () => {
    if (!userQuestion) return

    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: userQuestion, 
          context: course.title + ' ' + course.content 
        }),
      })
      const data = await response.json()
      setAiResponse(data.answer)
    } catch (error) {
      console.error('Error asking AI:', error)
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
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

      {/* AI Tutor Section */}
      <div className="mt-8 mb-8">
        <h3 className="text-xl font-bold mb-4">Ask AI Tutor</h3>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Ask a question about this course..."
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
          />
          <Button onClick={handleAskAI}>Ask</Button>
        </div>
        {aiResponse && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h4 className="font-bold">AI Tutor Response:</h4>
            <p>{aiResponse}</p>
          </div>
        )}
      </div>

      {!quizCompleted ? (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Quiz</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${quizProgress}%`}}></div>
          </div>
          <p className="mb-4">{course.quizzes[currentQuizIndex].question}</p>
          {course.quizzes[currentQuizIndex].options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1 }}
              animate={{
                opacity: selectedAnswer === index ? (selectedAnswer === course.quizzes[currentQuizIndex].correctAnswer ? 0 : 1) : 1,
                backgroundColor: selectedAnswer === index ? (selectedAnswer === course.quizzes[currentQuizIndex].correctAnswer ? "#4ade80" : "transparent") : "transparent"
              }}
              transition={{ duration: 0.5 }}
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
          <Button onClick={resetQuiz} className="mt-4">Reset Quiz</Button>
        </div>
      )}
    </div>
  )
}