import faculty from '../../../src/entities/faculty.js';

export default async function addFaculty(
  facultyName,
  email,
  phone,
  dateOfBirth,
  academicYearID,
  schoolID,
  dbRepositoryFaculty,
  authService,
) {
  const hashPassword = await authService.encryptPassword(dateOfBirth);
  const [day, month, year] = dateOfBirth.split('/');
  const dob = new Date(Date.UTC(year, month - 1, day));
  console.log(dob);

  const newFaculty = faculty(
    facultyName,
    email,
    phone,
    dob,
    academicYearID,
    hashPassword,
    schoolID,
  );
  return dbRepositoryFaculty.signup(newFaculty);
}
