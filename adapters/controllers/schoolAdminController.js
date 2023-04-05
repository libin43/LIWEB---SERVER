import addSchoolAdmin from '../../application/use_cases/schoolAdmin/signup.js';

export default function schoolAdminController(
  schoolAdminRepository,
  schoolAdminImpl,

) {
  const dbRepositorySchoolAdmin = schoolAdminRepository(schoolAdminImpl());

  const addNewSchoolAdmin = async (req, res, next) => {
    try {
      console.log(req.body, 'its body');
      const {
        adminName,
        schoolName,
        afflNumber,
        email,
        phone,
        address,
        pincode,
        schoolImage,
        password,
        createdAt,
        updatedAt,
      } = req.body;
      addSchoolAdmin(
        adminName,
        schoolName,
        afflNumber,
        email,
        phone,
        address,
        pincode,
        schoolImage,
        password,
        createdAt,
        updatedAt,
        dbRepositorySchoolAdmin,
      )
        .then((schoolAdmin) => res.status(200).json({ success: true, message: 'School Admin Signup successful', schoolAdmin }))

        .catch((err) => {
          console.log(err, 'controlleer');
          next(err);
        });
    } catch (error) {
      console.log('Its catch', error);
      res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
  };

  return {
    addNewSchoolAdmin,
  };
}
