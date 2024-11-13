import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ProductsModule } from "./product/product.module";

@Module({
    imports: [AuthModule, ProductsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
