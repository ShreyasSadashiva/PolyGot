import { useState, useEffect } from "react";
import OpenAI from "openai";
import { marked } from "marked";
import DOMPurify from "dompurify";

import axios from "axios";

/* Material UI */
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

import "./App.css";

function App() {
  const apiCall = () => {
    axios
      .post("http://localhost:8080", {
        messages: [
          {
            role: "system",
            content: `Translate the following text to ${lang}. 
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
      <TextField
        id="outlined-multiline-static"
        label="Enter your Text here"
        multiline
        rows={4}
        onChange={(e) => setQuerey(e.target.value)}
      />

      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label="Spanish"
          onClick={() => {
            setLang("Spanish");
          }}
        />
        <FormControlLabel
          control={<Checkbox />}
          onClick={() => {
            setLang("French");
          }}
          label="French"
        />
        <FormControlLabel
          control={<Checkbox />}
          onClick={() => {
            setLang("German");
          }}
          label="German"
        />
      </FormGroup>
      <Button variant="contained" onClick={apiCall}>
        Make API Call
      </Button>
      <hr />
      {result && <span dangerouslySetInnerHTML={{ __html: result }} />}
    </>
  );
}

export default App;
