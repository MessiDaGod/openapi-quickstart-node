import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import React, { useState, useRef } from "react";
import styles from "./index.module.css";

const CodeEditor = () => {
  const monacoRef = useRef(null);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const defaultValue="\n\n\n\n\n\n\n\n\n\n\n\n\n\n";

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
      defaultLanguage="txt"
      defaultValue={defaultValue}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
    />
  );
};
export default CodeEditor;
