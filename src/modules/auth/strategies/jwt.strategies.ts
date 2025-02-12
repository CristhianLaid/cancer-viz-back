import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces";
import { Auth } from "../entities/auth.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_STRATEGIES')
        })
    }

    async validate(payload: JwtPayload): Promise<Auth>{
        const { id  } = payload;
        const auth = await this.authRepository.findOne({
            where:{id}
        })
        
        if (!auth) throw new UnauthorizedException(`Token not validate`);
        if (!auth.isActive) throw new UnauthorizedException(`User is invalid, talk with the administrator`)
        return auth
    }
}