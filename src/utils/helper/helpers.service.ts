import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HelpersService {

  private readonly saltRound =10

  async hashPassword(password:string):Promise<string> {
    const  salt = await bcrypt.genSalt(this.saltRound);
    return bcrypt.hash(password,salt)
  }
  
  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
  
}
