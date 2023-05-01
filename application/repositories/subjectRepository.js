export default function subjectRepository(repository) {
  const subjectExist = (subjectEntity) => repository.subjectExist(subjectEntity);
  const setNewSubject = (subjectEntity) => repository.setNewSubject(subjectEntity);
  return {
    subjectExist,
    setNewSubject,
  };
}
