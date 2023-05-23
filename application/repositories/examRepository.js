export default function examRepository(repository) {
  const examExist = (examEntity) => repository.examExist(examEntity);
  const setNewExam = (examEntity) => repository.setNewExam(examEntity);
  const getExamByExamId = (examID) => repository.getExamByExamId(examID);

  return {
    examExist,
    setNewExam,
    getExamByExamId,
  };
}
