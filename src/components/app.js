import React from "react";
import Timer from "./timer";

import styles from "./app.module.scss";

function App() {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Timer />
      </div>
    </div>
  );
}

export default App;
