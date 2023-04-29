import StudentModel from '../models/student.js';

export default function studentRepositoryMongoDB() {
  const signup = (studentEntity) => {
    const newStudent = new StudentModel({
      studentName: studentEntity.getStudentName(),
      parentName: studentEntity.getParentName(),
      email: studentEntity.getEmail(),
      phone: studentEntity.getPhone(),
      address: studentEntity.getAddress(),
      //   studentImage: studentEntity.getStudentImage(),
      dateOfBirth: studentEntity.getDateOfBirth(),
      dateOfJoin: studentEntity.getDateOfJoin(),
      password: studentEntity.getPassword(),
      schoolID: studentEntity.getSchoolID(),
    });
    return newStudent.save();
  };

  const studentExist = async (studentEntity) => {
    const student = await StudentModel.findOne(
      {
        $or: [
          { email: { $eq: studentEntity.getEmail() } },
          { phone: { $eq: studentEntity.getPhone() } },
        ],
      },
    )
      .select('status');
    return student;
  };

  return {
    signup,
    studentExist,
  };
}
