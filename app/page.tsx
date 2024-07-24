// app/page.tsx
import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-6 mt-5">Welcome to Our Learning Platform</h1>
      <p className="text-xl mb-8">Get ready to embark on an exciting learning journey!</p>
      <Link href="/login">
        <Button>Login to Get Started</Button>
      </Link>
    </div>
  )
}