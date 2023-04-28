export class ApiStackOverflow {

  fetchSearch(accepted: boolean, query: string, page: number): Promise<[]> {
    try {
      return fetch(`https://api.stackexchange.com/2.3/search/advanced?page=${page}&pagesize=3&order=asc&sort=relevance&q=${query}&accepted=${accepted}&site=stackOverflow`)
        .then(res => res.json())
        .then(data => data.items);
    } catch (e) {
      console.log(e);
    }
  };

  getAnswers(id: number): Promise<[]> {
    try {
      return fetch(`https://api.stackexchange.com/2.3/questions/${id}/answers?order=desc&sort=activity&site=stackOverflow&filter=!nOedRLr0_Q`)
        .then(res => res.json())
        .then(data => data.items)
    } catch (e) {
      console.log(e);
    }
  }
}

