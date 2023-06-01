export default async function getClassesBySubjectId(
  subjectID,
  examId,
  dbRepositoryClass,
  dbRepositoryExamResult,
) {
  console.log(subjectID);
  const classes = await dbRepositoryClass.getClassesBySubjectId(subjectID);
  console.log(classes, 'its classes');
  const isExamResultExistClasses = await dbRepositoryExamResult.getExamResultEnteredClasses(examId);
  console.log(isExamResultExistClasses, 'exam result published classes');

  if (isExamResultExistClasses.length !== 0) {
    const modifiedClasses = classes.map((classObj) => {
      const matchingClass = isExamResultExistClasses.find((
        examObj,
      ) => examObj.className === classObj.className);
      if (matchingClass) {
        return {
          _id: classObj._id,
          className: classObj.className,
          examMarkEntered: true,
        };
      }
      return classObj;
    });
    console.log(modifiedClasses, 'mod class');
    return modifiedClasses;
  }

  console.log(classes, 'its classes');
  return classes;
}
