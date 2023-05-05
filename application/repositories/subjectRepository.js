export default function subjectRepository(repository) {
  const subjectExist = (subjectEntity) => repository.subjectExist(subjectEntity);
  const setNewSubject = (subjectEntity) => repository.setNewSubject(subjectEntity);
  const getSubjectByAcademicYearIdSchoolId = (
    subjectEntity,
  ) => repository.getSubjectByAcademicYearIdSchoolId(subjectEntity);
  return {
    subjectExist,
    setNewSubject,
    getSubjectByAcademicYearIdSchoolId,
  };
}
