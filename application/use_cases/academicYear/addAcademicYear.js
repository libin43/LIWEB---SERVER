import academicYear from '../../../src/entities/academicYear.js';

export default async function addAcademicYear(
  startDate,
  endDate,
  schoolId,
  dbRepositoryAcademicYear,
) {
  const newAcademicYear = academicYear(
    startDate,
    endDate,
    schoolId,
  );
  const dateExistWithin = await dbRepositoryAcademicYear.isAcademicYearValidLimit(newAcademicYear);
  if (dateExistWithin != null) {
    throw new Error('Date Range Already Exist');
  }
  console.log(dateExistWithin, 'validlimit');
  return dbRepositoryAcademicYear.setNewAcademicYear(newAcademicYear);
}
