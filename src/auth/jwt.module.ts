import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({
        secret: process.env.REFRESH_TOKEN_KEY,
        signOptions: {
            algorithm: 'HS256',
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
        }
    })],
    providers: [{
        provide: 'RefreshService',
        useExisting: JwtService
    }],
    exports: ['RefreshService']
})
export class RefreshModule{}