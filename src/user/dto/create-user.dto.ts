import { IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"
import { ResponseMessages } from "src/constants/responseMessage"

export class CreateUserDto {
    @IsString()
    @MinLength(6,{message: ResponseMessages.ABNORMAL_USERNAME_LENGTH})
    @MaxLength(20,{message: ResponseMessages.ABNORMAL_USERNAME_LENGTH})
    username: string

    @IsString()
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    }, {message: ResponseMessages.WEAK_PASSWORD})
    password: string

    name?: string
    phone?: string
    address?: string
}