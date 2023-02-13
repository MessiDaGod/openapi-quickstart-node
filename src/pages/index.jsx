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

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
  };

  function setRequestInputValue() {
    console.log(document.getElementById("options").value);
    return setRequestInput(document.getElementById("options").value);
  }



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
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      {/* <TopBar items={menu.topBar} />
      <SideMenu items={menu.sideMenu} /> */}
      <OpenApi />
      {/* <Router>
        <TopBar items={menu.topBar} />
        <SideMenu items={menu.sideMenu} />
        <Switch>
          <Route exact path="/" component={() => <OpenApi />} />
          <Route exact path="/about" component={() => <h1>About</h1>} />
          <Route
            exact
            path="/get-started"
            component={() => <h1>Get Started</h1>}
          />
        </Switch>
      </Router> */}
    </div>
  );
}
