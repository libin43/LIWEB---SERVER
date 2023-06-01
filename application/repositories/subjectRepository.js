export default function subjectRepository(repository) {
  const subjectExist = (subjectEntity) => repository.subjectExist(subjectEntity);
  const setNewSubject = (subjectEntity) => repository.setNewSubject(subjectEntity);
  const getSubjectByAcademicYearIdSchoolId = (
    subjectEntity,
  ) => repository.getSubjectByAcademicYearIdSchoolId(subjectEntity);
  const getSubjectsById = (
    subjectID,
    skip,
    limit,
  ) => repository.getSubjectsById(subjectID, skip, limit);
  const getSubjectsByName = (
    subjectID,
    skip,
    limit,
    key,
  ) => repository.getStudentsByName(subjectID, skip, limit, key);
  const getSubjectsByFacultyId = (
    facultyID,
    academicYearID,
  ) => repository.getSubjectsByFacultyId(facultyID, academicYearID);
  const getExamsOfFacultySubjects = (
    facultyID,
    academicYearID,
  ) => repository.getExamsOfFacultySubjects(facultyID, academicYearID);
  const getSubjectDetail = (subjectID) => repository.getSubjectDetail(subjectID);
  return {
    subjectExist,
    setNewSubject,
    getSubjectByAcademicYearIdSchoolId,
    getSubjectsById,
    getSubjectsByName,
    getSubjectsByFacultyId,
    getExamsOfFacultySubjects,
    getSubjectDetail,
  };
}
