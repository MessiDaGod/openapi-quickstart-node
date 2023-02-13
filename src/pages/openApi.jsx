import Head from "next/head";
import React, { useState, useRef } from "react";
import styles from "./index.module.css";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import thePrompts from "./api/generate";
import Dropdown from "./dropdown";
import CodeEditor from "./codeEditor";

function OpenApi() {

  const [requestInput, setRequestInput] = useState(undefined);
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
  };

  const executeCode = async (code) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  async function onGetInput(event) {
    event.preventDefault();

    setRequestInputValue(document.getElementById("options").value);
    setLoading(true);

    try {
      // setRequestInput(currentPrompt);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ requestText: requestInput }),
      });

      const data = await response.json();

      monacoRef.current.setValue(JSON.stringify(data));
      // if (response.status !== 200) {
      //   throw data.error || new Error(`Request failed with status ${response.status}`);
      // }

      if (response.status !== 200) {
        alert(data.error.message);
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setLoading(false);
      // setResult(data.result);
    } catch (error) {
      // alert(error.message);
      setLoading(false);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ requestText: defaultValue.Value }),
      });

      const data = await response.json();

      // if (response.status !== 200) {
      //   throw data.error || new Error(`Request failed with status ${response.status}`);
      // }

      if (response.status !== 200) {
        alert(data.error.message);
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setLoading(false);
      setResult(data.result);
      setRequestInput("");
    } catch (error) {
      // alert(error.message);
      setLoading(false);
    }
  }

  async function onDropdownChange(e) {
    e.preventDefault();
    console.log()
    document.getElementById("inputField");
    if (e.target.value === "review")
      document.getElementById("inputField").style.display = "none";
  }


  return (
    <main className={styles.main}>
      <h1>ChatGPT</h1>
      <form onSubmit={onSubmit}>
        <input
          id="getInput"
          type="submit"
          value="Submit to ChatGPT"
          disabled={loading}
          onClick={(e) => onGetInput(e)}
        />
      </form>
      <CodeEditor onExecute={() => executeCode(code)} />
    </main>
  );
}

export default OpenApi;
