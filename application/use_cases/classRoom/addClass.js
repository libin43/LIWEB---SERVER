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
    facultyID,
    schoolID,
  );
  const classExist = await dbRepositoryClass.classExist(newClass);
  console.log(classExist, 'class exisr');
  if (classExist) {
    throw new Error('Class Already Exist');
  }
  return dbRepositoryClass.setNewClassRoom(newClass);
}
