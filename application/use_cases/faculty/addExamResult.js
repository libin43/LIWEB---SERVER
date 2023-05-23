import examResult from '../../../src/entities/examResult.js';

export default async function addExamResult(
  classID,
  subjectID,
  examID,
  totalMark,
  resultSheet,
  dbRepositoryExamResult,
) {
  const formattedResultSheet = resultSheet.map((result) => ({
    studentID: result._id,
    studentName: result.studentName,
    examMarkObtained: result.markObtained,
  }));
  console.log(formattedResultSheet, 'formatttttttttttttttttttttttttttttttt');
  const newExamResult = examResult(
    classID,
    subjectID,
    examID,
    totalMark,
    formattedResultSheet,
  );
  const resultExam = await dbRepositoryExamResult.examResultExist(classID, subjectID, examID);
  console.log(resultExam, 'result exam');
  if (resultExam) {
    throw new Error('Exam Result Already Exists');
  }
  return dbRepositoryExamResult.setNewExamResult(newExamResult);
}
