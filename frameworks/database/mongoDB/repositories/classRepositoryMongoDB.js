import mongoose from 'mongoose';
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
        $push: { studentSheet: { studentID, isMoved: false } },
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

  const insertSubjectToMultipleClasses = async (subjectID, classID, academicYearID) => {
    const classRoom = await ClassModel.updateMany(
      {
        $and: [
          { _id: classID },
          { academicYearID },
        ],
      },
      {
        $push: { subjectSheet: subjectID },
      },
      { new: true },
    );
    return classRoom;
  };

  const getStudentsIdByClassId = async (classID) => {
    const studentsID = await ClassModel.find({ _id: classID }).select('studentSheet');
    return studentsID;
  };

  const getSubjectsIdByClassId = async (classID) => {
    const subjectsID = await ClassModel.find({ _id: classID }).select('subjectSheet');
    return subjectsID;
  };

  const getClassesBySubjectId = async (subjectID) => {
    console.log(subjectID, 'got in repo mongo');
    const classes = await ClassModel.find({ subjectSheet: { $in: [subjectID] } }).select('className');
    return classes;
  };

  const getStudentsByClassId = async (classID) => {
    const studentsData = await ClassModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(classID) } },
      {
        $lookup: {
          from: 'students', localField: 'studentSheet.studentID', foreignField: '_id', as: 'Students',
        },
      },
      { $project: { className: 1, status: 1, studentSheet: { $map: { input: '$Students', as: 'student', in: { _id: '$$student._id', studentName: '$$student.studentName' } } } } },
    ]);
    console.log(studentsData, 'stuedent in mongo repo');
    console.log(studentsData[0].studentSheet);
    const className = !studentsData[0].className ? null : studentsData[0].className;
    const students = studentsData[0].studentSheet.length !== 0
      ? studentsData[0].studentSheet : null;
    return { classID, className, students };
  };

  const getInChargeClassesByFacultyId = async (facultyID, academicYearID) => {
    const classes = await ClassModel.find({
      $and: [
        { facultyID },
        { academicYearID },
      ],
    }).select('className status');
    return classes;
  };

  const getStudentsOverallExamResultByClassId = async (classID, facultyID) => {
    console.log(facultyID, classID, 'called in getStudents');
    const results = await ClassModel.aggregate([{ $match: { $and: [{ _id: new mongoose.Types.ObjectId(classID) }, { facultyID: new mongoose.Types.ObjectId(facultyID) }] } }, { $project: { classID: '$_id' } }, {
      $lookup: {
        from: 'exam results', foreignField: 'classID', localField: '_id', as: 'classID',
      },
    }, { $unwind: '$classID' }, { $group: { _id: '$classID.subjectID', totalMarks: { $sum: '$classID.totalMark' }, resultSheet: { $push: '$classID.resultSheet' } } }, {
      $project: {
        subjectID: '$_id', totalMarks: 1, resultSheet: 1, _id: 0,
      },
    }, { $unwind: '$resultSheet' }, { $unwind: '$resultSheet' }, { $group: { _id: { studentID: '$resultSheet.studentID', subjectID: '$subjectID' }, totalMarkObtained: { $sum: '$resultSheet.examMarkObtained' }, totalMarks: { $first: '$totalMarks' } } }, {
      $project: {
        _id: 0, studentID: '$_id.studentID', subjectID: '$_id.subjectID', totalMarkObtained: 1, totalMarks: 1,
      },
    }, { $group: { _id: '$studentID', totalExamMark: { $sum: '$totalMarks' }, totalExamObtainedMark: { $sum: '$totalMarkObtained' } } }, { $addFields: { percentage: { $multiply: [{ $divide: ['$totalExamObtainedMark', '$totalExamMark'] }, 100] } } }, {
      $lookup: {
        from: 'students', foreignField: '_id', localField: '_id', as: 'StudentData',
      },
    }, {
      $project: {
        studentID: '$_id', totalExamMark: 1, totalExamObtainedMark: 1, percentage: 1, _id: 0, studentName: { $arrayElemAt: ['$StudentData.studentName', 0] },
      },
    }]);
    return results;
  };

  const updateCurrentClassStatus = async (_id) => {
    const update = await ClassModel.findByIdAndUpdate(_id, { status: 'inactive' });
    return update;
  };

  const insertMultipleStudentsToClass = async (students, classID) => {
    console.log(students, 'jfdkjflsd');
    const ObjectIdStudents = students.map((id) => ({
      studentID: id,
      isMoved: false,
    }));
    const insert = await ClassModel.updateOne(
      { _id: classID },
      { $push: { studentSheet: { $each: ObjectIdStudents } } },
    );
    return insert;
  };

  const getClassStats = async (schoolID) => {
    const totalClass = await ClassModel.find({
      $and: [
        { schoolID },
        { status: 'active' },
      ],
    })
      .select('className').count();
    return totalClass;
  };

  const getClassDetail = async (classID) => {
    const classData = await ClassModel.findOne({
      _id: classID,
    }).select('className status');
    return classData;
  };

  const updateClassStudentStatus = async (students, classID) => {
    console.log(students, 'in mongo');
    const ObjectIdStudents = students.map((id) => new mongoose.Types.ObjectId(id));

    const status = await ClassModel.updateOne(
      { _id: classID },
      { $set: { 'studentSheet.$[student].isMoved': false } },
      {
        arrayFilters: [
          { 'student.studentID': { $in: ObjectIdStudents } },
        ],
      },
    );
    return status;
  };

  return {
    classExist,
    setNewClassRoom,
    getClassByAcademicYearIdSchoolId,
    insertStudentToClass,
    multipleClassExist,
    insertSubjectToMultipleClasses,
    getStudentsIdByClassId,
    getSubjectsIdByClassId,
    getClassesBySubjectId,
    getStudentsByClassId,
    getInChargeClassesByFacultyId,
    getStudentsOverallExamResultByClassId,
    updateCurrentClassStatus,
    insertMultipleStudentsToClass,
    getClassStats,
    getClassDetail,
    updateClassStudentStatus,
  };
}
