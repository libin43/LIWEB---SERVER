import FacultyModel from '../models/faculty.js';

export default function facultyRepositoryMongoDB() {
  const signup = (facultyEntity) => {
    const newFaculty = new FacultyModel({
      facultyName: facultyEntity.getFacultyName(),
      email: facultyEntity.getFacultyEmail(),
      phone: facultyEntity.getFacultyPhoneNumber(),
      dateOfBirth: facultyEntity.getDateOfBirth(),
      dateOfJoin: facultyEntity.getDateOfJoin(),
      password: facultyEntity.getPassword(),
      createdAt: facultyEntity.getCreatedAt(),
      updatedAt: facultyEntity.getUpdatedAt(),

    });
    return newFaculty.save();
  };
  return {
    signup,
  };
}
