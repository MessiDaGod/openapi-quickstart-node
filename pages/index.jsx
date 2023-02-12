import Head from "next/head";
import React, { useState, useRef } from "react";
import styles from "./index.module.css";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import thePrompts from "./api/generate";
import Dropdown from "./dropdown";
import CodeEditor from "./codeEditor";

export default function Home() {
  const [requestInput, setRequestInput] = useState(undefined);
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState();

  const monacoRef = useRef(null);

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
  };

  function setRequestInputValue() {
    console.log(document.getElementById("options").value);
    return setRequestInput(document.getElementById("options").value);
  }

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
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>OpenAPI Testing</h3>

        <label htmlFor="options">Choose a Prompt:</label>
        <br />
        <form onSubmit={onSubmit}>
          <input
            id="getInput"
            type="submit"
            value="Get Prompt"
            disabled={loading}
            onClick={(e) => onGetInput(e)}
          />
        </form>
        <br />
        <Dropdown /><br />
        <CodeEditor />
      </main>
    </div>
  );
}
