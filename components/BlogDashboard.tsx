import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import ReactMarkdown from 'react-markdown'

export default function BlogDashboard() {
  const [posts, setPosts] = useState<{ title: string; content: string }[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPosts([...posts, { title, content }])
    setTitle('')
    setContent('')
  }

  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <Input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            className="mb-2"
          />
          <Textarea
            placeholder="Write your post in Markdown..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-2"
          />
          <Button type="submit">Add Post</Button>
        </form>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <Card key={index}>
              <CardContent>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}