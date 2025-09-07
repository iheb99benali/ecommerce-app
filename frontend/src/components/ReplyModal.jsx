import React, { useContext, useState } from "react";
import { ReplyModalContext } from "../context/ReplyModalContext";

const ReplyModal = () => {
  const {
    message: messageData,
    setMessage,
    setIsOpen,
  } = useContext(ReplyModalContext);

  const [text, setText] = useState(`Dear ${messageData.name}\n`);

  function handleChange(e) {
    const value = e.target.value;
    console.log(value);
    setText(value);
    setMessage((prev) => ({ ...prev, message: value }));
  }
  return (
    <div className="reply-modal-backdrop">
      <div className="reply-modal">
        <h2>Reply</h2>
        <label htmlFor="">subject: </label>
        <input disabled type="text" value={"message subject"} />
        <label htmlFor="">
          to: <input disabled type="text" value={"iheb@gmail.com"} />
        </label>
        <label htmlFor="">Message:</label>
        <textarea name="" id="" value={text} onChange={handleChange}></textarea>
        <div className="reply-modal-actions">
          <button
            className="btn-send"
            onClick={() => {
              alert(messageData);
            }}
          >
            send
          </button>
          <button
            className="btn-cancel"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
