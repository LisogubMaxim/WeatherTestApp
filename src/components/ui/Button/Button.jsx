import React from "react";

import styles from "./button.module.scss";

const Button = ({ onClick, text, isActive = true }) => {
  return (
    <div className={`${styles.button} ${isActive ? styles.active : styles.inactive}`} onClick={onClick}>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Button;
