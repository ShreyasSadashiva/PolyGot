import { useState, useEffect } from "react";
import OpenAI from "openai";

import "./App.css";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_AI_KEY,
  baseURL: import.meta.env.VITE_AI_URL,
  dangerouslyAllowBrowser: true,
});
function App() {
  useEffect(() => {}, []);

  const [query, setQuerey] = useState("");

  const onClickHandler = async () => {
    console.log(query);
    const response = await openai.chat.completions.create({
      model: import.meta.env.VITE_AI_MODEL,
      messages: [
        {
          role: "system",
          content: `Translate the following text to French, Spanish, and German. Return the result in a JSON format with keys "French", "Spanish", and "German".`,
        },
        {
          role: "user",
          content: query,
        },
      ],
    });
    console.log(response.choices[0].message.content);
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
    </>
  );
}

export default App;
