import {
    Controller,
    Get,
    HttpCode,
    NotFoundException,
    Post,
    Req,
    UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Request } from "express";
import prisma from "prisma/prismaConfig";

@Controller("user")
export class UserController {
    constructor() {}
    @Get("all")
    async getAllUsers(@Req() clientRequest: Request): Promise<object> {
        const users = await prisma.user.findMany();

        return { Users: users, Ip: clientRequest.ip };
    }

    @Post("login")
    @HttpCode(200)
    async logInUser(@Req() clientRequest: Request): Promise<object> {
        const { email, password } = clientRequest.body;
        const user = await prisma.user.findUnique({ where: { email: email } });

        if (!user) {
            throw new NotFoundException(`No user found`);
        }
        const guard = await bcrypt.compare(password, user.password);

        if (!guard) {
            throw new UnauthorizedException("invalid password vro");
        }

        return {
            message: "success",
            data: user,
        };
    }

    @Post("create")
    async createUser(@Req() clientRequest: Request): Promise<object> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(clientRequest.body.password, salt);
        const user = await prisma.user.create({
            data: {
                email: clientRequest.body.email,
                password: hash,
                fullName: clientRequest.body.fullName,
                role: clientRequest.body.role,
            },
        });

        return { User: user, Ip: clientRequest.ip };
    }

    @Post("update")
    async updateUser(@Req() clientRequest: Request): Promise<object> {
        const user = await prisma.user.update({
            where: {
                id: clientRequest.body.id,
            },
            data: {
                email: clientRequest.body.email,
                password: clientRequest.body.password,
                fullName: clientRequest.body.fullName,
                role: clientRequest.body.role,
            },
        });

        return { User: user, Ip: clientRequest.ip };
    }

    @Post("delete")
    async deleteUser(@Req() clientRequest: Request): Promise<object> {
        const user = await prisma.user.delete({
            where: {
                id: clientRequest.body.id,
            },
        });

        return { User: user, Ip: clientRequest.ip };
    }
}
