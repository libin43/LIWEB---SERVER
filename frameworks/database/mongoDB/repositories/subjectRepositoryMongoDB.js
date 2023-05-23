import mongoose from 'mongoose';
import SubjectModel from '../models/subject.js';

export default function subjectRepositoryMongoDB() {
  const subjectExist = async (subjectEntity) => {
    const subject = await SubjectModel.findOne(
      {
        $and: [
          { schoolID: { $eq: subjectEntity.getSchoolID() } },
          { academicYearID: { $eq: subjectEntity.getAcademicYearID() } },
          { subjectCode: { $eq: subjectEntity.getSubjectCode() } },
        ],
      },
    );
    return subject;
  };

  const setNewSubject = (subjectEntity) => {
    const newSubject = new SubjectModel({
      subjectName: subjectEntity.getSubjectName(),
      subjectCode: subjectEntity.getSubjectCode(),
      academicYearID: subjectEntity.getAcademicYearID(),
      facultyID: subjectEntity.getFacultyID(),
      schoolID: subjectEntity.getSchoolID(),
    });
    return newSubject.save();
  };

  const getSubjectByAcademicYearIdSchoolId = async (subjectEntity) => {
    const subject = await SubjectModel.find(
      {
        $and: [
          { academicYearID: subjectEntity.getAcademicYearID() },
          { schoolID: subjectEntity.getSchoolID() },
        ],
      },
    )
      .select('subjectName subjectCode');
    return subject;
  };

  const getSubjectsById = async (subjectID, skip, limit) => {
    const subjects = await SubjectModel.find(
      { _id: subjectID },
    )
      .sort('subjectName')
      .skip(skip)
      .limit(limit)
      .select('subjectName subjectCode')
      .populate('facultyID', 'facultyName');
    return subjects;
  };

  const getSubjectsByName = async (subjectID, skip, limit, key) => {
    console.log('subject name called');
    const subjectsData = await SubjectModel.aggregate([
      {
        $match: {
          $and: [
            { _id: { $in: subjectID } },
            {
              subjectName: {
                $regex: new RegExp(key, 'i'),
              },
            },
          ],
        },
      },
      {
        $sort: { subjectName: 1 },
      },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                studentName: 1,
                subjectCode: 1,
              },
            },
          ],
          count: [
            // give total count of matched docs
            { $count: 'total' },
          ],
        },
      },

    ]);
    console.log(subjectsData, '/////////');
    const count = subjectsData[0].data.length > 0 ? subjectsData[0].count[0].total : 0;
    const subjects = subjectsData[0].data.length > 0 ? subjectsData[0].data : null;

    const searchData = { subjects, count };
    return searchData;
  };

  const getSubjectsByFacultyId = async (facultyID, academicYearID) => {
    const subjectsOfFaculty = await SubjectModel.find({
      $and: [
        { facultyID },
        { academicYearID },
      ],
    })
      .select('subjectName subjectCode');
    return subjectsOfFaculty;
  };

  const getExamsOfFacultySubjects = async (facultyID, academicYearID) => {
    console.log(facultyID, academicYearID, 'in mongodb');
    const subjects = await SubjectModel.aggregate([
      {
        $match: {
          $and:
        [
          { facultyID: new mongoose.Types.ObjectId(facultyID) },
          { academicYearID: new mongoose.Types.ObjectId(academicYearID) }],
        },
      },
      { $project: { _id: 1, subjectName: 1, subjectCode: 1 } },
      {
        $lookup: {
          from: 'exams', foreignField: 'subjectID', localField: '_id', as: 'examination',
        },
      },
      {
        $unwind: {
          path: '$examination',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          subjectID: '$_id',
          subjectName: 1,
          subjectCode: 1,
          examID: '$examination._id',
          examName: '$examination.examName',
          examDate: '$examination.examDate',
        },
      },
    ]);
    return subjects;
  };
  return {
    subjectExist,
    setNewSubject,
    getSubjectByAcademicYearIdSchoolId,
    getSubjectsById,
    getSubjectsByName,
    getSubjectsByFacultyId,
    getExamsOfFacultySubjects,
  };
}
