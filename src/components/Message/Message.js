import React from 'react';
import ReactEmoji from "react-emoji";

import "./Message.scss";

const Message = ({ message: { user, text, url, isLocation, isImage, image }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser ? (
      <div className="messageContainer justifyEnd">
        <p className="sentText pr-10">{trimmedName}</p>
        <div className={!isImage ? "messageBox backgroundOrange": ""}>
          {isLocation &&
            <a href={url} target="_blank" rel="noopener noreferrer" className="messageText location colorWhite" >{user}'s location</a>}
          {isImage && <img className="image-message" src={image} alt="user-image" />}
          {!isLocation && !isImage && <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>}
        </div>
      </div>
    ) : (
        <div className="messageContainer justifyStart">
          <div className={!isImage ? "messageBox backgroundLight": ""}>
            {isLocation &&
              <a href={url} target="_blank" rel="noopener noreferrer" className="messageText location colorDark" >{user}'s location</a>}
            {isImage && <img className="image-message" src={image} alt="user-image" />}
            {!isLocation && !isImage && <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>}
          </div>
          <p className="sentText pl-10">{user}</p>
        </div>
      )
  )
}

export default Message
