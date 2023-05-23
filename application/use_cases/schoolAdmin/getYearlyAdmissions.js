export default async function getYearlyAdmissions(
  skip,
  schoolID,
  dbRepositorySchoolAdmin,
) {
  const admissions = await dbRepositorySchoolAdmin.getYearlyAdmissions(
    schoolID,
    parseInt(skip, 10),
  );
  console.log(admissions, 'admission');
  return admissions;
}
