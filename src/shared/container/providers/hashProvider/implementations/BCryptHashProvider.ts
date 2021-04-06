import { compare, hash } from 'bcrypt';
import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async compareHash(password: string, hashed: string): Promise<boolean> {
    return compare(password, hashed);
  }

  public async generateHash(password: string): Promise<string> {
    return hash(password, 8);
  }
}

export default BCryptHashProvider;
