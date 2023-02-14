import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import React, { useState, useRef } from "react";
import styles from "./codeEditor.module.css";


const CodeEditor = () => {
  const monacoRef = useRef(null);
  const defaultValue="\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
  const [code, setCode] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState(defaultValue);

  function handleEditorWillMount(monaco) {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  function handleEditorDidMount(editor, monaco) {
    monacoRef.current = editor;
    monacoRef.current.setValue(currentPrompt);
  }

  const handleExecute = () => {
    setCode(editorRef.current.getValue());
  };


  return (
    <Editor
      width="90%"
      height="50vh"
      defaultLanguage="txt"
      automaticLayout={true}
      defaultValue={defaultValue}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
    />
  );
};
export default CodeEditor;
