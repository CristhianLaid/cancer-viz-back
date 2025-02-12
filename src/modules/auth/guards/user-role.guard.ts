import { CanActivate, ExecutionContext, Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validateRole: string[] = this.reflector.get(META_ROLES, context.getHandler())

    if (!validateRole) return true;
    if (validateRole.length === 0) return true;


    const req: Express.Request & { user?: Auth } = context.switchToHttp().getRequest();
    const auth = req.user as Auth;

    if (!auth) throw new BadRequestException('User not found');


    const authRoles = auth.roles
    
    for (const role of authRoles) {
      if ( validateRole.includes(role) ) return true;
    }
    
    throw new ForbiddenException(`User ${auth.username} is not allowed to be authenticated, need a valid rol: ${validateRole}`)
  }
}
