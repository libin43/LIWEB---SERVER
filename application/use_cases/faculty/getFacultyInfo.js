export default async function getFacultyInfo(
  facultyID,
  dbRepositoryFaculty,
  storageServiceS3,
) {
  const { facultyImage, ...facultyData } = await dbRepositoryFaculty.getFacultyByID(facultyID);
  const { _doc } = facultyData;
  if (!_doc) {
    throw new Error('Invalid Credentials');
  }
  const s3Image = await storageServiceS3.fetchFile(facultyImage);
  console.log(s3Image);
  if (!s3Image) {
    throw new Error('Signing url failed');
  }
  const faculty = {
    ..._doc,
    facultyImage: s3Image,
  };

  return faculty;
}
