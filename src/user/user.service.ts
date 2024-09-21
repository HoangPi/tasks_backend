import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt"
import { ResponseMessages } from 'src/constants/responseMessage';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepos: Repository<User>
    ) { }

    async createOne(createUser: CreateUserDto) {
        const user = this.userRepos.create({
            username: createUser.username,
            password: await bcrypt.hash(createUser.password, 12),
            phone: createUser.phone || null,
            address: createUser.address || null,
            name: createUser.name || null
        })
        try {
            return await this.userRepos.save(user)
        }
        catch (err) {
            if(err.code === '23505'){
                throw new ConflictException({message: ResponseMessages.DUPPLICATE_USERNAME})
            }
            throw InternalServerErrorException
        }
    }
}
