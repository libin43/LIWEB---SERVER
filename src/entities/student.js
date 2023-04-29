export default function student(
  studentName,
  parentName,
  email,
  phone,
  address,
  dateOfBirth,
  dateOfJoin,
  password,
  schoolID,
) {
  return {
    getStudentName: () => studentName,
    getParentName: () => parentName,
    getEmail: () => email,
    getPhone: () => phone,
    getAddress: () => address,
    getDateOfBirth: () => dateOfBirth,
    getDateOfJoin: () => dateOfJoin,
    getPassword: () => password,
    getSchoolID: () => schoolID,
  };
}
