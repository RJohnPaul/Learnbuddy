import mongoose, { Schema, Document } from 'mongoose';

interface ICourse extends Document {
  title: string;
  description: string;
  category: string;
  level: string;
  url: string;
}

const CourseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, required: true },
  url: { type: String, required: true },
});

export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
