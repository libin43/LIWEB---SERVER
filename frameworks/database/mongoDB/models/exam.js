import mongoose from 'mongoose';

const { Schema } = mongoose;
const examSchema = new Schema({
  examName: {
    type: String,
    required: true,
  },
  examDate: {
    type: Date,
    required: true,
  },
  subjectID: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  academicYearID: {
    type: Schema.Types.ObjectId,
    ref: 'Academic Year',
    required: true,
  },
  schoolID: {
    type: Schema.Types.ObjectId,
    ref: 'School Admin',
    required: true,
  },
});

const ExamModel = mongoose.model('Exam', examSchema);

ExamModel.ensureIndexes().then(() => {
  console.log('Indexes have been created for exam');
}).catch((err) => {
  console.error('Error creating indexes: exam', err);
});

export default ExamModel;
