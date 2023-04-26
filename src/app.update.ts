import { Ctx, On, InjectBot, Start, Update, Message, Hears } from "nestjs-telegraf";
import { Context, Markup, Telegraf } from "telegraf";
import { AppService } from "./app.service";


@Update()
export class AppUpdate {

  private page: number;
  private message: string;

  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService
  ) {
  }

  @Start()
  async startCommand(@Ctx() ctx: Context) {
    await ctx.reply("Hello, send me questions ?");
  }

  @On("text")
  async question(@Message("text") msg: string, @Ctx() ctx: Context) {
    this.message = msg;
    this.page = 1;
    const answers = await this.appService.search(msg, this.page);
    answers.forEach(answer => {
      ctx.reply(answer.title, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "go to StackOwerflow", url: answer.link }]
          ]
        }
      });
    });
    await ctx.reply('next', Markup.keyboard([['more']]));
  }

  @Hears('next')
  async more(@Ctx() ctx: Context) {
    console.log(this.page);
    this.page = this.page + 1;
    console.log(this.page);

    const answers = await this.appService.search(this.message, this.page);

    answers.forEach(answer => {
      ctx.reply(answer.title, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "go to StackOwerflow", url: answer.link }, { text: "more", callback_data: 'more' }]
          ]
        }
      });
    });
  }
}