export default function classRespository(repository) {
  const classExist = (classRoom) => repository.classExist(classRoom);
  const setNewClassRoom = (classRoom) => repository.setNewClassRoom(classRoom);
  const getClassByAcademicYearIdSchoolId = (
    academicYearID,
    schoolID,
  ) => repository.getClassByAcademicYearIdSchoolId(academicYearID, schoolID);
  const insertStudentToClass = (
    studentID,
    classID,
    academicYearID,
  ) => repository.insertStudentToClass(studentID, classID, academicYearID);

  const multipleClassExist = (classRooms) => repository.multipleClassExist(classRooms);

  const insertSubjectToMultipleClasses = (
    subjectID,
    classID,
    academicYearID,
  ) => repository.insertSubjectToMultipleClasses(subjectID, classID, academicYearID);

  const getStudentsIdByClassId = (classID) => repository.getStudentsIdByClassId(classID);

  const getSubjectsIdByClassId = (classID) => repository.getSubjectsIdByClassId(classID);

  const getClassesBySubjectId = (subjectID) => repository.getClassesBySubjectId(subjectID);

  const getStudentsByClassId = (classID) => repository.getStudentsByClassId(classID);

  const getInChargeClassesByFacultyId = (
    facultyID,
    academicYearID,
  ) => repository.getInChargeClassesByFacultyId(facultyID, academicYearID);

  const getStudentsOverallExamResultByClassId = (
    facultyID,
    classID,
  ) => repository.getStudentsOverallExamResultByClassId(facultyID, classID);

  const updateCurrentClassStatus = (classID) => repository.updateCurrentClassStatus(classID);

  const insertMultipleStudentsToClass = (
    students,
    classID,
  ) => repository.insertMultipleStudentsToClass(
    students,
    classID,
  );

  const getClassStats = (schoolID) => repository.getClassStats(schoolID);

  const getClassDetail = (classID) => repository.getClassDetail(classID);

  const updateClassStudentStatus = (
    students,
    classID,
  ) => repository.updateClassStudentStatus(students, classID);

  return {
    classExist,
    setNewClassRoom,
    getClassByAcademicYearIdSchoolId,
    insertStudentToClass,
    multipleClassExist,
    insertSubjectToMultipleClasses,
    getStudentsIdByClassId,
    getSubjectsIdByClassId,
    getClassesBySubjectId,
    getStudentsByClassId,
    getInChargeClassesByFacultyId,
    getStudentsOverallExamResultByClassId,
    updateCurrentClassStatus,
    insertMultipleStudentsToClass,
    getClassStats,
    getClassDetail,
    updateClassStudentStatus,
  };
}
