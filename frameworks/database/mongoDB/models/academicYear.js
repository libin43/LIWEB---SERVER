import mongoose from 'mongoose';

const { Schema } = mongoose;

const academicYearSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    schoolID: {
      type: Schema.Types.ObjectId,
      ref: 'School Admin',
      required: true,
    },
    status: {
      type: String,
      default: 'created',
    },
  },
  { timestamps: true },
);

const AcademicYearModel = mongoose.model('Academic Year', academicYearSchema);

AcademicYearModel.ensureIndexes().then(() => {
  console.log('Indexes have been created for academic year');
}).catch((err) => {
  console.error('Error creating indexes: academic year', err);
});

export default AcademicYearModel;
