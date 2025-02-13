import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { bcryptPlugin } from 'src/common/plugin/bcrypt.plugin';

import { Auth } from './entities/auth.entity';
import { CreateAuthDto } from './dto';
import { JwtPayload } from './interfaces';
import { LoginAuthDto } from './dto/login-auth.dto';
import { HandlerErrorService } from 'src/common/error/handleError.service';

import { omit } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly handlerDbError: HandlerErrorService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const { password, ...dataAuth } = createAuthDto;
    try {
      const roles = createAuthDto.roles && createAuthDto.roles.length > 0 ? createAuthDto.roles : ['user'];
      const auth = this.authRepository.create({
        password: bcryptPlugin.hasSync(password),
        roles,
        ...dataAuth,
      });
      await this.authRepository.save(auth);
      return {
        ...omit(auth, ['password']),
        jwt: this.getJwtToken({ id: auth.id, username: auth.username }),
      };
    } catch (error: any) {
      this.handlerDbError.logError(error);
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { password, email } = loginAuthDto;
    try {
      const auth = await this.authRepository.findOne({
        where: { email },
        select: { id: true, username: true, email: true, password: true, roles: true },
      });
      if (!auth)
        throw new UnauthorizedException(
          `User with email ${email} does not exist`,
        );
      if (!bcryptPlugin.compareSync(password, auth.password))
        throw new UnauthorizedException(`Credentials do not match`);
      return {
        ...omit(auth, ['password']),
        jwt: this.getJwtToken({ id: auth.id, username: auth.username }),
      };
    } catch (error: any) {
      this.handlerDbError.logError(error);
    }
  }

  async checkAuthStatus(auth: Auth) {
    const { password, ...data } = auth;
    return {
      ...data,
      jwt: this.getJwtToken({ id: auth.id, username: auth.username }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
