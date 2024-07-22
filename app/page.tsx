'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CoursesDashboard from '@/components/CoursesDashboard'
import BlogDashboard from '@/components/BlogDashboard'

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Learning Dashboard</h1>
      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <CoursesDashboard />
        </TabsContent>
        <TabsContent value="blog">
          <BlogDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}