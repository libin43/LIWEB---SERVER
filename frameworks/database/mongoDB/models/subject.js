import mongoose from 'mongoose';

const { Schema } = mongoose;
const subjectSchema = new Schema({
  subjectName: {
    type: String,
    required: true,
  },
  subjectCode: {
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
});

const SubjectModel = mongoose.model('Subject', subjectSchema);

SubjectModel.ensureIndexes().then(() => {
  console.log('Indexes have been created for subject');
}).catch((err) => {
  console.error('Error creating indexes: subject', err);
});

export default SubjectModel;
