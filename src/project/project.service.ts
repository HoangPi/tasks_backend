import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { In, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepos: Repository<Project>,

        @InjectRepository(User)
        private userRepos: Repository<User>
    ) { }

    async createOne(createProjectDto: CreateProjectDto) {
        try {
            const owner = await this.userRepos.findOne({
                where: {
                    username: createProjectDto.owner
                },
                select: ['id']
            })
            const members = await this.userRepos.find({
                where: {
                    username: In(createProjectDto.members)
                },
                select: ['id']
            })
            const project = new Project()
            project.name = createProjectDto.name
            project.projectOwner = owner
            project.members = members
            project.description = createProjectDto.description
            return await this.projectRepos.save(project)
        }
        catch (err) {
            console.error(err)
            throw new Error("I dont know man, what could have gone wrong")
        }
    }

    async findSelfProjects(userid: number) {
        try {
            const res = await this.projectRepos.find({
                where: {
                    projectOwner: {
                        id: userid
                    }
                }
            });
            return { projects: res };
        } catch {
            throw InternalServerErrorException;
        }
    }
}
