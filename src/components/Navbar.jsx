import React from "react";
import logo from "../assets/img/logo.svg";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <img src={logo} alt='logo' className={styles.logo} />
    </div>
  );
}
