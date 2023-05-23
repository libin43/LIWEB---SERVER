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

  const getStudentsById = async (studentID, skip, limit) => {
    const students = await StudentModel.find(
      { _id: studentID },
    )
      .sort('studentName')
      .skip(skip)
      .limit(limit)
      .select('studentName email phone status block');
    return students;
  };

  const getStudentsByName = async (studentID, skip, limit, key) => {
    console.log('student name called');
    const studentsData = await StudentModel.aggregate([
      {
        $match: {
          $and: [
            { _id: { $in: studentID } },
            {
              studentName: {
                $regex: new RegExp(key, 'i'),
              },
            },
          ],
        },
      },
      {
        $sort: { studentName: 1 },
      },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                studentName: 1,
                email: 1,
                phone: 1,
                status: 1,
                block: 1,
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
    console.log(studentsData, '/////////');
    const count = studentsData[0].data.length > 0 ? studentsData[0].count[0].total : 0;
    const students = studentsData[0].data.length > 0 ? studentsData[0].data : null;

    const searchData = { students, count };
    return searchData;
  };

  const updateAccess = async (bool, _id) => {
    const student = await StudentModel.findByIdAndUpdate(
      _id,
      { block: bool },
      { new: true },
    )
      .select('studentName block');
    return student;
  };

  const getStudentStats = async (schoolID) => {
    const totalStudent = await StudentModel.find({
      $and: [
        { schoolID },
        { status: 'activeStudent' },
      ],
    })
      .select('studentName').count();
    return totalStudent;
  };

  return {
    signup,
    studentExist,
    getStudentsById,
    getStudentsByName,
    updateAccess,
    getStudentStats,
  };
}
