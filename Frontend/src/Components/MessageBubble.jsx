import React from "react";

export default function MessageBubble({ message }) {

  const isUser = message.role === "user";

  return (
    <div className={isUser ? "user-row" : "bot-row"}>
      <div className={isUser ? "user-bubble" : "bot-bubble"}>
        {message.text}
      </div>
    </div>
  );
}