import { UseGuards, applyDecorators } from '@nestjs/common';
import { ROLESUSER } from 'src/core/constants/ROLES/rolUser';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards';
import { RoleProtected } from './decorators.decorator';

export function AuthDecorator(...roles: typeof ROLESUSER) {
  return applyDecorators(
    UseGuards(AuthGuard(), UserRoleGuard),
    RoleProtected(...roles),
  );
}
