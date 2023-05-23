export default async function facultyAuth(
  email,
  password,
  dbRepositoryFaculty,
  authService,
) {
  const faculty = await dbRepositoryFaculty.getFacultyByEmail(email);
  console.log(faculty, 'schodfoisjdfj');
  if (!faculty) {
    throw new Error('Invalid Credentials');
  }
  const hashSuccess = await authService.comparePassword(password, faculty.password);
  if (!hashSuccess) {
    throw new Error('Incorrect Password');
  }
  const {
    _id, facultyName, role,
  } = faculty;
  const token = await authService.generateToken(
    { id: faculty._id, facultyName: faculty.facultyName, role },
  );
  return {
    token,
    role,
    facultyName,
    _id,
  };
}
