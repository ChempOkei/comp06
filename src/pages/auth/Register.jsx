import { useState } from "react";
import styles from "./_styles/auth.module.css";
import { useRegister } from "../../hooks/useRegister";
import { Link } from "react-router-dom";

export const Register = () => {
  const [disabled, setDisabled] = useState(false);
  const { register, fieldErrors } = useRegister();
  const [fieldData, setFieldData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    register(fieldData).then(setDisabled(false));
  };

  return (
    <main className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1>Регистрация</h1>
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
              placeholder="user@example.com"
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
              className={fieldErrors.name ? styles.errorText : ""}
              htmlFor="name"
            >
              Имя
            </label>
            <input
              type="text"
              id="name"
              className={
                fieldErrors.name
                  ? `${styles.authInput} ${styles.inputError}`
                  : styles.authInput
              }
              placeholder="John"
              onChange={(e) =>
                setFieldData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            {fieldErrors.name && (
              <div className={styles.errorText}>{fieldErrors.name}</div>
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
              placeholder="••••••••••••"
              onChange={(e) =>
                setFieldData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            {fieldErrors.password && (
              <div className={styles.errorText}>{fieldErrors.password}</div>
            )}
          </div>

          <button disabled={disabled} type="submit" className={styles.authBtn}>
            Зарегистрироваться
          </button>
        </form>

        <div className={styles.authFooter}>
          <span>Уже есть аккаунт?</span>
          <Link to="/login" className={styles.authLink}>
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
};
