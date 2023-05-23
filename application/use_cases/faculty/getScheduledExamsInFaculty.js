export default async function getScheduledExamsInFaculty(
  facultyID,
  academicYearID,
  dbRepositorySubject,
) {
  const subjectsOfFaculty = await dbRepositorySubject.getSubjectsByFacultyId(
    facultyID,
    academicYearID,
  );
  console.log(subjectsOfFaculty, 'syb of ');
  if (subjectsOfFaculty.length === 0) {
    const subject = null;
    return subject;
  }

  const subjectExamDetails = await dbRepositorySubject.getExamsOfFacultySubjects(
    facultyID,
    academicYearID,
  );
  console.log(subjectExamDetails, 'subject with exams');

  return subjectExamDetails;
}
