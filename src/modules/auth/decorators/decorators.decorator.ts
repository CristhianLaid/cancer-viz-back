import { SetMetadata } from '@nestjs/common';
import { ROLESUSER } from 'src/core/constants/ROLES/rolUser';


export const META_ROLES = 'roles'

export const RoleProtected = (...args: typeof ROLESUSER) => SetMetadata(META_ROLES, args);
