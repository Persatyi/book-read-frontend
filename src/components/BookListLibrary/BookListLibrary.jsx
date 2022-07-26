import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { isAuth } from "redux/auth";
import { useBooksQuery } from "redux/api/bookAPI";
import { useToggle } from "hooks";
import useTranslation from "hooks/useTranslation";
import { ModalBookReview } from "components/Modals";

import Loader from "components/Loader";
import TitleRead from "./TitleRead/TitleRead";
import TitleReading from "./TitleReading/TitleReading";
import Rating from "components/Rating";
import Button from "components/Button";

import spriteSvg from "assets/images/sprite.svg";
import s from "./BookListLibrary.module.scss";

export default function BookListLibrary() {
  const [book, setBook] = useState("");
  const [openModal, toggleModal] = useToggle();
  const auth = useSelector(isAuth);
  const { data = [], isFetching } = useBooksQuery(null, { skip: !auth });
  const { t } = useTranslation("BookListLibrary");
  if (isFetching) return <Loader />;
  // <div className={s.loadingWrapper}>
  //   <div className={s.loadingSpinner} />
  // </div>
  const status = (e) => {
    const status = data.some((item) => item.status === e);
    return status;
  };
  return (
    <>
      {status("read") && (
        <div className={s.booksWrapper}>
          <h2 className={s.booksTitle}>{t.read}</h2>
          <TitleRead />
          <ul className={s.readList}>
            {data.map(
              (item) =>
                item.status === "read" && (
                  <li key={item._id} className={s.readItem}>
                    <ul className={s.readBookList}>
                      <li className={s.readBookItem}>
                        <svg className={s.readBookIcon}>
                          <use href={`${spriteSvg}#icon-read`} />
                        </svg>
                        <p className={s.readBookItemTitle}>{item.title}</p>
                      </li>
                      <li className={s.readBookItem}>
                        <span className={s.readBookItemCategory}>
                          {t.author}:
                        </span>
                        <p className={s.readBookItemText}>{item.author}</p>
                      </li>
                      <li className={s.readBookItem}>
                        <span className={s.readBookItemCategory}>
                          {t.year}:
                        </span>
                        <p className={s.readBookItemText}>{item.year}</p>
                      </li>
                      <li className={s.readBookItem}>
                        <span className={s.readBookItemCategory}>
                          {t.pages}:
                        </span>
                        <p className={s.readBookItemText}>{item.pages}</p>
                      </li>
                      <li className={s.readBookItem}>
                        <span className={s.readBookItemCategory}>
                          {t.rating}:
                        </span>
                        <Rating mark={item.rating} />
                      </li>
                      <li>
                        <Button
                          onClick={() => {
                            setBook(item);
                            toggleModal();
                          }}
                          className={s.readBookButton}
                          styleType="secondary"
                          text={t.resume}
                        />
                      </li>
                    </ul>
                  </li>
                )
            )}
          </ul>
        </div>
      )}

      {status("reading") && (
        <div className={s.booksWrapper}>
          <h2 className={s.booksTitle}>{t.reading}</h2>
          <TitleReading />
          <ul className={s.readingList}>
            {data.map(
              (item) =>
                item.status === "reading" && (
                  <li key={item._id} className={s.readingItem}>
                    <ul className={s.readingBookList}>
                      <li className={s.readingBookItem}>
                        <svg className={s.readingBookIcon}>
                          <use href={`${spriteSvg}#icon-reading`} />
                        </svg>
                        <p className={s.readingBookItemTitle}>{item.title}</p>
                      </li>
                      <li className={s.readingBookItem}>
                        <span className={s.readingBookItemCategory}>
                          {t.author}:
                        </span>
                        <p className={s.readingBookItemText}>{item.author}</p>
                      </li>
                      <li className={s.readingBookItem}>
                        <span className={s.readingBookItemCategory}>
                          {t.year}:
                        </span>
                        <span className={s.readingBookItemText}>
                          {item.year}
                        </span>
                      </li>
                      <li className={s.readingBookItem}>
                        <span className={s.readingBookItemCategory}>
                          {t.pages}:
                        </span>
                        <span className={s.readingBookItemText}>
                          {item.pages}
                        </span>
                      </li>
                    </ul>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
      {status("goingToRead") && (
        <div className={s.booksWrapper}>
          <h2 className={s.booksTitle}>{t.going}</h2>
          <TitleReading />
          <ul className={s.goingToReadList}>
            {data.map(
              (item) =>
                item.status === "goingToRead" && (
                  <li key={item._id} className={s.goingToReadItem}>
                    <ul className={s.goingToReadBookList}>
                      <li className={s.goingToReadBookItem}>
                        <svg className={s.goingToReadBookIcon}>
                          <use href={`${spriteSvg}#icon-flat`} />
                        </svg>
                        <p className={s.goingToReadBookTitle}>{item.title}</p>
                      </li>
                      <li className={s.goingToReadBookItem}>
                        <span className={s.goingToReadBookItemCategory}>
                          {t.author}:
                        </span>
                        <p className={s.goingToReadBookItemText}>
                          {item.author}
                        </p>
                      </li>
                      <li className={s.goingToReadBookItem}>
                        <span className={s.goingToReadBookItemCategory}>
                          {t.year}:
                        </span>
                        <span className={s.goingToReadBookItemText}>
                          {item.year}
                        </span>
                      </li>
                      <li className={s.goingToReadBookItem}>
                        <span className={s.goingToReadBookItemCategory}>
                          {t.pages}:
                        </span>
                        <span className={s.goingToReadBookItemText}>
                          {item.pages}
                        </span>
                      </li>
                    </ul>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
      {book && (
        <ModalBookReview book={book} open={openModal} onClose={toggleModal} />
      )}
      {data.length > 0 && (
        <div className={s.linkWrapper}>
          <NavLink className={s.link} to="/training">
            {t.training}
          </NavLink>
        </div>
      )}
    </>
  );
}
