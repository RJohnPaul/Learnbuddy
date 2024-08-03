// components/Dashboard.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CourseList from '@/components/CourseList'
import CourseContent from '@/components/CouseContent'
import EnhancedSearch, { SearchResults } from '@/components/EnhancedSearch'
import InteractiveQA from '@/components/InteractiveQA'
import { Course } from '@/types'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { logout } from '@/utils/auth'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [courseProgress, setCourseProgress] = useState(0)
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null)
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

  const handleProgress = (progress: number) => {
    setCourseProgress(progress)
  }

  const handleSearch = (results: SearchResults) => {
    setSearchResults(results)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
                  LearnBud
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  Featured Course
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  Master React and build powerful web applications.
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link href="/courses/react">React Fundamentals</Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link href="/courses/javascript">Advanced JavaScript</Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link href="/courses">All Courses</Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/dashboard" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Dashboard
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/profile" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Profile
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>
                      Navigate through your learning journey.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col space-y-4">
                    <Link href="/courses" className="text-blue-600 hover:underline">
                      Courses
                    </Link>
                    <Link href="/dashboard" className="text-blue-600 hover:underline">
                      Dashboard
                    </Link>
                    <Link href="/profile" className="text-blue-600 hover:underline">
                      Profile
                    </Link>
                    <Button onClick={handleLogout} variant="outline">Logout</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Learning Dashboard</h1>
          
          <EnhancedSearch onSearch={handleSearch} />

          {searchResults && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Search Results</h2>
              <p>{searchResults.results}</p>
            </div>
          )}

          {selectedCourse ? (
            <CourseContent
              course={selectedCourse}
              onBack={() => setSelectedCourse(null)}
              onProgress={handleProgress}
            />
          ) : (
            <CourseList
              onSelectCourse={setSelectedCourse}
              onUpdateProgress={handleProgress}
            />
          )}

          <InteractiveQA />

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{width: `${courseProgress}%`}}
              ></div>
            </div>
            <p className="mt-2">Overall progress: {courseProgress.toFixed(0)}%</p>
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-md mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2023 LearnBud. All rights reserved.
            Created by <a href="https://john-porfolio.vercel.app" className="text-blue-600 hover:underline">John Paul</a>
          </p>
        </div>
      </footer>
    </div>
  )
}