export default function faculty(
  facultyName,
  email,
  phone,
  dateOfBirth,
  dateOfJoin,
  password,
  schoolID,
) {
  return {
    getFacultyName: () => facultyName,
    getFacultyEmail: () => email,
    getFacultyPhoneNumber: () => phone,
    getDateOfBirth: () => dateOfBirth,
    getDateOfJoin: () => dateOfJoin,
    getPassword: () => password,
    getSchoolId: () => schoolID,
  };
}
