import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { And, In, Like, Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt"
import { ResponseMessages } from 'src/constants/responseMessage';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepos: Repository<User>
    ) { }

    async createOne(createUser: CreateUserDto): Promise<User> {
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
            if (err.code === '23505') {
                throw new ConflictException({ message: ResponseMessages.DUPPLICATE_USERNAME })
            }
            throw InternalServerErrorException
        }
    }

    async findOneByUnsername(username: string): Promise<User | null> {
        return this.userRepos.findOne({
            where: { username: username },
            select: ['address', 'id', 'name', 'password', 'phone', 'username']
        })
    }

    async findUser(username: string, exclude: string[]) {
        this.userRepos.find({
            where: {
                username: Like(username)
            }
        })
        return this.userRepos.find({
            where: {
                username: And(Like(`%${username}%`), Not(In(exclude)))
            },
            take: 20
        })
    }

    async findEmployee(ownerid: number) {
        try {
            return await this.userRepos.find({
                where: {
                    projects: {
                        projectOwner: {
                            id: ownerid
                        }
                    }
                },
                select: ['id', 'username', 'name']
            })
        }
        catch (err) {
            console.error(err)
            throw InternalServerErrorException
        }
    }
}
