import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
// import { Connection } from "tedious";

// var Connection = require('tedious').Connection;

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [ropdown, setDropdown] = useState();

  // var config = {
  //   server: "192.168.1.244",
  //   authentication: {
  //     type: 'default',
  //     options: {
  //       userName: 'sa',
  //       password: 'log-onCp9'
  //     }
  //   },
  //   options: {
  //     encrypt: false,
  //     database: 'mac'
  //   }
  // };
  // var connection = new Connection(config);
  // // connection.on('connect', function (err) {
  // //   // If no error, then good to proceed.
  // //   console.log("Connected");
  // // });

  // // connection.connect();

  // connection.connect((err) => {
  //   if (err) {
  //     console.log('Connection Failed');
  //     throw err;
  //   }

  //   executeStatement();
  // });

  // function executeStatement() {
  //   const request = new Request('select TOP 1 * from ErrorsEtl ORDER BY Id DESC', (err, rowCount) => {
  //     if (err) {
  //       throw err;
  //     }

  //     console.log('DONE!');
  //     connection.close();
  //   });

  //   // Emits a 'DoneInProc' event when completed.
  //   request.on('row', (columns) => {
  //     columns.forEach((column) => {
  //       if (column.value === null) {
  //         console.log('NULL');
  //       } else {
  //         console.log(column.value);
  //       }
  //     });
  //   });

  //   request.on('done', (rowCount) => {
  //     console.log('Done is called!');
  //   });

  //   request.on('doneInProc', (rowCount, more) => {
  //     console.log(rowCount + ' rows returned');
  //   });

  //   // In SQL Server 2000 you may need: connection.execSqlBatch(request);
  //   connection.execSql(request);
  // }

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    };

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
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setLoading(false);
      setResult(data.result);
      setAnimalInput("");
    } catch (error) {
      // alert(error.message);
      setLoading(false);
    }
  }

  async function onDropdownChange(e) {
    console.log("option changed to " + e.target.value);
    document
      .getElementById("inputField")
      .addEventListener("onchange", function (event) {
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
        <h3>OpenAPI Testing</h3>
        <label htmlFor="options">Choose a Prompt:</label>
        <br />

        <select name="options" id="options" onChange={(e) => onDropdownChange(e)}>
          <option value="analogy">Analogy</option>
          <option value="animal">Animal Name</option>
        </select>
        <br />
        <div>
          <form className={"hide"} onSubmit={onSubmit}>
            <input
              id="inputField"
              type="text"
              name="animal"
              placeholder="Enter an animal"
              value={animalInput}
              onChange={(e) => setAnimalInput(e.target.value)}
            />
            <input
              id="submitInput"
              type="submit"
              value="Submit"
              disabled={loading}
              onClick={(e) => onSubmit(e)}
            />
          </form>
        </div>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
