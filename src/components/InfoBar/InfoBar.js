import React from 'react';
import "./InfoBar.scss";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";

const InfoBar = React.memo(({ room }) => {

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/" ><img src={closeIcon} alt="close" /></a>
      </div>
    </div>
  )
});

export default InfoBar
