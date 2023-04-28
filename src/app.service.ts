import { Injectable } from "@nestjs/common";
import { ResponceAnswer } from "./types/responce.type";
import { ApiStackOverflow } from "./api/api.stackoverflow";

@Injectable()
export class AppService {
  constructor(private readonly apiStackOverFlow: ApiStackOverflow) {
  }

  async search(question: string, page: number): Promise<ResponceAnswer[] | string[]> {
    const response: ResponceAnswer[] = [];

    let answers: [] = await this.apiStackOverFlow.fetchSearch(true, question, page);

    if (answers.length === 0) {
      answers = await this.apiStackOverFlow.fetchSearch(false, question, page);
    }

    if (answers.length === 0) return ["doesnt have answer !"];

    answers.forEach(({ title, link, question_id }) => {
      response.push({
        title,
        link,
        question_id
      });
    });
    return response;
  }
}
