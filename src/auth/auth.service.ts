import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../api/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.email,
      name: user.name,
      roles: user.roles,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
