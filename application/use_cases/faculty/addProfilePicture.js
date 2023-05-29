export default async function addProfilePicture(
  facultyID,
  file,
  imageResizeService,
  storageServiceS3,
  cloudfrontService,
  dbRepositoryFaculty,
) {
  const { facultyImage } = await dbRepositoryFaculty.getFacultyByID(facultyID);
  if (facultyImage !== null) {
    const s3DeleteStatus = await storageServiceS3.removeFile(facultyImage);
    console.log(s3DeleteStatus, 's3 bucket deletion success or fail');
    if (!s3DeleteStatus) {
      throw new Error('Image Not Found');
    }
    const cfInvalidateStatus = await cloudfrontService.invalidateFile(facultyImage);
    if (!cfInvalidateStatus) {
      throw new Error('Image Not Found');
    }
  }

  const { originalname, buffer, mimetype } = file;
  const resizedBuffer = await imageResizeService.standardSize(buffer);
  console.log(resizedBuffer);
  console.log(resizedBuffer, 'resized service success or fail');
  const { s3PostStatus, imageName } = await storageServiceS3.uploadFile(
    originalname,
    resizedBuffer,
    mimetype,
  );
  console.log(s3PostStatus, 's3 bucket service success or fail');
  console.log(imageName);
  return dbRepositoryFaculty.updateFacultyImage(facultyID, imageName);
}
