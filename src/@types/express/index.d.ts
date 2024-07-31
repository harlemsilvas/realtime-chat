declare namespace Express {
  export interface Request {
    name: string;
    user_id: string;
    email: string;
  }
}
/**
 * extende a classe Request do Express / O Typescript entende que estamos mudando a tipagem do Request.
 */
