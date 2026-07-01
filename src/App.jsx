import { useState, useEffect } from "react";
import OpenAI from "openai";
import { marked } from "marked";
import DOMPurify from "dompurify";

import axios from "axios";

import "./App.css";

function App() {
  const apiCall = () => {
    axios
      .post("http://localhost:8080", {
        messages: [
          {
            role: "system",
            content: `Translate the following text to spanish. 
        Provide the right phonetic pronunciation for each word in English by breaking the words down into simple and common English syllables.
        Some rules:
        - Always format each section with proper headings
        - Each phonetic pronunciation should have its own line
        - When I say phonetics I don't mean the IPA symbols, I mean the English spelling of how to pronounce the word in the specified language
        `,
          },
          {
            role: "user",
            content: query,
          },
        ],
      })
      .then((response) => {
        console.log(response.data);
        const html = marked.parse(response.data);
        const safeHTML = DOMPurify.sanitize(html);
        setResult(safeHTML);
      });
  };
  useEffect(() => {}, []);

  const [query, setQuerey] = useState("");
  const [lang, setLang] = useState("");
  const [result, setResult] = useState("");

  const onClickHandler = async () => {
    console.log(query);
  };
  return (
    <>
      <h1>polygot</h1>
      <input
        type="text"
        placeholder="Enter text"
        onChange={(e) => setQuerey(e.target.value)}
      />
      <button onClick={() => onClickHandler()}>Submit</button>
      <input
        type="checkbox"
        value="French"
        onClick={() => {
          setLang("French");
        }}
      />{" "}
      French
      <input
        type="checkbox"
        value="Spanish"
        onClick={() => {
          setLang("Spanish");
        }}
      />{" "}
      Spanish
      <input
        type="checkbox"
        value="German"
        onClick={() => {
          setLang("German");
        }}
      />{" "}
      German
      <button onClick={apiCall}>Make API Call</button>
      <hr />
      {result && <span>{result}</span>}
    </>
  );
}

export default App;
