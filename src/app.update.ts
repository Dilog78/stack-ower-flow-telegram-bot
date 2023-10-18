import { Ctx, On, InjectBot, Start, Update, Message } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { AppService } from "./app.service";
import nextPage from "./buttons/pagination.button";
import ButtonsWithMsg from "./buttons/message.buttons";
import { ApiStackOverflow } from "./api/api.stackoverflow";


@Update()
export class AppUpdate {

  private page: number;
  private message: string;

  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
    private readonly apiStackOverFlow: ApiStackOverflow
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

    const questions = await this.appService.search(msg, this.page);
    
    if (typeof questions[0] != 'object') {
      ctx.reply(questions[0]);
      return;
    }

    for (const question of questions) {
      await ctx.reply(question["title"] as string, ButtonsWithMsg(question.link as string, question["question_id"]));
    }

    await ctx.reply("more questions", nextPage());
    return
  }

  @On("callback_query")
  async nextPage(@Ctx() ctx: Context) {
    const cbData: string = await ctx.callbackQuery["data"];

    if (cbData === "pagination") {
      this.page = this.page + 1;

      const questions = await this.appService.search(this.message, this.page);

      if (typeof questions[0] != 'object') {
      ctx.reply(questions[0]);
      return;
    }

      for (const question of questions) {
        await ctx.reply(question["title"] as string, ButtonsWithMsg(question.link as string, question["question_id"]));
      }

      await ctx.reply("more questions", nextPage());
      return 
    }

    const answers = await this.apiStackOverFlow.getAnswers(+cbData);
    for (const answer of answers) {
      await ctx.reply(answer['body_markdown'])
    }
    return
  }
}