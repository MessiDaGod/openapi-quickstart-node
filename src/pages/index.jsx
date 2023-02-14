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
import Register from "./registerPage";

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
        }
        .m-5-auto {
            margin: 5rem auto
        }

        .primary-button {
            margin-top: 5rem;
            margin-right: 1rem;
            padding: .6rem;
            width: 10rem;
            background: #222;
            border: none;
            color: #fff;
            font-size: 1.2rem;
            transition: all .5s;
            cursor: pointer;
            text-transform: capitalize
        }


        .main-title,
        .main-para {
            color: #f1f1f1
        }

        .main-title {
            padding-top: 10rem;
            font-size: 5rem;
            font-family: 'Fascinate', cursive;
            text-transform: uppercase
        }

        .main-para {
            font-size: 2.5rem;
            text-Transform: capitalize
        }

        #reg_btn span {
            display: inline-block;
            position: relative;
            transition: 0.5s;
        }

        #reg_btn span:after {
            position: absolute;
            opacity: 0;
            top: 0;
            right: -20px;
            transition: 0.5s;
        }

        #reg_btn:hover span {
          padding-right: 25px;
        }

        #reg_btn:hover span:after {
          opacity: 1;
          right: 0;
        }

        h2 {
            font-weight: 300
            color: #eee;
        }

        form {
            display: inline-block;
            background: var(--bg-color);
            border: 1px solid #eee;
            border-radius: 2px;
            padding: 2rem;
            margin: 2rem 0 1rem 0
        }

        form label {
            float: left;
            font-size: .9rem;
            margin: 0;
            padding: 0
        }

        .right-label {
            float: right;
            cursor: pointer
        }

        input {
            width: 15rem;
            padding: .3rem;
            border-radius: 5px;
            outline: none;
            border: none
        }

        #sub_btn {
            display: block;
            width: 100%;
            padding: .3rem;
            border: none;
            background: #222;
            color: #fff;
            border-radius: 3px;
        }

        #sub_btn:hover {
            background: #333;
            transition: all .5s
        }

        footer p {
            margin: 0;
            font-size: .9rem
        }


        #checkbox {
            width: 1rem
        }

        form span {
            font-size: .8rem
        }

        #reset_pass_lbl {
            float: left
        }

        .home-page-title {
            color: #222
        }
          }
        `}</style>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      {/* <TopBar />
      <OpenApi /> */}
      <Register />
    </div>
  );
}
