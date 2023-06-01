import mongoose from 'mongoose';
import ExamResultModel from '../models/examResult.js';

export default function examResultsRepositoryMongoDB() {
  const examResultExist = async (classID, subjectID, examID) => {
    const examResult = await ExamResultModel.findOne({
      $and: [
        { classID },
        { subjectID },
        { examID },
      ],
    });
    return examResult;
  };

  const setNewExamResult = async (examResultEnity) => {
    console.log(examResultEnity.getResultSheet());
    const newExamResult = new ExamResultModel({
      classID: examResultEnity.getClassID(),
      subjectID: examResultEnity.getSubjectID(),
      examID: examResultEnity.getExamID(),
      totalMark: examResultEnity.getTotalMark(),
      resultSheet: examResultEnity.getResultSheet(),
    });
    return newExamResult.save();
  };

  const getExamResultEnteredClasses = async (examID) => {
    const classes = await ExamResultModel.aggregate([{ $match: { examID: new mongoose.Types.ObjectId(examID) } }, { $project: { classID: 1 } }, { $unwind: '$classID' }, {
      $lookup: {
        from: 'classes', foreignField: '_id', localField: 'classID', as: 'Classes',
      },
    }, { $unwind: '$Classes' }, { $project: { className: '$Classes.className' } }]);
    return classes;
  };

  const getTotalSubjectMark = async (classID, examID) => {
    const totalMark = await ExamResultModel.findOne({
      $and: [
        { classID },
        { examID },
      ],
    }).select('totalMark');
    return totalMark;
  };

  const getSubjectExamMarks = async (classID, examID) => {
    const results = await ExamResultModel.aggregate([{ $match: { $and: [{ classID: new mongoose.Types.ObjectId(classID) }, { examID: new mongoose.Types.ObjectId(examID) }] } }, { $project: { resultSheet: 1, classID: 1 } }, { $unwind: '$resultSheet' }, { $project: { studentId: '$resultSheet.studentID', examMarkObtained: '$resultSheet.examMarkObtained', _id: 0 } }, {
      $lookup: {
        from: 'students', foreignField: '_id', localField: 'studentId', as: 'Students',
      },
    }, { $unwind: '$Students' }, {
      $project: {
        studentID: '$studentId', examMarkObtained: 1, studentName: '$Students.studentName', active: '$Students.status',
      },
    }, { $sort: { studentName: 1 } },
    ]);
    return results;
  };

  return {
    examResultExist,
    setNewExamResult,
    getExamResultEnteredClasses,
    getTotalSubjectMark,
    getSubjectExamMarks,
  };
}
