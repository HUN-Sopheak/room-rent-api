import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { HelpersService } from 'src/utils/helper/helpers.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly helper: HelpersService,
  ) { }

  private response(status: HttpStatus, message: string, data: any = null) {
    return {
      status,
      message,
      data,
    };
  }

   async login(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await this.helper.comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
    }

    const token = this.jwtService.sign({ id: user.id, username: user.username });

    return this.response(HttpStatus.OK, 'Login successfuly', {
      access_token: token,
    });
  }


}
