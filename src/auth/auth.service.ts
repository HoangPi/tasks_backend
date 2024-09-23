import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        @Inject("RefreshService")
        private refreshService: JwtService,
        private jwtService: JwtService,
    ) { }

    async ValidateUser(username: string, password: string) {
        const user = await this.userService.findOneByUnsername(username)
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user
            return result
        }
        throw UnauthorizedException
    }

    async RefreshUser(refresh: string) {
        try{
            if(this.refreshService.verify(refresh)){
                const {iat, exp, id, ...result} = this.refreshService.decode(refresh)
                return {
                    access: this.jwtService.sign(result),
                }
            }
            throw new UnauthorizedException({message: "Session timed out"})
        }
        catch(err){
            throw new UnauthorizedException({message: "Session timed out"})
        }
    }
}
