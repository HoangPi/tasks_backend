import { IsNotEmpty } from "class-validator"

export class CreateProjectDto{
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    owner: string

    @IsNotEmpty()
    members: string[]
    
    @IsNotEmpty()
    description: string
}