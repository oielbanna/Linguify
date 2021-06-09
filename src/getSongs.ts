import fetch from "node-fetch";
import Crawler from "crawler";
export enum Term {
  Short = "short_term",
  Medium = "medium_term",
  Long = "long_term"
}

const _fetch = async (url: string, options: Object) => {
  const response = await fetch(url, options);
  console.log(response);
  if (response.status >= 200 && response.status <= 399) return response.json();
  else return {};
};

type Song = {
  name: string;
  artists: Array<string>;
};

export const getSongs = async (term: Term): Promise<Array<Song>> => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer BQCqRkuMd1AeIYqvBTJ0jW0ZAUcM2ZCuqsjfenL447NySckAzhOKqvQ8GkGOJRW7YH_OoucqiNidEuKFMqKWa7lpXBrVxz2bdDz5NGGNnDJk7yl2YpwSLNN6_JlLxhV7oBvhu2ZD2fwn9PzlX0f6BCj90UkhqijYNucIvgHpjBI"
    }
  };
  const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${term}&limit=50`;

  let response = await _fetch(url, options);
  if (!response.items) return [];

  return response.items.map(({ name, artists }: any) => {
    return {
      name,
      artists: artists.map(({ name }: any) => name)
    };
  });
};

export const getLyrics = async (songs: Array<Song>) => {
  const url = "https://genius.com/search?q=";
  const options = {
    method: "GET",
    mode: "no-cors"
  };

  // let c = new Crawler({
  //   mode: "no-cors",
  //   maxConnections: 10,
  //   rateLimit: 3000, // `maxConnections` will be forced to 1
  //   // This will be called for each crawled page
  //   callback: function (error, res, done) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       var $ = res.$;
  //       // $ is Cheerio by default
  //       //a lean implementation of core jQuery designed specifically for the server
  //       console.log($("title").text());
  //     }
  //     done();
  //   }
  // });
  const allLyrics = [];
  const allRequests: Array<any> = [];
  songs.forEach(({ name }) => {
    const genuisLyrics = _fetch(`${url}${encodeURIComponent(name)}`, options);
    allRequests.push(genuisLyrics);
    // // c.queue(`${url}${encodeURIComponent(name)}`);
    // c.queue("http://www.google.com");
  });

  const responses = await Promise.all(allRequests);
  console.log(responses);
  return allLyrics;
};
