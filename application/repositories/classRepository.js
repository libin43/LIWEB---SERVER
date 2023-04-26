export default function classRespository(repository) {
  const classExist = (classRoom) => repository.classExist(classRoom);
  const setNewClassRoom = (classRoom) => repository.setNewClassRoom(classRoom);

  return {
    classExist,
    setNewClassRoom,
  };
}
