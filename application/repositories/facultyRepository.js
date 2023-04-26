export default function facultyRepository(repository) {
  const signup = (faculty) => repository.signup(faculty);
  const getFacultyName = (schoolID) => repository.getFacultyName(schoolID);

  return {
    signup,
    getFacultyName,
  };
}
