import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({ error: 'No Token Provided' });

  const parts = authHeader.split(' ');
  if (!parts.length === 2)
    return res.status(401).send({ error: 'Token Error' });

  const [schema, token] = parts;
  if (!/^Bearer$/i.test(schema))
    return res.status(401).send({ error: 'Token Malformatted' });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err)
      return res.status(401).send({ error: 'Token Invalidad' });

    req.companyId = decoded.id;
    return next();
  });
}