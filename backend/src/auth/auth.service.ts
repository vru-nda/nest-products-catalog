import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { LoginDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user || !(await user.validatePassword(loginDto.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    const secret = this.configService.get<string>('JWT_SECRET');

    if (!secret) throw new Error('JWT_SECRET is not configured');

    const access_token = await this.jwtService.signAsync(payload, { secret });

    return {
      success: true,
      data: {
        access_token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      message: 'Login successful',
    };
  }
}
