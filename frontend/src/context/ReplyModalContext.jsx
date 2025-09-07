import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ReplyModalContext = createContext();

const ReplyModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();
  const [text, setText] = useState();

  return (
    <ReplyModalContext.Provider
      value={{
        message,
        setMessage,
        isOpen,
        setIsOpen,
        text,
        setText,
      }}
    >
      {children}
    </ReplyModalContext.Provider>
  );
};

export default ReplyModalProvider;
