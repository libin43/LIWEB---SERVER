export default async function getClassesBySubjectId(
  subjectID,
  dbRepositoryClass,
) {
  console.log(subjectID);
  const classes = await dbRepositoryClass.getClassesBySubjectId(subjectID);
  console.log(classes, 'its classes');
  return classes;
}
