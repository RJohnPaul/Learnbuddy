// components/CoursesDashboard.tsx
import React from 'react'
import CourseCard from './CourseCard'
import { Card, CardContent } from "@/components/ui/card"

const mockCourses = [
  { id: 1, title: "Introduction to React Basics", description: "Learn the basics of React", level: "Beginner" },
  { id: 2, title: "Advanced JavaScript", description: "Deep dive into JavaScript concepts", level: "Intermediate" },
]

export default function CoursesDashboard() {
  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Your Recommended Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              level={course.level}
              onClick={() => console.log(`Starting course: ${course.title}`)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}