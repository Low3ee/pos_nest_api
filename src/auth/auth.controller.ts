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

    // Validate the token received in the cookies
    @Get("validate_token")
    async validateToken(@Req() request: Request) {
        const token = (request as any).cookies["auth_token"];

        console.log("Cookies:", (request as any).cookies["auth_token"]);

        if (!token) {
            throw new BadRequestException("Missing auth_token cookie");
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
        @Body() body: { fname: string; lname: string; phone: string; email: string; password: string },
    ) {
        const { fname, lname, phone, email, password } = body;

        if (!fname || !lname || !email || !password) {
            throw new BadRequestException("Missing registration details");
        }

        return this.authService.register(fname, lname, phone, email, password);
    }
}
