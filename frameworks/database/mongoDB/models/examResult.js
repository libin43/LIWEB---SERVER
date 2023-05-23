import mongoose from 'mongoose';

const { Schema } = mongoose;
const examResultSchema = new Schema(
  {
    classID: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    subjectID: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    examID: {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
    },
    totalMark: {
      type: Number,
      required: true,
    },
    resultSheet: {
      type: [
        {
          studentID: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
          },
          examMarkObtained: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true },
);

const ExamResultModel = mongoose.model('Exam Result', examResultSchema);

ExamResultModel.ensureIndexes().then(() => {
  console.log('Indexes have been created for exam result');
}).catch((err) => {
  console.error('Error creating indexes: exam result', err);
});

export default ExamResultModel;
