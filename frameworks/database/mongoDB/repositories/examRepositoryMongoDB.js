import ExamModel from '../models/exam.js';

export default function examRepositoryMongoDB() {
  const examExist = async (examEntity) => {
    const exam = await ExamModel.findOne(
      {
        $and: [
          { examName: { $eq: examEntity.getExamName() } },
          { subjectID: { $eq: examEntity.getSubjectID() } },
          { schoolID: { $eq: examEntity.getSchoolID() } },
          { academicYearID: { $eq: examEntity.getAcademicYearID() } },
        ],
      },
    );
    return exam;
  };
  const setNewExam = (examEntity) => {
    const newExam = new ExamModel({
      examName: examEntity.getExamName(),
      examDate: examEntity.getExamDate(),
      subjectID: examEntity.getSubjectID(),
      academicYearID: examEntity.getAcademicYearID(),
      schoolID: examEntity.getSchoolID(),
    });
    return newExam.save();
  };

  return {
    examExist,
    setNewExam,
  };
}
