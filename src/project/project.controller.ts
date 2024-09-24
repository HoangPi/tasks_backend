import { Body, Controller, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  create(@Body() body: CreateProjectDto){
    try{
      return this.projectService.createOne(body)
    }
    catch(err){
      return InternalServerErrorException
    }
  }
}
