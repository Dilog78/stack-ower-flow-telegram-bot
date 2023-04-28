import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TelegrafModule } from "nestjs-telegraf";
import { AppUpdate } from "./app.update";
import { ApiStackOverflow } from "./api/api.stackoverflow";
require('dotenv').config();

@Module({
  imports: [TelegrafModule.forRoot({
    token: process.env.TELEGRAM_TOKEN
  })],
  controllers: [],
  providers: [AppService, AppUpdate, ApiStackOverflow],
})
export class AppModule {}
