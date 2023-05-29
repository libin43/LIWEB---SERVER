export default async function deleteProfilePicture(
  facultyID,
  fileName,
  storageServiceS3,
  cloudfrontService,
  dbRepositoryFaculty,
) {
  console.log(facultyID);
  console.log(fileName);
  const { facultyImage } = await dbRepositoryFaculty.getFacultyByID(facultyID);
  if (facultyImage !== fileName) {
    throw new Error('Image Not Found');
  }

  const s3DeleteStatus = await storageServiceS3.removeFile(facultyImage);
  console.log(s3DeleteStatus, 's3 bucket deletion success or fail');
  if (!s3DeleteStatus) {
    throw new Error('Image Not Found');
  }

  const cfInvalidateStatus = await cloudfrontService.invalidateFile(facultyImage);
  console.log(cfInvalidateStatus, 'ahai');
  if (!cfInvalidateStatus) {
    throw new Error('Image Not Found');
  }

  const deleteStatus = await dbRepositoryFaculty.deleteFacultyImage(facultyID);
  return deleteStatus;
}
