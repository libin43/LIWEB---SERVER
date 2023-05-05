import mongoose from 'mongoose';

const { Schema } = mongoose;

const classSchema = new Schema(
  {
    className: {
      type: String,
      required: true,
    },
    academicYearID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    facultyID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    schoolID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    subjectSheet: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: 'Subject',
      required: true,
    },
    studentSheet: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: 'Student',
      required: true,
    },
    status: {
      type: String,
      default: 'active',
    },
  },
  { timestamps: true },
);

const ClassModel = mongoose.model('Class', classSchema);

ClassModel.ensureIndexes().then(() => {
  console.log('Indexes have been created for classes');
}).catch((err) => {
  console.error('Error creating indexes: classes', err);
});

export default ClassModel;
