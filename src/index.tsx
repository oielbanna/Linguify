import { render } from "react-dom";
import App from "./App";
import { getSongs, getLyrics, Term } from "./getSongs";

getSongs(Term.Medium).then((response: any) => {
  getLyrics(response.splice(0, 2));
});

const rootElement = document.getElementById("root");
render(<App />, rootElement);
