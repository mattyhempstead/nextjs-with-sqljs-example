'use client';

import { useEffect, useState } from "react";
import initSqlJs from "sql.js";
import styles from "../styles/Home.module.css";

export default function Page() {
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [execResults, setExecResults] = useState(null);

  useEffect(() => {
    initSqlJs({
      // Fetch sql.js wasm file from CDN
      // This way, we don't need to deal with webpack
      locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/${file}`
    })
      .then((SQL) => setDb(new SQL.Database()))
      .catch((err) => setError(err));
  }, []);

  const exec = (sql) => {
    try {
      const results = db.exec(sql);
      setExecResults(results);
      setError(null);
    } catch (err) {
      setExecResults(null);
      setError(err);
    }
  };

  const ResultTable = ({ columns, values }) => {
    return (
      <table>
        <thead>
          <tr>
            {columns.map((columnName) => (
              <td key={columnName}>{columnName}</td>
            ))}
          </tr>
        </thead>

        <tbody>
          {values.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, cellIndex) => (
                <td key={cellIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return db ? (
    <div className={styles.container}>
      <h1>Next.js SQL interpreter</h1>

      <textarea
        onChange={(e) => exec(e.target.value)}
        placeholder='Enter some SQL. No inspiration ? Try "select sqlite_version()"'
        className={styles.codeBox}
      />

      <pre className={styles.error}>{(error || "").toString()}</pre>

      <pre>
        {execResults
          ? execResults.map((execResult, rIndex) => (
              <ResultTable
                key={rIndex}
                columns={execResult.columns}
                values={execResult.values}
              />
            ))
          : ""}
      </pre>
    </div>
  ) : (
    <pre>Loading...</pre>
  );
}
