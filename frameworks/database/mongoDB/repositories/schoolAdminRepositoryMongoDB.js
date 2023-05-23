import mongoose from 'mongoose';
import SchoolAdminModel from '../models/schoolAdmin.js';

export default function schoolAdminRepositoryMongoDB() {
  const signup = (schoolAdminEntity) => {
    const newSchoolAdmin = new SchoolAdminModel({
      schoolAdminName: schoolAdminEntity.getSchoolAdminName(),
      schoolName: schoolAdminEntity.getSchoolName(),
      afflNumber: schoolAdminEntity.getAffiliationNumber(),
      email: schoolAdminEntity.getEmail(),
      phone: schoolAdminEntity.getPhoneNumber(),
      address: schoolAdminEntity.getAddress(),
      pincode: schoolAdminEntity.getPincode(),
      schoolImage: schoolAdminEntity.getSchoolImage(),
      password: schoolAdminEntity.getPassword(),
      createdAt: schoolAdminEntity.getCreatedAt(),
      updatedAt: schoolAdminEntity.getUpdatedAt(),
    });
    return newSchoolAdmin.save();
  };

  const getSchoolAdminByEmail = async (email) => {
    const schoolAdmin = await SchoolAdminModel.findOne({ email });
    return schoolAdmin;
  };

  const setSchoolAdminOtp = async (email, otp, otpExpirationTime) => {
    const schoolAdmin = await SchoolAdminModel.findOneAndUpdate(
      { email },
      { otp, otpExpirationTime },
      { upsert: true, new: true },
    )
      .select('email');
    return schoolAdmin;
  };

  const getSchoolAdminById = async (_id) => {
    const schoolAdmin = await SchoolAdminModel.findOne({ _id })
      .select('schoolAdminName schoolName role');
    return schoolAdmin;
  };

  const getYearlyAdmissions = async (schoolID, skip) => {
    const data = await SchoolAdminModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(schoolID) } },
      {
        $lookup: {
          from: 'academic years', foreignField: 'schoolID', localField: '_id', as: 'AcademicYear',
        },
      }, { $unwind: '$AcademicYear' }, {
        $project: {
          schoolID: '$AcademicYear.schoolID', academicYearID: '$AcademicYear._id', startDate: '$AcademicYear.startDate', endDate: '$AcademicYear.endDate', _id: 0,
        },
      }, {
        $lookup: {
          from: 'students', foreignField: 'dateOfJoin', localField: 'academicYearID', as: 'Students',
        },
      }, { $project: { startDate: 1, endDate: 1, newAdmissions: { $size: '$Students' } } },
      { $sort: { startDate: -1 } },
      {
        $facet: {
          totalCount: [{ $count: 'count' }],
          data: [{ $skip: skip }, { $limit: 3 }, { $sort: { startDate: 1 } }],
        },
      },
    ]);
    return data;
  };

  return {
    signup,
    getSchoolAdminByEmail,
    setSchoolAdminOtp,
    getSchoolAdminById,
    getYearlyAdmissions,
  };
}
