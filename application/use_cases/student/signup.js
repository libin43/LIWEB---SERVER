import classRoom from '../../../src/entities/class.js';
import student from '../../../src/entities/student.js';

export default async function addStudent(
  studentName,
  parentName,
  email,
  phone,
  address,
  dateOfBirth,
  dateOfJoin,
  academicYearID,
  className,
  schoolID,
  dbRepositoryStudent,
  dbRepositoryClass,
  authService,
) {
  const newClass = classRoom(
    className,
    academicYearID,
    schoolID,
  );
  const classExist = await dbRepositoryClass.classExist(newClass);
  if (!classExist) {
    throw new Error('No classroom found');
  }
  const classID = classExist._id;
  const hashPassword = await authService.encryptPassword(dateOfBirth);
  const dobParts = dateOfBirth.split('/');
  const dojParts = dateOfJoin.split('/');
  const dateOfBirthObject = new Date(dobParts[2], dobParts[1], dobParts[0]);
  const dateOfJoinObject = new Date(dojParts[2], dojParts[1], dojParts[0]);

  const newStudent = student(
    studentName,
    parentName,
    email,
    phone,
    address,
    dateOfBirthObject,
    dateOfJoinObject,
    hashPassword,
    schoolID,
  );
  const isStudentActive = await dbRepositoryStudent.studentExist(newStudent);
  if (isStudentActive?.status === 'activeStudent') {
    throw new Error('Student already active');
  }
  const studentAdded = await dbRepositoryStudent.signup(newStudent);
  const studentAddedWithClass = { classID, studentAdded };
  return studentAddedWithClass;
}
