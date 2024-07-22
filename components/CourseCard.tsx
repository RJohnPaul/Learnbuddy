// components/CourseCard.tsx
import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface CourseCardProps {
  title: string
  description: string
  level: string
  onClick: () => void
}

export default function CourseCard({ title, description, level, onClick }: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        <p className="mt-2 text-sm text-gray-500">Level: {level}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onClick}>Start Course</Button>
      </CardFooter>
    </Card>
  )
}