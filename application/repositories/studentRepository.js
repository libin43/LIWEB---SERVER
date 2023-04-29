export default function studentRepository(repository) {
  const signup = (student) => repository.signup(student);
  const studentExist = (student) => repository.studentExist(student);
  return {
    signup,
    studentExist,
  };
}
