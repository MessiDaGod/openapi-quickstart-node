import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import React, { useState, useRef } from "react";
import styles from "./index.module.css";

const CodeEditor = () => {
  const monacoRef = useRef(null);
  const defaultValue="\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
  const [currentPrompt, setCurrentPrompt] = useState(defaultValue);

  function handleEditorWillMount(monaco) {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  function handleEditorDidMount(editor, monaco) {
    monacoRef.current = editor;
    monacoRef.current.setValue(currentPrompt);
  }

  return (
    <Editor
      height="20vh"
      defaultLanguage="txt"
      automaticLayout={true}
      defaultValue={defaultValue}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
    />
  );
};
export default CodeEditor;
