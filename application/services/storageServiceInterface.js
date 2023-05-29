export default function storageServiceS3Interface(service) {
  const uploadFile = (
    fileName,
    fileBuffer,
    contentType,
  ) => service.uploadFile(fileName, fileBuffer, contentType);

  const fetchFile = (fileName) => service.fetchFile(fileName);

  const removeFile = (fileName) => service.removeFile(fileName);
  return {
    uploadFile,
    fetchFile,
    removeFile,
  };
}
