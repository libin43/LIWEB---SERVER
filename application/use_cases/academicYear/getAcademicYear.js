export default async function getAcademicYear(
  schoolID,
  dbRepositoryAcademicYear,
) {
  const academicYearDbFormat = await dbRepositoryAcademicYear.getAcademicYear(schoolID);

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

  console.log(academicYear, 'its academic year');
  return academicYear;
}
