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

  return {
    classExist,
    setNewClassRoom,
    getClassByAcademicYearIdSchoolId,
    insertStudentToClass,
    multipleClassExist,
    insertSubjectToMultipleClasses,
  };
}
