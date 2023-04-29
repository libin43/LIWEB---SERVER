import classRoom from '../../../src/entities/class.js';

export default async function addClass(
  className,
  academicYearID,
  facultyID,
  schoolID,
  dbRepositoryClass,
) {
  const newClass = classRoom(
    className,
    academicYearID,
    schoolID,
    facultyID,
  );
  const classExist = await dbRepositoryClass.classExist(newClass);
  if (classExist) {
    throw new Error('Class Already Exist');
  }
  return dbRepositoryClass.setNewClassRoom(newClass);
}
