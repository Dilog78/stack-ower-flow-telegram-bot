import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TelegrafModule } from "nestjs-telegraf";
import { AppUpdate } from "./app.update";
require('dotenv').config();

@Module({
  imports: [TelegrafModule.forRoot({
    token: process.env.TELEGRAM_TOKEN
  })],
  controllers: [],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
