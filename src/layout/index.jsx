import React from "react";

import styles from "./index.module.scss";

const Layout = ({ children }) => {
  return <div className={styles.page}>{children}</div>;
};

export default Layout;
