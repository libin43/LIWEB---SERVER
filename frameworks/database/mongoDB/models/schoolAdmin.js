import mongoose from 'mongoose';

const { Schema } = mongoose;
const schoolAdminSchema = new Schema({
  schoolAdminName: {
    type: String,
  },
  schoolName: {
    type: String,
    required: true,
    unique: true,
  },
  afflNumber: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  schoolImage: {
    type: String,
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
  role: {
    type: String,
    default: 'schoolAdmin',
  },
  createdAt: Date,
  updatedAt: Date,
});

schoolAdminSchema.index({ role: 1 });

const SchoolAdminModel = mongoose.model('School Admin', schoolAdminSchema);

SchoolAdminModel.ensureIndexes().then(() => {
  console.log('Indexes have been created for school_admin');
}).catch((err) => {
  console.error('Error creating indexes: school_admin', err);
});

export default SchoolAdminModel;
