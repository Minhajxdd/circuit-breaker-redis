import { injectable } from "inversify";
import jwt from 'jsonwebtoken';

@injectable()
export class JwtUtils {
  generateToken(payload: any) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
  }
}
