import { Ctx, On, InjectBot, Start, Update, Message } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { AppService } from "./app.service";
import nextPage from "./buttons/pagination.button";
import ButtonsWithMsg from "./buttons/message.buttons";


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

    for (const answer of answers) {
      await ctx.reply(answer["title"] as string, ButtonsWithMsg(answer.link as string));
    }

    await ctx.reply("more questions", nextPage());
  }

  @On("callback_query")
  async nextPage(@Ctx() ctx: Context) {
    const cbData: string = await ctx.callbackQuery["data"];

    if (cbData === "pagination") {
      this.page = this.page + 1;

      const answers = await this.appService.search(this.message, this.page);

      for (const answer of answers) {
        await ctx.reply(answer["title"] as string, ButtonsWithMsg(answer.link as string));
      }

      await ctx.reply("more questions", nextPage());
    }

    if (cbData === "get answer") {
      await ctx.reply("Answer");
    }
  }
}