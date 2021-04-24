import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../../../../config/auth';
import AppError from '../../../../../shared/errors/AppError';

interface ITokenPayload {
  iat: string;
  exp: string;
  id: string;
}

function ensureNurseAuthenticated(
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
    const decode = verify(token, auth.jwt.nurseSecret);

    const { id } = decode as ITokenPayload;

    request.nurse = { id };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
}

export default ensureNurseAuthenticated;
