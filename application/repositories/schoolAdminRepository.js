export default function schoolAdminRepostiory(repository) {
  const signup = (schoolAdmin) => {
    console.log(schoolAdmin, 'come from db.singup');
    return repository.signup(schoolAdmin);
  };

  const getSchoolAdminByEmail = (email) => {
    console.log(email, 'email');
    return repository.getSchoolAdminByEmail(email);
  };

  return {
    signup,
    getSchoolAdminByEmail,
  };
}
