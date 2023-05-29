export default async function getFacultyInfo(
  facultyID,
  dbRepositoryFaculty,
  storageServiceS3,
  cloudfrontService,
) {
  const { facultyImage, ...facultyData } = await dbRepositoryFaculty.getFacultyByID(facultyID);
  const { _doc } = facultyData;
  if (!_doc) {
    throw new Error('Invalid Credentials');
  }
  if (facultyImage === null) {
    const faculty = {
      ..._doc,
      facultyImageUrl: null,
    };
    return faculty;
  }
  // const s3Image = await storageServiceS3.fetchFile(facultyImage);
  // console.log(s3Image);
  // if (!s3Image) {
  //   throw new Error('Signing url failed');
  // }
  const cfDistImage = await cloudfrontService.fetchFile(facultyImage);
  console.log(cfDistImage, 'image got from cf');
  if (!cfDistImage) {
    throw new Error('Signing url failed');
  }
  const faculty = {
    ..._doc,
    facultyImageUrl: cfDistImage,
  };

  return faculty;
}
