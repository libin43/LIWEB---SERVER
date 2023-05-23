export default async function getExam(
  examID,
  dbRepositoryExam,
) {
  const exam = await dbRepositoryExam.getExamByExamId(examID);
  if (!exam) {
    throw new Error('Invalid Credentials');
  }
  console.log(exam);
  return exam;
}
