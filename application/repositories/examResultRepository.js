export default function examResultRepository(repository) {
  const examResultExist = (classID, subjectID, examID) => repository.examResultExist(
    classID,
    subjectID,
    examID,
  );
  const setNewExamResult = (examResultEntity) => repository.setNewExamResult(examResultEntity);
  const getExamResultEnteredClasses = (examID) => repository.getExamResultEnteredClasses(examID);
  const getSubjectExamMarks = (classID, examID) => repository.getSubjectExamMarks(classID, examID);
  const getTotalSubjectMark = (classID, examID) => repository.getTotalSubjectMark(classID, examID);
  return {
    examResultExist,
    setNewExamResult,
    getExamResultEnteredClasses,
    getTotalSubjectMark,
    getSubjectExamMarks,
  };
}
