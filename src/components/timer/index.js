import React, { useState, useEffect } from "react";
import moment from "moment";
import { subscribeToTimer } from "../../services/socketioApi";

import styles from "./index.module.scss";

const MINUTE_INTERVAL = 1000 * 60;
const TIME_FORMAT = "MMMM Do YYYY, h:mm a";

const Timer = () => {
  const [timestamp, setTimestamp] = useState();

  useEffect(() => {
    subscribeToTimer(MINUTE_INTERVAL, (err, timestamp) =>
      setTimestamp(timestamp)
    );
  }, []);

  return (
    <div className={styles.root}>{moment(timestamp).format(TIME_FORMAT)}</div>
  );
};

export default Timer;
