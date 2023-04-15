export default function facultyRepository(repository) {
  const signup = (faculty) => repository.signup(faculty);

  return {
    signup,
  };
}
