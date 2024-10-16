import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card/Card";

import styles from "./savedUserPage.module.scss";

const SavedUserPage = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("savedUsers")) || []);
  const navigate = useNavigate();

  const handlerClickHomeNavigation = () => {
    navigate("/");
  };

  const handleDeleteUser = (indexToRemove) => {
    setUsers((prevUsers) => prevUsers.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    localStorage.setItem("savedUsers", JSON.stringify(users));
  }, [users]);

  return (
    <div className={styles.randomUsersPage}>
      {users.length === 0 ? (
        <div className={styles.empty}>No saved users found</div>
      ) : (
        <ul className={styles.cards}>
          {users.map((user, index) => (
            <li key={index}>
              <Card user={user} isSaved={false} onDelete={() => handleDeleteUser(index)} />
            </li>
          ))}
        </ul>
      )}

      <div className={styles.home} onClick={handlerClickHomeNavigation}>
        <img className={styles.image} src={`${process.env.PUBLIC_URL}/images/home.svg`} alt="saved" />
      </div>
    </div>
  );
};

export default SavedUserPage;
