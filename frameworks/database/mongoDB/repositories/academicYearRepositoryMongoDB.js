import AcademicYearModel from '../models/academicYear.js';

export default function academicYearRepositoryMongoDB() {
  const isAcademicYearValidLimit = async (academicYearEntity) => {
    const isValidLimit = await AcademicYearModel.findOne(

      {
        $and: [
          { startDate: { $lte: academicYearEntity.getEndDate() } },
          { endDate: { $gte: academicYearEntity.getStartDate() } },
        ],
      },
    );
    console.log(isValidLimit, 'in mongo');
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

  return {
    isAcademicYearValidLimit,
    setNewAcademicYear,
  };
}
