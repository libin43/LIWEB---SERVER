export default async function addProfilePicture(
  facultyID,
  file,
  imageResizeService,
  storageServiceS3,
  dbRepositoryFaculty,
) {
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
