import { useEffect } from "react";
import { useBoards } from "../../hooks/useBoards";
import styles from "./_styles/boards.module.css";
import { Link } from "react-router-dom";

export const PublicBoards = () => {
  const { publicBoards, getPublicBoards, likeBoard } = useBoards();

  useEffect(() => {
    getPublicBoards();
  }, [getPublicBoards]);

  return (
    <main className={styles.boardsContent}>
      {publicBoards
        .sort((a, b) => b.likes_count - a.likes_count)
        .map((board) => (
          <article key={board.id} className={styles.boardCard}>
            <h2>{board.title}</h2>

            <div className={styles.publicLink}>
              <p>Публичная ссылка</p>
              <div className={styles.linkContent}>
                <svg
                  className="link-icon"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span>/board/{board.public_hash}</span>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <Link
                to={`/board/${board.public_hash}`}
                className={styles.primaryButton}
              >
                Подключиться
              </Link>
              <button
                onClick={() => likeBoard(board.id)}
                className={styles.secondaryButton}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill={board.is_liked ? "#ef4444" : "none"}
                    stroke="#ef4444"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
                {board.likes_count}
              </button>
            </div>
          </article>
        ))}
    </main>
  );
};
