export default async function getAcademicYearInFaculty(
  facultyID,
  dbRepositoryFaculty,
  dbRepositoryAcademicYear,
) {
  const faculty = await dbRepositoryFaculty.getFacultyByID(facultyID);
  if (!faculty) {
    throw new Error('Invalid Credentials');
  }
  const { schoolID } = faculty;
  const academicYearDbFormat = await dbRepositoryAcademicYear.getAllAcademicYear(schoolID);
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  const academicYear = academicYearDbFormat.map((obj) => ({
    id: obj._id,
    startDate: formatDate(obj.startDate),
    endDate: formatDate(obj.endDate),
  }));
  return academicYear;
}
