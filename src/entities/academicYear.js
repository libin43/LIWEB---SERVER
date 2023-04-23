export default function academicYear(
  startDate,
  endDate,
  schoolID,
) {
  return {
    getStartDate: () => startDate,
    getEndDate: () => endDate,
    getSchoolID: () => schoolID,
  };
}
