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
      schoolID: facultyEntity.getSchoolId(),

    });
    return newFaculty.save();
  };

  const getFacultyName = async (schoolID) => {
    console.log(schoolID, 'school id');
    const faculty = await FacultyModel.find({ schoolID }).select('facultyName');
    console.log(faculty, 'its faculty name');
    return faculty;
  };
  return {
    signup,
    getFacultyName,
  };
}
