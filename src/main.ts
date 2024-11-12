import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
    const corsOption: CorsOptions = {
        origin: "http://localhost:4200", // Allow requests only from this origin
        methods: "GET,POST,PUT,DELETE", // Specify allowed methods
        credentials: true, // If you need to allow cookies or credentials
    };
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors(corsOption);

    const config = new DocumentBuilder()
        .setTitle("Auth API")
        .setDescription(
            "An API boilerplate for managing users, roles, and permissions, organizations, and more. Built with NestJS, TypeScript, and Prisma.",
        )
        .setVersion("1.0")
        .addTag("Auth")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("swagger", app, document);

    await app.listen(3030);
}
bootstrap();
