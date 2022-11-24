import React, { useState } from 'react';
import { GrAttachment } from "react-icons/gr";
import "./Input.scss";
import ShareModal from '../ShareModal/ShareModal';

const Input = ({ message, setMessage, sendMessage, sendLocation, sendImage }) => {

  const [showModal, setShowModal] = useState(false);

  const onChange = event => setMessage(event.target.value);

  const onKeyPress = event => {
    if (event.key === 'Enter') {
      sendMessage(event);
    }
  };

  const onAttachIconClick = () => setShowModal(!showModal);

  const onLocationClick = () => {
    sendLocation();
    setShowModal(false);
  };

  const onImageUpload = event => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    if (!file) return ;
    reader.onload = e => {
      sendImage(e.target.result);
      setShowModal(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form action="" className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <div className="attach">
        <GrAttachment className="attach__icon" onClick={onAttachIconClick} />
        <div className="attach__modal">
          <ShareModal showModal={showModal} onLocationClick={onLocationClick} onImageUpload={onImageUpload} />
        </div>
      </div>
      <button
        className="sendButton"
        onClick={e => sendMessage(e)}>
        Send
      </button>
    </form>
  )
}

export default Input
