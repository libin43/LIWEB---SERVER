export default function facultyRepository(repository) {
  const signup = (faculty) => repository.signup(faculty);
  const getFacultyName = () => repository.getFacultyName();

  return {
    signup,
    getFacultyName,
  };
}
