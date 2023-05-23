export default async function getStudentOverallExamResult(
  classID,
  facultyID,
  dbRepositoryClass,
) {
  console.log(classID, facultyID);
  const allStudentsExamResult = await dbRepositoryClass.getStudentsOverallExamResultByClassId(
    classID,
    facultyID,
  );
  console.log(allStudentsExamResult, 'all students exam');
  return allStudentsExamResult;
}
