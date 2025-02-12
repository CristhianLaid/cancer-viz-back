import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const getUser = createParamDecorator(
    (data, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();

        let auth = req.user;

        if (!auth) throw new InternalServerErrorException('User not found (request)');

        return (!data) ? auth : auth[data];
    }
);


