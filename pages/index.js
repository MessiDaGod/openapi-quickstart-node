import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();

      // if (response.status !== 200) {
      //   throw data.error || new Error(`Request failed with status ${response.status}`);
      // }

      if (response.status !== 200) {
        alert(data.error.message);
      }

      setLoading(false);
      setResult(data.result);
      setAnimalInput("");
    } catch (error) {
      alert(error.message);
      setLoading(false);
      return;
    }
  }

  async function onInputChange(event) {
    document.getElementById("inputField").addEventListener("onchange", function (event) {
      event.preventDefault();
      if (animalInput.trim().length > 0) {
        setLoading(false);
      }
    });
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input id="inputField"
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input id="submitInput" type="submit" value="Generate names" disabled={loading}
            onClick={(e) => onSubmit(e)} />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
