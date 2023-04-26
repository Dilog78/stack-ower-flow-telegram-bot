import { Injectable } from "@nestjs/common";
import { ResponceAnswer } from "./types/responce.type";

@Injectable()
export class AppService {

  async search(question: string, page: number): Promise<ResponceAnswer[] | string[]> {
    const response: ResponceAnswer[] = [];

    let answers = await this.fetchSearch(true, question, page);

    if (answers.length === 0) {
      answers = await this.fetchSearch(false, question, page);
    }

    if (answers.length === 0) return ["doesnt have answer !"];

    answers.forEach(answer => {
      response.push({
        title: answer.title,
        link: answer.link,
      });
    });
    return response;
  }

  private fetchSearch = async (accepted: boolean, query: string, page: number) => {
    try {
      return fetch(`https://api.stackexchange.com/2.3/search/advanced?page=${page}&pagesize=3&order=asc&sort=relevance&q=${query}&accepted=${accepted}&site=stackoverflow`)
        .then(res => res.json())
        .then(data => data.items);
    } catch (e) {
      console.log(e);
    }
  };
}
