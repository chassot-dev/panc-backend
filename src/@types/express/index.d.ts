import { JwtPayload } from '../../interfaces/jwt.interface'; // ajuste o caminho conforme seu projeto

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;  // ou o tipo que você usa para armazenar o user no token
    }
  }
}