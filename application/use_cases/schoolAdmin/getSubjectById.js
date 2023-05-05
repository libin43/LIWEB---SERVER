import subject from '../../../src/entities/subject.js';

export default async function getSubjectById(
  academicYearID,
  schoolID,
  dbRepositorySubject,
) {
  const subjectEntity = subject(
    academicYearID,
    schoolID,
  );
  const subjectData = await dbRepositorySubject.getSubjectByAcademicYearIdSchoolId(
    subjectEntity,
  );
  console.log(subjectData, 'this is subject data');
  if (!subjectData) {
    throw new Error('Invalid Credentials');
  }
  return subjectData;
}
