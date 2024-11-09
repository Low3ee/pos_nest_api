/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "prisma/prisma.service";
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) {}
    async validateUserLogin(userCreds: any, response: Response): Promise<any> {
        const { email, _password } = userCreds;
        // console.log(userCreds);
        // console.log(`gikan sa service: ${email}, ${_password}`);

        try {
            // Check if the user exists in the database
            const user = await this.prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                throw new HttpException("No user found", HttpStatus.FORBIDDEN);
            }

            // Verify the password using bcrypt
            const success = await bcrypt.compare(_password, user.password);

            if (!success) {
                throw new HttpException(
                    "Invalid Credentials",
                    HttpStatus.FORBIDDEN,
                );
            }

            // Remove the password from the result
            const { password, ...result } = user;

            // Call the login method and pass the response to set the cookie
            return this.login(result, response);
        } catch (error) {
            throw new HttpException(
                "Something went wrong...",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async validateToken(token: any) {
        try {
            const decoded = this.jwtService.verify(token);
            return { isValid: true, decoded };
        } catch (error) {
            throw new UnauthorizedException("Invalid Token");
        }
    }

    async login(user: any, response: Response) {
        // Create the JWT payload
        const payload = { email: user.email, sub: user.id };

        // Generate the JWT token
        const token = this.jwtService.sign(payload, { expiresIn: "7d" });

        (response as any).cookie("auth_token", token, {
            httpOnly: true,             
            secure: false,
            origin: 'http://localhost:3030',                     
            maxAge: 3600000,
        });

        (response as any).send({
            message: "Login successful",
            success: true,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
            },
        });
    }

    async register(name: string, email: string, pass: string) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(pass, saltRounds);

        const user = await this.prisma.user.create({
            data: {
                fullName: name,
                email,
                password: hashedPassword,
            },
        });

        const { password, ...result } = user;
        return result;
    }
}
