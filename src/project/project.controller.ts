import { Body, Controller, Get, HttpCode, Request, InternalServerErrorException, Post, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { TypeORMError } from 'typeorm';

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
  async addSprint(@Body() body: CreateSprintDto, @Request() req){
    try{
      return await this.projectService.createSprint(body, req.user.id)
    }
    catch(err){
      if(err instanceof TypeORMError){
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
      }
      if(err instanceof HttpException){
        throw new HttpException(err.message, HttpStatus.FORBIDDEN)
      }
      throw new HttpException("Internal", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
