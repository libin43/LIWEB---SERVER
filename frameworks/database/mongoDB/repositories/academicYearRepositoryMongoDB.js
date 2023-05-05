import AcademicYearModel from '../models/academicYear.js';

export default function academicYearRepositoryMongoDB() {
  const isAcademicYearValidLimit = async (academicYearEntity) => {
    const isValidLimit = await AcademicYearModel.findOne(

      {
        $and: [
          { startDate: { $lte: academicYearEntity.getEndDate() } },
          { endDate: { $gte: academicYearEntity.getStartDate() } },
          { schoolID: { $eq: academicYearEntity.getSchoolID() } },
        ],
      },
    );
    return isValidLimit;
  };
  const setNewAcademicYear = (academicYearEntity) => {
    const newAcademicYear = new AcademicYearModel({
      startDate: academicYearEntity.getStartDate(),
      endDate: academicYearEntity.getEndDate(),
      schoolID: academicYearEntity.getSchoolID(),
    });
    return newAcademicYear.save();
  };

  const getAllAcademicYear = async (schoolID) => {
    const academicYear = await AcademicYearModel.find({ schoolID });
    return academicYear;
  };

  const getAcademicYearByID = async (academicYearID) => {
    const academicYearData = await AcademicYearModel.findOne({ _id: academicYearID });
    return academicYearData;
  };

  return {
    isAcademicYearValidLimit,
    setNewAcademicYear,
    getAllAcademicYear,
    getAcademicYearByID,
  };
}
