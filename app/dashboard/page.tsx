// app/dashboard/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CourseList from '@/components/CourseList'
import CourseContent from '@/components/CouseContent'
import { Course } from '@/types'
import { Button } from "@/components/ui/button"
import { logout } from '@/utils/auth'

export default function Dashboard() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Learning Dashboard</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      {selectedCourse ? (
        <CourseContent course={selectedCourse} onBack={() => setSelectedCourse(null)} />
      ) : (
        <CourseList onSelectCourse={setSelectedCourse} />
      )}
    </div>
  )
}