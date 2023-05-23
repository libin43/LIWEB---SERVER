export default function examResult(
  classID,
  subjectID,
  examID,
  totalMark,
  resultSheet,
) {
  return {
    getClassID: () => classID,
    getSubjectID: () => subjectID,
    getExamID: () => examID,
    getTotalMark: () => totalMark,
    getResultSheet: () => resultSheet,
  };
}
