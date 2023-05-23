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
  return {
    examResultExist,
    setNewExamResult,
  };
}
