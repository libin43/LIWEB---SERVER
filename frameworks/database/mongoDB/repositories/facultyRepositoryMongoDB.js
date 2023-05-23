import mongoose from 'mongoose';
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
    const faculty = await FacultyModel.find({ schoolID }).select('facultyName');
    console.log(faculty, 'its faculty name');
    return faculty;
  };

  const getFacultyByEmail = async (email) => {
    const faculty = await FacultyModel.findOne({ email });
    return faculty;
  };

  const getFacultyByID = async (facultyID) => {
    const faculty = await FacultyModel.findOne({ _id: facultyID }).select('facultyName schoolID role');
    return faculty;
  };

  const getFacultyStats = async (schoolID) => {
    const totalFaculty = await FacultyModel.find({
      $and: [
        { schoolID },
        { status: 'activeEmployee' },
      ],
    })
      .select('facultyName').count();
    return totalFaculty;
  };

  const getAllSubjectsByAcademicYearID = async (facultyID, academicYearID) => {
    const data = await FacultyModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(facultyID) } },
      {
        $lookup: {
          from: 'subjects', foreignField: 'facultyID', localField: '_id', as: 'Subjects',
        },
      }, { $project: { facultyName: 1, matchedSubjects: { $map: { input: '$Subjects', as: 'subject', in: { $cond: [{ $eq: ['$$subject.academicYearID', new mongoose.Types.ObjectId(academicYearID)] }, '$$subject', null] } } } } },
    ]);
    const matchedSubjects = data[0].matchedSubjects.filter((subject) => subject !== null);
    const size = matchedSubjects.length;
    return size;
  };

  const getAllClassesToTeachByAcademicYearID = async (facultyID, academicYearID) => {
    const data = await FacultyModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(facultyID) } },
      {
        $lookup: {
          from: 'subjects', foreignField: 'facultyID', localField: '_id', as: 'Subjects',
        },
      }, { $unwind: '$Subjects' }, { $match: { 'Subjects.academicYearID': new mongoose.Types.ObjectId(academicYearID) } }, {
        $project: {
          facultyName: 1, subjectID: '$Subjects._id', subjectCode: '$Subjects.subjectCode', academicYearID: '$Subjects.academicYearID',
        },
      }, {
        $lookup: {
          from: 'classes', foreignField: 'subjectSheet', localField: 'subjectID', as: 'Classes',
        },
      }, { $unwind: '$Classes' }, {
        $project: {
          facultyName: 1, subjectID: 1, subjectCode: 1, className: '$Classes.className',
        },
      }]);
    console.log(data);
    const classesToTeach = data.length;
    return classesToTeach;
  };

  const getAllClassInchargesByAcademicYearID = async (facultyID, academicYearID) => {
    const data = await FacultyModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(facultyID) } },
      {
        $lookup: {
          from: 'classes', foreignField: 'facultyID', localField: '_id', as: 'classIncharge',
        },
      }, { $unwind: '$classIncharge' }, { $match: { 'classIncharge.academicYearID': new mongoose.Types.ObjectId(academicYearID) } },
      { $project: { facultyName: 1, classIncharge: '$classIncharge.className', classStrength: '$classIncharge.studentSheet' } },
    ]);
    console.log(data);
    const classIncharges = data.length;
    const classSizes = data.map((element) => {
      const { classIncharge, classStrength } = element;
      console.log(classIncharge, 'inchage');
      const classSize = classStrength.length;
      console.log(classSize,'./k');
      return {
        name: classIncharge,
        value: classSize,
      };
    });
    console.log(classSizes,'clas sizes');

    return { classIncharges, classSizes };
  };
  return {
    signup,
    getFacultyName,
    getFacultyByEmail,
    getFacultyByID,
    getFacultyStats,
    getAllSubjectsByAcademicYearID,
    getAllClassesToTeachByAcademicYearID,
    getAllClassInchargesByAcademicYearID,
  };
}
