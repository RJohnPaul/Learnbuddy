// pages/api/search.js
import { GoogleGenerativeAI } from "@google/generative-ai"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    try {
      const result = await model.generateContent(`Search for courses and lessons related to: ${query}`)
      const response = await result.response
      const text = response.text()
      res.status(200).json({ results: text })
    } catch (error) {
      res.status(500).json({ error: 'Error processing search' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}