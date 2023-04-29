import faculty from '../../../src/entities/faculty.js';

export default async function addFaculty(
  facultyName,
  email,
  phone,
  dateOfBirth,
  dateOfJoin,
  schoolID,
  dbRepositoryFaculty,
  authService,
) {
  const hashPassword = await authService.encryptPassword(dateOfBirth);
  const dobParts = dateOfBirth.split('/');
  const dojParts = dateOfJoin.split('/');
  const dateOfBirthObject = new Date(dobParts[2], dobParts[1], dobParts[0]);
  const dateOfJoinObject = new Date(dojParts[2], dojParts[1], dojParts[0]);

  const newFaculty = faculty(
    facultyName,
    email,
    phone,
    dateOfBirthObject,
    dateOfJoinObject,
    hashPassword,
    schoolID,
  );
  return dbRepositoryFaculty.signup(newFaculty);
}
