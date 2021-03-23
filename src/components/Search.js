import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("programming");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    // async option 1 - react recommends
    // const search = async()=>{await axios.get(';;;';)};
    // search();
    //
    // async option 2
    // (async()=>{await axios.get(';;;';)})();
    //
    // async option 3 - use normal promises
    // axios.get(';;;').then((response)=>{ do work })
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedTerm,
        },
      });

      setResults(data.query.search);
    };
    search();
  }, [debouncedTerm]);

  // sensing changes in term so that different search triggers can be used
  //
  // 3 configurations:
  //
  // #1. empty array as second arg
  // Run at initial render
  //
  // #2. no second arg (not very commonly used)
  // Run at initial render, run after every rerender
  //
  // #3. array with data as a second arg
  // Run at initial render
  // Run after every rerender IF data has changed since last rerender
  //
  // NOTE second arg can have multiple state elements
  // NOTE useEffect can't be marked as async
  //

  //   useEffect(() => {
  //     if (term && !results.length) {
  //       search();
  //     } else {
  //       const timeoutId = setTimeout(() => {
  //         if (term) {
  //           search();
  //         }
  //       }, 500);

  //       // clean up function run before next invocation of useEffect()
  //       return () => {
  //         clearTimeout(timeoutId);
  //       };
  //     }
  //   }, [term, results.length]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }} />
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          ></input>
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
