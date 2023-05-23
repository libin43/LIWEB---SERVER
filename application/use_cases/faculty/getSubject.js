export default async function getSubject(
  subjectID,
  dbRepositorySubject,
) {
  const subject = await dbRepositorySubject.getSubjectsById(subjectID, 0, 1);
  if (!subject) {
    throw new Error('Invalid Credentials');
  }
  console.log(subject);
  return subject[0];
}
