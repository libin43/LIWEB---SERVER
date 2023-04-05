export default function facultyRepository(repository) {
  console.log(repository, 'its repository passed from fRMongo');
  const add = (faculty) => repository.add(faculty);

  return {
    add,
  };
}
