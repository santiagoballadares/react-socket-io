import React from "react";
import Timer from "./timer";
import Chat from "./chat";

import styles from "./app.module.scss";

function App() {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Timer />
      </div>
      <div className={styles.content}>
        <Chat />
      </div>
    </div>
  );
}

export default App;
