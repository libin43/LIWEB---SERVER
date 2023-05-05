export default function examRepository(repository) {
  const examExist = (examEntity) => repository.examExist(examEntity);
  const setNewExam = (examEntity) => repository.setNewExam(examEntity);

  return {
    examExist,
    setNewExam,
  };
}
