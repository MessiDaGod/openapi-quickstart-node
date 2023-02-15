import Head from "next/head";
import React, { useState } from "react";
import styles from "./index.module.css";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import thePrompts from "./api/generate";
import Dropdown from "./dropdown";
import CodeEditor from "./codeEditor";
import menu from "../../public/menu.json";
import OpenApi from "./openApi";
import TopBar from "./TopBar";
import RegisterPage from "./registerPage";

export default function Home() {
  const [requestInput, setRequestInput] = useState(undefined);
  const [result, setResult] = useState();
  const [dropdown, setDropdown] = useState();

  // const monacoRef = useRef(null);

  async function onDropdownChange(e) {
    e.preventDefault();
    console.log();
    document.getElementById("inputField");
    if (e.target.value === "review")
      document.getElementById("inputField").style.display = "none";
  }

  return (
    <div>
      <Head>
        <style>{`
          :root {
            --bg-color: #0d1117;
          }
          body {
            background-color: var(--bg-color);
            margin: 0 auto;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
        `}</style>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <RegisterPage />
    </div>
  );
}