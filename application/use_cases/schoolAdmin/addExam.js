import exam from '../../../src/entities/exam.js';
import subject from '../../../src/entities/subject.js';

export default async function addExam(
  academicYearID,
  schoolID,
  subjectCode,
  examDate,
  examName,
  dbRepositoryExam,
  dbRepositorySubject,
  dbRepositoryAcademicYear,
) {
  const subjectEntity = subject(
    academicYearID,
    schoolID,
    subjectCode,
  );
  const subjectData = await dbRepositorySubject.subjectExist(subjectEntity);
  console.log(subjectData);
  if (!subjectData) {
    throw new Error('No subject found');
  }
  const academicYearData = await dbRepositoryAcademicYear.getAcademicYearByID(academicYearID);
  if (!academicYearData) {
    throw new Error('No academicYear found');
  }

  const [day, month, year] = examDate.split('/');
  const dateOfExam = new Date(Date.UTC(year, month - 1, day));

  if (dateOfExam <= academicYearData.startDate || dateOfExam >= academicYearData.endDate) {
    console.log(dateOfExam, 'error in exam not within');
    throw new Error('Exam date not within academic year');
  }
  const subjectID = subjectData._id;
  const newExam = exam(
    academicYearID,
    schoolID,
    subjectID,
    examDate,
    examName,
  );
  const examExist = await dbRepositoryExam.examExist(newExam);
  console.log(examExist, 'exam exist');
  if (examExist) {
    throw new Error('Exam Already Exist');
  }
  return dbRepositoryExam.setNewExam(newExam);
}
