import mongoose from 'mongoose';

const { Schema } = mongoose;
const facultySchema = new Schema({
  facultyname: {
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
  role: {
    type: String,
    default: 'faculty',
  },
  createdAt: Date,
  updatedAt: Date,
});

facultySchema.index({ role: 1 });

const FacultyModel = mongoose.model('Faculty', facultySchema);

FacultyModel.ensureIndexes().then(() => {
  console.log('Indexes have been created for faculty');
}).catch((err) => {
  console.error('Error creating indexes: faculty', err);
});

export default FacultyModel;
