// types.ts

export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  content: string;
  author: string;
  authorLink: string;
  quizzes: Quiz[];
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}