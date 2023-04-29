import mongoose from 'mongoose';

const { Schema } = mongoose;
const studentSchema = new Schema({
  studentName: {
    type: String,
  },
  parentName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    lowercase: true,
  },
  phone: {
    type: Number,
    required: true,
    // unique: true,
  },
  address: {
    type: String,
  },
  studentImage: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  dateOfJoin: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
  },
  otp: {
    type: String,
    default: 'Null',
  },
  otpExpirationTime: {
    type: Date,
  },
  status: {
    type: String,
    default: 'activeStudent',
  },
  schoolID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  block: {
    type: String,
    default: 'false',
  },
  role: {
    type: String,
    default: 'student',
  },
});

const StudentModel = mongoose.model('Student', studentSchema);

StudentModel.ensureIndexes().then(() => {
  console.log('Indexes have been created for student');
}).catch((err) => {
  console.error('Error creating indexes: student', err);
});

export default StudentModel;
