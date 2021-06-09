import fetch from "node-fetch";

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:
      "Bearer BQCXvX111pumwkHLwIL7Hu-I2H-vhdVAgTnIZ3zhqXECBtpq9x-j1OyIpHe3w2CxbJ4YHl7fQ3MM_2iGe3OoO01EJfI-geEsQX1XwY6NKW2-ZC-BGpk39X8uHjQwc5qS9IMsIWw3dgzs5gQODW92aZZQn_EXfYso9Vf23-JDgws"
  }
};

export enum Term {
  Short = "short_term",
  Medium = "medium_term",
  Long = "long_term"
}

const get = async (url: string) => {
  const raw = await fetch(url, options);
  return raw.json();
};

type Song = {
  name: string;
  artists: Array<string>;
};

export const getSongs = async (term: Term): Promise<Array<Song>> => {
  const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${term}&limit=50`;

  let allItems: Array<Song> = [];

  let response = await get(url);
  while (response.next) {
    response = get(response.get);
    allItems = [...allItems, ...response.items];
  }
  return [...allItems, ...response.items].map(({ name, artists }) => {
    return {
      name,
      artists: artists.map(({ name }: any) => name)
    };
  });
};
