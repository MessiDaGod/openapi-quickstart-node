import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import React, { useState, useRef } from "react";
import styles from "./index.module.css";

const CodeEditor = () => {
  const monacoRef = useRef(null);
  const [currentPrompt, setCurrentPrompt] = useState("");

  function handleEditorWillMount(monaco) {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  function handleEditorDidMount(editor, monaco) {
    monacoRef.current = editor;
    monacoRef.current.setValue(JSON.stringify(currentPrompt));
  }

  return (
    <Editor
      height="20vh"
      defaultLanguage="json"
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
    />
  );
};
export default CodeEditor;
