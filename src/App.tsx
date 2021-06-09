import React from "react";
import "./styles.css";
import { getLyrics, getSongs, Term } from "./getSongs";

export default function App() {
  const [top, setTop] = React.useState([]);
  React.useEffect(() => {
    // getSongs(Term.Medium).then((response: any) => {
    //   setTop(response);
    // });
  }, [top]);

  // React.useEffect(() => {
  //   getLyrics([top[0]]);
  // }, [top]);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <ul>
        {/* {top.map(({ name, artists }) => (
          <li key={name}>
            {name}, {artists}
          </li>
        ))} */}
      </ul>
    </div>
  );
}
