'use client'
interface CourseCardProps {
    title: string;
    description: string;
    level: string;
    onClick: () => void;
  }
  
  export default function CourseCard({ title, description, level, onClick }: CourseCardProps) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">Level: {level}</p>
        <p className="mb-4">{description}</p>
        <button
          onClick={onClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Course
        </button>
      </div>
    );
  }