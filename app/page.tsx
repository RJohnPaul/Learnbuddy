// app/page.tsx
'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import CourseList from '@/components/CourseList'
import CourseContent from '@/components/CouseContent'
import { Course } from '@/types'

export default function Dashboard() {
  const [started, setStarted] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  if (!started) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Learning Platform</h1>
        <p className="text-xl mb-8">Get ready to embark on an exciting learning journey!</p>
        <Button onClick={() => setStarted(true)}>Get Started</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Learning Dashboard</h1>
      {selectedCourse ? (
        <CourseContent course={selectedCourse} onBack={() => setSelectedCourse(null)} />
      ) : (
        <CourseList onSelectCourse={setSelectedCourse} />
      )}
    </div>
  )
}