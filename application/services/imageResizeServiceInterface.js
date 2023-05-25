export default function imageResizeServiceInterface(service) {
  const standardSize = (buffer) => service.standardSize(buffer);
  return {
    standardSize,
  };
}
