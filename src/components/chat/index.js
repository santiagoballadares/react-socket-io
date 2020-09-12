import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Paper, TextField } from "@material-ui/core";
import {
  subscribeToReceiveMessage,
  publishToSendMessage,
} from "../../services/socketioApi";
import { createMessage } from "./utils";

import styles from "./index.module.scss";

const Title = ({ label }) => {
  return <span className={styles.title}>{label}</span>;
};

const Username = ({ label, value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.username}>
      <TextField
        fullWidth
        label={label}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

const MessagesList = () => {
  const refContainer = useRef(null);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    subscribeToReceiveMessage((message) =>
      setMessages((prevMessages) => [...prevMessages, message])
    );
  }, []);

  useEffect(() => {
    if (refContainer.current) {
      refContainer.current.scrollTop = refContainer.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container ref={refContainer} maxWidth="md" className={styles.messagesList}>
      {messages.map((message) => (
        <div key={message.time}>
          {message.from}: {message.text}
        </div>
      ))}
    </Container>
  );
};

const Actions = ({ username }) => {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    publishToSendMessage(createMessage(username, message));
    setMessage("");
  };

  return (
    <div className={styles.actions}>
      <TextField
        fullWidth
        multiline
        rows={1}
        rowsMax={3}
        value={message}
        onChange={handleChange}
        variant="outlined"
      />
      <Button
        className={styles.sendBtn}
        variant="contained"
        color="primary"
        onClick={handleClick}
        disabled={!message}
      >
        Send
      </Button>
    </div>
  );
};

const Chat = () => {
  const [username, setUsername] = useState("");

  return (
    <Paper className={styles.root}>
      <Title label="Chat" />
      <Username label="Username" value={username} onChange={setUsername} />
      <MessagesList />
      <Actions username={username} />
    </Paper>
  );
};

export default Chat;
