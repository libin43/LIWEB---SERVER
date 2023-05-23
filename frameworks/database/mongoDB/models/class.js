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
      ref: 'Academic Year',
      required: true,
    },
    facultyID: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
    schoolID: {
      type: Schema.Types.ObjectId,
      ref: 'School Admin',
      required: true,
    },
    subjectSheet: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: 'Subject',
      required: true,
    },
    studentSheet: [
      {
        studentID: {
          type: Schema.Types.ObjectId,
          ref: 'Student',
          required: true,
        },
        isMoved: {
          type: Boolean,
          default: false,
        },
      },
    ],
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
