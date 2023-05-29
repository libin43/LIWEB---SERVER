export default function cloudfrontServiceInterface(service) {
  const fetchFile = (fileName) => service.fetchFile(fileName);
  const invalidateFile = (fileName) => service.invalidateFile(fileName);
  return {
    fetchFile,
    invalidateFile,
  };
}
