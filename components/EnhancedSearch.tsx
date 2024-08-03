// components/EnhancedSearch.tsx
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface SearchResults {
  results: string;
}

export interface EnhancedSearchProps {
  onSearch: (results: SearchResults) => void;
}

const EnhancedSearch: React.FC<EnhancedSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleSearch = async () => {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      const data: SearchResults = await response.json()
      onSearch(data)
    } catch (error) {
      console.error('Error searching:', error)
    }
  }

  return (
    <div className="flex space-x-2">
      <Input
        type="text"
        placeholder="Search courses and lessons..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  )
}

export default EnhancedSearch