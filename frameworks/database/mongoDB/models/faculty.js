import mongoose from 'mongoose';

const { Schema } = mongoose;
const facultySchema = new Schema({
  facultyName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  dateOfJoin: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    default: 'faculty',
  },
  schoolName: {
    type: String,
  },
  password: {
    type: String,
  },
  createdAt: Date,
  updatedAt: Date,
});

const FacultyModel = mongoose.model('Faculty', facultySchema);

FacultyModel.ensureIndexes().then(() => {
  console.log('Indexes have been created for faculty');
}).catch((err) => {
  console.error('Error creating indexes: faculty', err);
});

export default FacultyModel;
