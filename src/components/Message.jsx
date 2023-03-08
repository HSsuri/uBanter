import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import DownloadIcon from '@mui/icons-material/Download';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const getMessageTime = () => {
    const timenum = message.date;
    const lastMessage = new Date(
      timenum.seconds * 1000 + timenum.nanoseconds / 10000
    );
    var today = new Date();
    if (today.toLocaleDateString() === lastMessage.toLocaleDateString()) {
     if (Number(lastMessage) >= Number(today)) 
        return "Just Now";
      else return lastMessage.toLocaleTimeString();
    } else return lastMessage.toLocaleDateString();
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span style={{color:"white"}}>{getMessageTime()}</span>
      </div>
      <div className="messageContent">
        {(message.img && message.text!=="") && <p>{message.text}</p>}
        {(!(message.img) ) && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
        {message.img && <a href={message.img} download target="_blank"><DownloadIcon /></a>}
      </div>
    </div>
  );
};

export default Message;