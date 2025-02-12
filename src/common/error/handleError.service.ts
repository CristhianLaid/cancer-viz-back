import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';



@Injectable()
export class HandlerErrorService{
    private readonly logger = new Logger();
    constructor(){}

    logError(error: any) {
        if (error.code === '23505') {
            this.logger.error(error.detail)
            throw new BadRequestException(error.detail)
        }

        this.logger.error(error.message || error)
        throw new InternalServerErrorException(error.message || error)
    }
}