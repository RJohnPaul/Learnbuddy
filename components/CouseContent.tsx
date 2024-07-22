// components/CourseContent.tsx
import React from 'react'
import { Button } from "@/components/ui/button"
import ReactMarkdown from 'react-markdown'
import { Course } from '@/types'

interface CourseContentProps {
  course: Course | null;
  onBack: () => void;
}

export default function CourseContent({ course, onBack }: CourseContentProps) {
  if (!course) return null;

  return (
    <div>
      <Button onClick={onBack} className="mb-4">Back to Courses</Button>
      <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
      <div className="prose max-w-none">
        <ReactMarkdown>{course.content}</ReactMarkdown>
      </div>
    </div>
  )
}