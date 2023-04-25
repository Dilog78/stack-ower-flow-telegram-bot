import { Ctx, On, InjectBot, Start, Update } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { AppService } from "./app.service";


@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService
  ) {}

  @Start()
  async startCommand(@Ctx() ctx: Context) {
    await ctx.reply('Hello, send me questions ?')
  }

  @On('text')
  async question(@Ctx() ctx: Context) {
    const question = await ctx.message['text'];
    const answer = await this.appService.search(question);
    for (let i = 0; i < answer.length; i++) {
      await ctx.reply(answer[i]);
    }
  }
}