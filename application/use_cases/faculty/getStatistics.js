export default async function getStatistics(
  academicYearID,
  facultyID,
  dbRepositoryFaculty,
) {
  console.log(academicYearID, facultyID);
  const subjectsByYearID = await dbRepositoryFaculty.getAllSubjectsByAcademicYearID(
    facultyID,
    academicYearID,
  );
  console.log(subjectsByYearID, 'total subjects in an year of faculty');
  const classesToTeachByYearID = await dbRepositoryFaculty.getAllClassesToTeachByAcademicYearID(
    facultyID,
    academicYearID,
  );
  console.log(classesToTeachByYearID, 'total classes to teach');
  const {
    classIncharges,
    classSizes,
  } = await dbRepositoryFaculty.getAllClassInchargesByAcademicYearID(
    facultyID,
    academicYearID,
  );
  console.log(classIncharges, classSizes, 'total class incharges');
  return {
    classesToTeachByYearID,
    subjectsByYearID,
    classIncharges,
    classSizes,
  };
}
