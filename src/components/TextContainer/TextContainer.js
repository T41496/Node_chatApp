import React from 'react';
import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.scss';

const TextContainer = ({ users, room }) => (
  <div className="textContainer">
    {
      users
        ? (
          <div style={{color: "#aed9e0"}}>
            <h1>#People chatting in {room} :</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({ name }) => (
                  <div key={name} className="activeItem">
                    <img alt="Online Icon" src={onlineIcon} />
                    <span className="user-name">{name}</span>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;