import { Body, Controller, Get, HttpCode, Request, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateSprintDto } from './dto/create-sprint.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  create(@Body() body: CreateProjectDto){
    try{
      return this.projectService.createOne(body)
    }
    catch(err){
      return InternalServerErrorException
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  findSelfProjects(@Request() req){
    return this.projectService.findSelfProjects(req.user.id)
  }

  @Post('sprint')
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  addSprint(@Body() body: CreateSprintDto){
    return this.projectService.createSprint(body)
  }
}
