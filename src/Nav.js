import React, { useEffect, useState } from "react";
import './Nav.css'

function Nav() {
    const [show,handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll',()=>{
            if(window.scrollY > 100){
                handleShow(true)
            }
            else handleShow(false);
        })
        return ()=>{
            window.removeEventListener('scroll')
        }
    }, [])
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://www.logo.wine/a/logo/Netflix/Netflix-Logo.wine.svg"
        alt="Netflix logo"
      />
      <img
        className="nav_avatar"
        src="https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png"
        alt="Netflix Avatar"
      />
    </div>
  );
}

export default Nav;
