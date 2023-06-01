export default async function getSubjectExamMarks(
  classID,
  subjectID,
  examID,
  dbRepositoryClass,
  dbRepositorySubject,
  dbRepositoryExam,
  dbRepositoryExamResult,
) {
  const classData = await dbRepositoryClass.getClassDetail(classID);
  if (!classData) {
    throw new Error('Invalid Credentials');
  }
  const subjectData = await dbRepositorySubject.getSubjectDetail(subjectID);
  if (!subjectData) {
    throw new Error('Invalid Credentials');
  }
  const examData = await dbRepositoryExam.getExamByExamId(examID);
  if (!examData) {
    throw new Error('Invalid Credentials');
  }
  const totalSubjectMark = await dbRepositoryExamResult.getTotalSubjectMark(classID, examID);
  const subjectResultSheet = await dbRepositoryExamResult.getSubjectExamMarks(classID, examID);
  if (!subjectResultSheet) {
    throw new Error('Result Not Found');
  }
  return {
    classData,
    subjectData,
    examData,
    totalSubjectMark,
    subjectResultSheet,
  };
}
