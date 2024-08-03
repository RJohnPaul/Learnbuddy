// components/InteractiveQA.tsx
'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InteractiveQA() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const handleAskQuestion = async () => {
    try {
      const response = await fetch('/api/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const data = await response.json()
      setAnswer(data.answer)
    } catch (error) {
      console.error('Error asking question:', error)
    }
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Ask a Question</h2>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Ask about React, JavaScript, etc."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button onClick={handleAskQuestion}>Ask</Button>
      </div>
      {answer && (
        <div className="mt-4">
          <h3 className="font-semibold">Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}