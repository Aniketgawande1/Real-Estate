import React from "react";
import logo from "/logo.png";
import './Header.css'
// import 'src/index.css'

const Header = () => {
  return (
    <section className="h-wrapper">
      <div className="flexCenter h-container">
        <img src={logo} alt="logo" width={100} />

        <div className="h-menu flexCenter">
  <a href="#">Residence</a>
  <a href="#">Our Value</a>
  <a href="#">Contact Us</a>
  <a href="#">Get Started</a>
  <button className="button">
    <a href="#">Contact</a>
  </button>
</div>

      </div>
    </section>
  );
};

export default Header;
