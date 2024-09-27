import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateSprintDto{
    @IsString()
    name: string

    createdAt: Date

    endAt: Date

    @IsNumber()
    projectId: number
}