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

  const getAcademicYear = async (schoolID) => {
    const academicYear = await AcademicYearModel.find({ schoolID });
    console.log(academicYear, 'its academiocyeare');
    return academicYear;
  };

  return {
    isAcademicYearValidLimit,
    setNewAcademicYear,
    getAcademicYear,
  };
}
