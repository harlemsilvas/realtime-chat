import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../interfaces/HttpException';
import { verify } from 'jsonwebtoken';
interface IPayLoad {
  name: string;
  email: string;
  user_id: string;
}
export function authMiddleware(
  request: Request,
  reposnse: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;
  if (!authorization) {
    throw new HttpException(401, 'Token missing');
  }
  try {
    //auth[0] = Bearer
    //auth[1] = klkkokoko => token
    const [, token] = authorization.split(' ');

    let secretKey = process.env.TOKEN_SECRET;
    if (!process.env.TOKEN_SECRET) {
      throw new HttpException(498, 'TOKEN_SECRET not found');
    }
    //const verifyToken = verify(token, process.env.TOKEN_SECRET);

    const { name, user_id, email } = verify(
      token,
      process.env.TOKEN_SECRET
    ) as IPayLoad;
    request.user_id = user_id;
    request.name = name;
    request.email = email;

    console.log('Name', name);
    next();
  } catch (error) {
    throw new HttpException(401, 'Token expired');
  }
}
