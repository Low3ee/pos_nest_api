/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "prisma/prisma.service";
import { Response } from 'express'; // Make sure to import the Response type

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) {}

    async validateUserLogin(userCreds: { email: string; _password: string }, response: any): Promise<any> {
        const { email, _password } = userCreds;

        try {
            const user = await this.prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                throw new HttpException("No user found", HttpStatus.FORBIDDEN);
            }

            const success = await bcrypt.compare(_password, user.password);
            if (!success) {
                throw new HttpException("Invalid credentials, incorrect password", HttpStatus.FORBIDDEN);
            }

            const { password, ...userWithoutPassword } = user;

            return this.login(userWithoutPassword, response);
        }  catch (error) {
            console.error(error);
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException("Something went wrong...", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    async validateToken(token: string): Promise<any> {
        try {
            const decoded = this.jwtService.verify(token);
            return { isValid: true, decoded };
        } catch (error) {
            throw new UnauthorizedException("Invalid Token");
        }
    }

    async login(user: { email: string; id: number; fullName: string }, response: any): Promise<any> {
        const payload = { email: user.email, sub: user.id };

        const token = this.jwtService.sign(payload, { expiresIn: "7d" });

        const isProduction = process.env.NODE_ENV === 'production';

        response.cookie("auth_token", token, {
            httpOnly: true,
            secure: isProduction, 
            origin: "http://localhost:3030",
            maxAge: 3600000,
        });

        return response.send({
            message: "Login successful",
            success: true,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
            },
        });
    }

    async register(name: string, email: string, pass: string): Promise<any> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(pass, saltRounds);

        const user = await this.prisma.user.create({
            data: {
                fullName: name,
                email,
                password: hashedPassword,
            },
        });

        // Remove password before returning user data
        const { password, ...result } = user;
        return result;
    }
}
