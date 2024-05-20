import { Module } from "@nestjs/common";
import { EmailController } from "./email.controllers";
import { EmailService } from "./email.services";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [EmailController],
    providers: [EmailService,PrismaService],
  })
  export class EmailModule {}