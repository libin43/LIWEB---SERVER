export default function errorHandlingMiddleware(err, req, res, next) {
  console.error(err.message, next, 'this is errrrrrr');
  if (err.message === 'Invalid Credential') {
    // Handle JSON parsing errors or syntax errors
    console.log('400 hitting');
    res.status(400).send({ error: 'Invalid Credentails' });
  } else if (err.message === 'Incorrect Password') {
    // Handle Unauthorised access
    res.status(401).send({ error: 'Unauthorised Access' });
  } else {
    // Handle other errors
    res.status(500).send({ error: 'Something already broke!' });
  }
}
