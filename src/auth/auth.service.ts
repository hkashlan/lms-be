import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { UserService } from '../api/user/user.service';
import { jwtConstants } from './constants';

export interface Payload {
  sub: number;
  username: string;
  name: string;
  roles: Role[];
}

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
    const payload: Payload = {
      sub: user.id,
      username: user.email,
      name: user.name,
      roles: user.roles,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
      }),
      username: user.email,
      userId: user.id,
      roles: user.roles,
    };
  }
}
