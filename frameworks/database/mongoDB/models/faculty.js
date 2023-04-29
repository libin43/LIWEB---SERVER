import mongoose from 'mongoose';

const { Schema } = mongoose;
const facultySchema = new Schema(
  {
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
    facultyImage: {
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
      default: 'activeEmployee',
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
      default: 'faculty',
    },
  },
  { timestamps: true },
);

const FacultyModel = mongoose.model('Faculty', facultySchema);

FacultyModel.ensureIndexes().then(() => {
  console.log('Indexes have been created for faculty');
}).catch((err) => {
  console.error('Error creating indexes: faculty', err);
});

export default FacultyModel;
