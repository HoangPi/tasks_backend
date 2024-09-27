import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { User } from 'src/user/entity/user.entity';
import { Sprint } from './entities/sprint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, Sprint])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
