import Head from "next/head";
import React, { useState } from "react";
import styles from "./index.module.css";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import thePrompts from "./api/generate";
import Dropdown from "./dropdown";
import CodeEditor from "./codeEditor";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import SwaggerUI from "swagger-ui-react";
// import "swagger-ui-react/swagger-ui.css";
// import TopBar from "./TopBar";
// import SideMenu from "./SideMenu";
// import { openapi } from "./api/openapi.json";
import menu from "../../public/menu.json";
import OpenApi from "./openApi";


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
          }
        `}</style>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <OpenApi />
    </div>
  );
}
