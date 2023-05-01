import ClassModel from '../models/class.js';

export default function classRepositoryMongoDB() {
  const classExist = async (classEntity) => {
    const classRoom = await ClassModel.findOne(
      {
        $and: [
          { className: { $eq: classEntity.getClassName() } },
          { schoolID: { $eq: classEntity.getSchoolID() } },
          { academicYearID: { $eq: classEntity.getAcademicYearID() } },
        ],
      },
    );
    return classRoom;
  };
  const setNewClassRoom = (classEntity) => {
    const newClass = new ClassModel({
      className: classEntity.getClassName(),
      academicYearID: classEntity.getAcademicYearID(),
      facultyID: classEntity.getFacultyID(),
      schoolID: classEntity.getSchoolID(),
    });
    return newClass.save();
  };

  const getClassByAcademicYearIdSchoolId = async (academicYearID, schoolID) => {
    const classRoom = await ClassModel.find(
      {
        $and: [
          { academicYearID },
          { schoolID },
        ],
      },
    )
      .select('className');
    return classRoom;
  };

  const insertStudentToClass = async (studentID, classID, academicYearID) => {
    const classRoom = await ClassModel.findOneAndUpdate(
      {
        $and: [
          { _id: classID },
          { academicYearID },
        ],
      },
      {
        $push: { studentSheet: studentID },
      },
      { new: true },
    )
      .select('className');
    return classRoom;
  };

  const multipleClassExist = async (classEntity) => {
    const classRooms = await ClassModel.find(
      {
        $and: [
          { className: { $in: classEntity.getClassName() } },
          { schoolID: { $eq: classEntity.getSchoolID() } },
          { academicYearID: { $eq: classEntity.getAcademicYearID() } },
        ],
      },
    );
    return classRooms;
  };
  return {
    classExist,
    setNewClassRoom,
    getClassByAcademicYearIdSchoolId,
    insertStudentToClass,
    multipleClassExist,
  };
}
