import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto): Promise<any> {
    const { email, password } = loginData;
    const user = await this.userService.findOneByEmail(email);
    const payload = { sub: user.id, email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        ...user,
      },
    };
  }

  async validateUser(email, password): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && this.validatePassword(password, user.password)) {
      return user;
    }
    return null;
  }

  validatePassword(password: string, userPassword: string) {
    return bcrypt.compareSync(password, userPassword);
  }
}
