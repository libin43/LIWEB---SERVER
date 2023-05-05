import SubjectModel from '../models/subject.js';

export default function subjectRepositoryMongoDB() {
  const subjectExist = async (subjectEntity) => {
    const subject = await SubjectModel.findOne(
      {
        $and: [
          { schoolID: { $eq: subjectEntity.getSchoolID() } },
          { academicYearID: { $eq: subjectEntity.getAcademicYearID() } },
          { subjectCode: { $eq: subjectEntity.getSubjectCode() } },
        ],
      },
    );
    return subject;
  };

  const setNewSubject = (subjectEntity) => {
    const newSubject = new SubjectModel({
      subjectName: subjectEntity.getSubjectName(),
      subjectCode: subjectEntity.getSubjectCode(),
      academicYearID: subjectEntity.getAcademicYearID(),
      facultyID: subjectEntity.getFacultyID(),
      schoolID: subjectEntity.getSchoolID(),
    });
    return newSubject.save();
  };

  const getSubjectByAcademicYearIdSchoolId = async (subjectEntity) => {
    const subject = await SubjectModel.find(
      {
        $and: [
          { academicYearID: subjectEntity.getAcademicYearID() },
          { schoolID: subjectEntity.getSchoolID() },
        ],
      },
    )
      .select('subjectName subjectCode');
    return subject;
  };
  return {
    subjectExist,
    setNewSubject,
    getSubjectByAcademicYearIdSchoolId,
  };
}
