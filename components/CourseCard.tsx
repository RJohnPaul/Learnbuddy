// components/CourseCard.tsx
import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

interface CourseCardProps {
  title: string
  description: string
  level: string
  author: string
  authorLink: string
  onClick: () => void
}

export default function CourseCard({ title, description, level, author, authorLink, onClick }: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        <p className="mt-2 text-sm text-gray-500">Level: {level}</p>
        <p className="mt-2 text-sm">
          By: <Link href={authorLink} className="text-blue-500 hover:underline">{author}</Link>
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onClick}>Start Course</Button>
      </CardFooter>
    </Card>
  )
}