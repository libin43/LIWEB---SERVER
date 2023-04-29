import addStudentToClass from '../../application/use_cases/schoolAdmin/addStudentToClass.js';
import addStudent from '../../application/use_cases/student/signup.js';

export default function studentController(
  studentRepository,
  studentImpl,
  classRepository,
  classImpl,
  authServiceInterface,
  authServiceImpl,
) {
  const dbRepositoryStudent = studentRepository(studentImpl());
  const dbRepositoryClass = classRepository(classImpl());
  const authService = authServiceInterface(authServiceImpl());

  const addNewStudent = async (req, res, next) => {
    try {
      const {
        studentName,
        parentName,
        email,
        phone,
        address,
        dateOfBirth,
        dateOfJoin,
        academicYearID,
        className,
      } = req.body;
      const schoolId = req.schoolAdmin;
      addStudent(
        studentName,
        parentName,
        email,
        phone,
        address,
        dateOfBirth,
        dateOfJoin,
        academicYearID,
        className,
        schoolId,
        dbRepositoryStudent,
        dbRepositoryClass,
        authService,
      )
        .then((
          student,
        ) => addStudentToClass(
          student.studentAdded._id,
          student.classID,
          academicYearID,
          dbRepositoryClass,
        ))
        .then((
          classRoom,
        ) => res.status(200).json({ success: true, message: `${studentName} added to classroom ${classRoom.className}` }))
        .catch((err) => next(err));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addNewStudent,
  };
}
