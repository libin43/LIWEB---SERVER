export default function errorHandlingMiddleware(err, req, res, next) {
  console.error(err.message, next, 'this is errrrrrr');
  if (err.message === 'Invalid Credentials') {
    // Handle JSON parsing errors or syntax errors
    res.status(400).send({ error: 'Invalid Credentails' });
  } else if (err.message === 'Exam date not within academic year') {
    // Handle Otp Expire
    res.status(400).send({ error: err.message });
  } else if (err.message === 'Otp Expired') {
    // Handle Otp Expire
    res.status(401).send({ error: 'Otp has been expired' });
  } else if (err.message === 'Incorrect Password' || err.message === 'Incorrect Otp') {
    // Handle Unauthorised access
    res.status(401).send({ error: 'Unauthorised Access' });
  } else if (err.message === 'invalid token' || err.message === 'jwt malformed' || err.message === 'jwt must be provided') {
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
  } else if (err.message === 'Date Range Already Exist') {
    // Handle Duplicate Date ranges
    res.status(409).send({ error: 'Selected date range falls within existing date range' });
  } else if (err.message === 'Class Already Exist') {
    // Handle Duplicate Classes
    res.status(409).send({ error: 'Classroom Already Exist in this academic year' });
  } else if (err.message === 'Student already active') {
    // Handle Duplicate Students
    res.status(409).send({ error: 'Student Already Exist' });
  } else if (err.message === 'Subject Already Exist') {
    // Handle Duplicate Subjects
    res.status(409).send({ error: err.message });
  } else if (err.message === 'Exam Already Exist') {
    // Handle Duplicate Exams
    res.status(409).send({ error: err.message });
  } else if (err.message === 'No Classroom Found') {
    // Handle Non-existing Classes
    res.status(404).send({ error: 'No classroom found' });
  } else if (err.message.includes('Classes not found')) {
    // Handle Non-existing Multiple Classes
    const notFoundClasses = err.message.split(': ')[1];
    const errorMessage = `Class not found: ${notFoundClasses}`;
    res.status(404).send({ error: errorMessage });
  } else {
    // Handle other errors
    res.status(500).send({ error: 'Something already broke!' });
  }
}
