export default async function getAllSubjectsById(
  limit,
  page,
  classID,
  dbRepositoryClass,
  dbRepositorySubject,
  searchKey = null,
) {
  console.log(classID);
  console.log(searchKey, 'its serch key');
  console.log(limit, page);
  const skip = limit * (page - 1);
  console.log(skip, 'its skip');
  const [{ subjectSheet }] = await dbRepositoryClass.getSubjectsIdByClassId(classID);
  const totalSubjects = subjectSheet.length;
  if (totalSubjects.length === 0) {
    return { subjects: null, totalSubjects: 0 };
  }
  console.log(subjectSheet, totalSubjects);
  if (searchKey != null) {
    const searchLimit = parseInt(limit, 10);
    const filteredSubjectName = await dbRepositorySubject.getSubjectByName(
      subjectSheet,
      skip,
      searchLimit,
      searchKey,
    );
    console.log(filteredSubjectName, 'fileterd name');
    return { subjects: filteredSubjectName.subjects, totalSubjects: filteredSubjectName.count };
  }

  const subjects = await dbRepositorySubject.getSubjectsById(subjectSheet, skip, limit);
  console.log(subjects, '...........');
  return { subjects, totalSubjects };
}
