export default function examResultRepository(repository) {
  const examResultExist = (classID, subjectID, examID) => repository.examResultExist(
    classID,
    subjectID,
    examID,
  );
  const setNewExamResult = (examResultEntity) => repository.setNewExamResult(examResultEntity);
  return {
    examResultExist,
    setNewExamResult,
  };
}
