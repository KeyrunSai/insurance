import '../styling/Header.css';
import React from 'react';

function Header(props) {

  const handleClick = () => {
    if(props.loginEmail !== undefined && props.loginEmail.length > 0) {
      localStorage.clear();
      window.location.reload();
    }
  }

  return (
      <div className="content">
        <div className="content-1">
          <div className="content-signin" onClick={handleClick}>{props.loginEmail ? 'Logout' : ''}</div><br/>
          <a href="/quote" target="_self">
            &lt; QOVER.ME
          </a>
        </div>
        <div className="content-2">
          Welcome <b>{props.loginEmail ? props.loginEmail : 'User'}</b>
        </div>
      </div>
  )
}

export default Header;