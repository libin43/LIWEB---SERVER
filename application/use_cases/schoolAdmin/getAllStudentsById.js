export default async function getAllStudentsById(
  limit,
  page,
  classID,
  dbRepositoryClass,
  dbRepositoryStudent,
  searchKey = null,
) {
  console.log(classID);
  console.log(searchKey, 'its serch key');
  console.log(limit, page);
  const skip = limit * (page - 1);
  const [{ studentSheet }] = await dbRepositoryClass.getStudentsIdByClassId(classID);
  const classStrength = studentSheet.length;
  if (studentSheet.length === 0) {
    return { students: null, classStrength: 0 };
  }
  console.log(studentSheet, classStrength);
  const studentIds = studentSheet.map((student) => student.studentID);
  if (searchKey != null) {
    const searchLimit = parseInt(limit, 10);
    const filteredStudentName = await dbRepositoryStudent.getStudentsByName(
      studentIds,
      skip,
      searchLimit,
      searchKey,
    );
    console.log(filteredStudentName, 'fileterd name');
    return { students: filteredStudentName.students, classStrength: filteredStudentName.count };
  }

  const students = await dbRepositoryStudent.getStudentsById(studentIds, skip, limit);
  return { students, classStrength };
}
