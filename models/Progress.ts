import mongoose, { Schema, Document } from 'mongoose';

interface IProgress extends Document {
  userId: string;
  courseId: string;
  progress: number;
}

const ProgressSchema: Schema = new Schema({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  progress: { type: Number, required: true },
});

export default mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);
