import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card/Card";
import Button from "../../components/ui/Button/Button";

import styles from "./randomUsersPage.module.scss";

const RandomUsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchRandomUsers = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=8");
      setUsers((prevUsers) => [...prevUsers, ...response.data.results]);
    } catch (error) {
      console.error("Error fetching random users:", error);
    }
  };

  const handlerClickSavedNavigation = () => {
    navigate("/saved");
  };

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  return (
    <div className={styles.randomUsersPage}>
      <ul className={styles.cards}>
        {users.map((user, index) => (
          <li key={index}>
            <Card user={user} />
          </li>
        ))}
      </ul>
      <div className={styles.more}>
        <Button text="show more" onClick={fetchRandomUsers} />
      </div>
      <div className={styles.saved} onClick={handlerClickSavedNavigation}>
        <img className={styles.image} src={`${process.env.PUBLIC_URL}/images/saved.svg`} alt="saved" />
      </div>
    </div>
  );
};

export default RandomUsersPage;
