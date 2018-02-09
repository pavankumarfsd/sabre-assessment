const URL = "https://api.github.com/search/users";
export class SearchService {


    constructor() {}

    fetchData(query) {
        return fetch(`${ URL }?q=${ query }`).then(res => res.json());
    }
}