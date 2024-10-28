import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Header,
    HttpCode,
    Post,
    Req,
    Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get("validate_token")
    async validateToken(@Req() request: Request) {
        const token = (request as any).cookies["auth_token"];
        console.log("cookies:", request as any);
        if (!token) {
            throw new BadRequestException("Missing token");
        }
        return this.authService.validateToken(token);
    }

    @Post("login")
    @HttpCode(200)
    async login(
        @Body() body: { email: string; _password: string },
        @Res({ passthrough: true }) response: Response,
    ) {
        return this.authService.validateUserLogin(body, response);
    }

    @Post("register")
    @Header("Content-Type", "application/json")
    async register(
        @Body() body: { fullName: string; email: string; password: string },
    ) {
        const { fullName, email, password } = body;
        // console.log(body);
        if (!fullName || !email || !password) {
            throw new BadRequestException("Missing registration details");
        }
        return this.authService.register(fullName, email, password);
    }
}
