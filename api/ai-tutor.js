// pages/api/ai-tutor.js
import { GoogleGenerativeAI } from "@google/generative-ai"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { question, context } = req.body
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    try {
      const prompt = `Context: ${context}\n\nQuestion: ${question}\n\nPlease provide a helpful and informative answer to the question based on the given context.`
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      res.status(200).json({ answer: text })
    } catch (error) {
      res.status(500).json({ error: 'Error processing question' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}