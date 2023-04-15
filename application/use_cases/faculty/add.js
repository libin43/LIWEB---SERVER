import faculty from '../../../src/entities/faculty.js';

export default async function addFaculty(
  facultyName,
  email,
  phone,
  dateOfBirth,
  dateOfJoin,
  dbRepositoryFaculty,
  authService,
) {
  console.log(dateOfBirth, dateOfJoin);
  const hashPassword = await authService.encryptPassword(dateOfBirth);
  const dobParts = dateOfBirth.split('/');
  const dojParts = dateOfBirth.split('/');
  const dateOfBirthObject = new Date(dobParts[2], dobParts[1], dobParts[0]);
  const dateOfJoinObject = new Date(dojParts[2], dojParts[1], dojParts[0]);

  const newFaculty = faculty(
    facultyName,
    email,
    phone,
    dateOfBirthObject,
    dateOfJoinObject,
    hashPassword,
  );
  return dbRepositoryFaculty.signup(newFaculty);
}
