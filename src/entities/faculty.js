export default function faculty(
  facultyName,
  email,
  phone,
  dateOfBirth,
  dateOfJoin,
  password,
  createdAt,
  updatedAt,
) {
  return {
    getFacultyName: () => facultyName,
    getFacultyEmail: () => email,
    getFacultyPhoneNumber: () => phone,
    getDateOfBirth: () => dateOfBirth,
    getDateOfJoin: () => dateOfJoin,
    getPassword: () => password,
    getCreatedAt: () => createdAt,
    getUpdatedAt: () => updatedAt,
  };
}
