import { useState, useEffect } from "react";
import OpenAI from "openai";
import { marked } from "marked";
import DOMPurify from "dompurify";

import "./App.css";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_AI_KEY,
  baseURL: import.meta.env.VITE_AI_URL,
  dangerouslyAllowBrowser: true,
});
function App() {
  useEffect(() => {}, []);

  const [query, setQuerey] = useState("");
  const [lang, setLang] = useState("");
  const [result, setResult] = useState("");

  const onClickHandler = async () => {
    console.log(query);
    const response = await openai.chat.completions.create({
      model: import.meta.env.VITE_AI_MODEL,
      messages: [
        {
          role: "system",
          content: `Translate the following text to ${lang}. 
          Provide the right phonetic pronunciattion for each word in english but breaking the words down into simple and common englist syllables.
          some rules:
          - Always format each section with proper headings
          - Each phonetic pronunciation should have it's own line
          - When i say phonetics i don't mean the IPA symbols, i mean the english spelling of how to pronounce the word in the specified language
          `,
        },
        {
          role: "user",
          content: query,
        },
      ],
    });
    console.log(response.choices[0].message.content);
    const html = marked.parse(response.choices[0].message.content);
    const safeHTML = DOMPurify.sanitize(html);
    setResult(safeHTML);
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
      {result && <span>{result}</span>}
    </>
  );
}

export default App;
