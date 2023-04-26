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
  return {
    classExist,
    setNewClassRoom,
  };
}
