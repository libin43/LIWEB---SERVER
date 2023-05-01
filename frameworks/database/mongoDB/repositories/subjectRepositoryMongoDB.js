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
      subjectClasses: subjectEntity.getSubjectClasses(),
      academicYearID: subjectEntity.getAcademicYearID(),
      facultyID: subjectEntity.getFacultyID(),
      schoolID: subjectEntity.getSchoolID(),
    });
    return newSubject.save();
  };
  return {
    subjectExist,
    setNewSubject,
  };
}
