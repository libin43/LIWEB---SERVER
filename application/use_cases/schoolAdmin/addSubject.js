import classRoom from '../../../src/entities/class.js';
import subject from '../../../src/entities/subject.js';

export default async function addSubject(
  selectedClass,
  subjectName,
  subjectCode,
  academicYearID,
  facultyID,
  schoolID,
  dbRepositorySubject,
  dbRepositoryClass,
) {
  const classSubject = classRoom(
    selectedClass,
    academicYearID,
    schoolID,
    facultyID,
  );
  const classExist = await dbRepositoryClass.multipleClassExist(classSubject);
  console.log(classExist, 'exist class');
  const foundClassNames = await classExist.map((cls) => cls.className);
  const notFoundClassNames = await selectedClass.filter((name) => !foundClassNames.includes(name));
  if (notFoundClassNames.length !== 0) {
    throw new Error(`Classes not found: ${notFoundClassNames.join(', ')}`);
  }
  const subjectClasses = classExist.map((cls) => cls._id);

  const newSubject = subject(
    subjectClasses,
    subjectName,
    subjectCode,
    academicYearID,
    facultyID,
    schoolID,
  );
  const subjectExist = await dbRepositorySubject.subjectExist(newSubject);
  if (subjectExist) {
    throw new Error('Subject Already Exist');
  }
  return dbRepositorySubject.setNewSubject(newSubject);
}
