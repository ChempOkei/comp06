import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import styles from "./_styles/auth.module.css";
import { Link } from "react-router-dom";

export const Login = () => {
  const [disabled, setDisabled] = useState(false);
  const { login, fieldErrors } = useLogin();
  const [fieldData, setFieldData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    login(fieldData).then(setDisabled(false));
  };

  return (
    <main className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1>Авторизация</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.formGroup}>
            <label
              className={fieldErrors.email ? styles.errorText : ""}
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className={
                fieldErrors.email
                  ? `${styles.authInput} ${styles.inputError}`
                  : styles.authInput
              }
              placeholder="example@mail.com"
              onChange={(e) =>
                setFieldData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            {fieldErrors.email && (
              <div className={styles.errorText}>{fieldErrors.email}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label
              className={fieldErrors.password ? styles.errorText : ""}
              htmlFor="password"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className={
                fieldErrors.password
                  ? `${styles.authInput} ${styles.inputError}`
                  : styles.authInput
              }
              placeholder="password"
              onChange={(e) =>
                setFieldData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            {fieldErrors.password && (
              <div className={styles.errorText}>{fieldErrors.password}</div>
            )}
          </div>

          <button disabled={disabled} type="submit" className={styles.authBtn}>
            Войти
          </button>
        </form>

        <div className={styles.authFooter}>
          <span>Нет аккаунта?</span>
          <Link to="/register" className={styles.authLink}>
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </main>
  );
};
