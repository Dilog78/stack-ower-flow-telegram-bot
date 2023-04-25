import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {

  async search(question: string): Promise<string[] | string>  {
    const response = [];

    let answer = await this.fetchSearch(true, question);

    if (answer.items.length === 0) {
      answer = await this.fetchSearch(false, question);
    }

    if (answer.items.length === 0) return "doesnt have answer !";

    for (let i = 0; i < answer.items.length; i++) {
      response.push(answer.items[i].link);
    }

    return response;
  }

  private fetchSearch = async (accepted: boolean, query: string) => {
    return await fetch(`https://api.stackexchange.com/2.3/search/advanced?pagesize=5&order=asc&sort=relevance&q=${query}&accepted=${accepted}&site=stackoverflow`)
      .then(res => res.json())
      .catch(err => console.log(err));
  };
}
