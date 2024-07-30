import React from 'react'

interface CourseCardProps {
  title: string;
  description: string;
  level: string;
  author: string;
  authorLink: string;
  progress: number;
  onClick: () => void;
  onProgress: (progress: number) => void;
}

export default function CourseCard({
  title,
  description,
  level,
  author,
  authorLink,
  progress,
  onClick,
  onProgress 
}: CourseCardProps) {

  const handleProgressUpdate = (newProgress: number) => {
    onProgress(newProgress);
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105" onClick={onClick}>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-sm text-gray-500 mb-2">Level: {level}</p>
        <a href={authorLink} className="text-sm text-blue-500 hover:underline">
          By {author}
        </a>
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 rounded-full h-2"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{progress}% Complete</p>
        </div>
      </div>
    </div>
    
  )
}