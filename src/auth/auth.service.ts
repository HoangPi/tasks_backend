import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ) {}

    async ValidateUser(username: string, password: string){
        const user = await this.userService.findOneByUnsername(username)
        if(user && await bcrypt.compare(password, user.password)){
            const {password, ...result} = user
            return result
        }
        throw UnauthorizedException
    }
}
