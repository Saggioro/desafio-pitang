import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../../../../config/auth';
import AppError from '../../../../../shared/errors/AppError';

interface ITokenPayload {
  iat: string;
  exp: string;
  id: string;
  birth: Date;
}

function ensureUserAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decode = verify(token, auth.jwt.userSecret);

    const { id, birth } = decode as ITokenPayload;

    request.user = { birth, id };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}

export default ensureUserAuthenticated;
