export default async function getAllStatistics(
  schoolID,
  dbRepositoryStudent,
  dbRepositoryFaculty,
  dbRepositoryClass,

) {
  console.log('calleld in use caee');
  const studentStats = await dbRepositoryStudent.getStudentStats(schoolID);
  const facultyStats = await dbRepositoryFaculty.getFacultyStats(schoolID);
  const classStats = await dbRepositoryClass.getClassStats(schoolID);
  const totalStats = {
    totalStudent: studentStats,
    totalFaculty: facultyStats,
    totalClass: classStats,
  };
  console.log(totalStats);
  return totalStats;
}
