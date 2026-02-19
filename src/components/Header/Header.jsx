import { Link, useLocation } from "react-router-dom";
import styles from "./header.module.css";
import { useBoards } from "../../hooks/useBoards";
import { useContext } from "react";
import { HeaderContext } from "../../context/HeaderContext";

export const Header = () => {
  const location = useLocation();
  const { title } = useContext(HeaderContext);
  const { createBoard } = useBoards();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          <h2>
            {location.pathname === "/" || location.pathname === "/my"
              ? "Boardly"
              : title}
          </h2>
        </div>

        <div className={styles.headerRight}>
          {(location.pathname === "/" || location.pathname === "/my") && (
            <button onClick={() => createBoard()} className={styles.headerBtn}>
              Создать доску
            </button>
          )}
          <Link
            to={location.pathname === "/" ? "/my" : "/"}
            className={styles.headerBtn}
          >
            {location.pathname === "/" ? "Доски с доступом" : "Публичные доски"}
          </Link>
          <Link to="/logout" className={`${styles.headerBtn} ${styles.logout}`}>
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Выйти
          </Link>
        </div>
      </div>
    </header>
  );
};
