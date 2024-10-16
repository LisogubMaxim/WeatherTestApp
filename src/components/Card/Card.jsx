import React, { useState } from "react";

import Button from ".././ui/Button/Button";
import Modal from "../ui/Modal/Modal";

import styles from "./card.module.scss";

const Card = ({ user, isSaved = true, onDelete = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const { picture, name, gender, location, email } = user;

  const handlerCloseModal = () => {
    setIsOpen(false);
  };

  const handlerOpenModal = () => {
    setIsOpen(true);
  };

  const handleClickSaveButton = () => {
    setIsActive(false);
    const existingUsers = JSON.parse(localStorage.getItem("savedUsers")) || [];
    const updatedUsers = [...existingUsers, user];
    localStorage.setItem("savedUsers", JSON.stringify(updatedUsers));
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.information}>
          <div className={styles.image}>
            <img src={picture.medium} alt="profile" />
          </div>
          <h3>{`${name.title} ${name.first} ${name.last}`}</h3>
          <p>Gender: {gender}</p>
          <p>Location: {`${location.city}, ${location.country}`}</p>
          <p>Email: {email}</p>
        </div>
        <div className={styles.buttons}>
          {isSaved ? (
            <Button text="save" isActive={isActive} onClick={handleClickSaveButton} />
          ) : (
            <Button text="delete" onClick={onDelete} />
          )}
          <Button text="weather" onClick={handlerOpenModal} />
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handlerCloseModal} location={location} picture={picture} />
    </>
  );
};

export default Card;
