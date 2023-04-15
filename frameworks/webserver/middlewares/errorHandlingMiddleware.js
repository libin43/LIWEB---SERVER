export default function errorHandlingMiddleware(err, req, res, next) {
  console.error(err.message, next, 'this is errrrrrr');
  if (err.message === 'Invalid Credentials') {
    // Handle JSON parsing errors or syntax errors
    res.status(400).send({ error: 'Invalid Credentails' });
  } else if (err.message === 'Otp Expired') {
    // Handle Otp Expire
    res.status(401).send({ error: 'Otp has been expired' });
  } else if (err.message === 'Incorrect Password' || err.message === 'Incorrect Otp') {
    // Handle Unauthorised access
    res.status(401).send({ error: 'Unauthorised Access' });
  } else if (err.code === 11000 && err.keyPattern && err.keyPattern.schoolName === 1) {
    // Handle Duplicate School Name
    res.status(409).send({ error: 'School Name Already Exist' });
  } else if (err.code === 11000 && err.keyPattern && err.keyPattern.email === 1) {
    // Handle Duplicate Email
    res.status(409).send({ error: 'Email Already Exist' });
  } else if (err.code === 11000 && err.keyPattern && err.keyPattern.phone === 1) {
    // Handle Duplicate Phone Number
    res.status(409).send({ error: 'Phone Already Exist' });
  } else {
    // Handle other errors
    res.status(500).send({ error: 'Something already broke!' });
  }
}
