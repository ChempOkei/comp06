import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useLogin = () => {
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({});
  const { login: auth } = useAuth();

  const login = useCallback(
    async ({ email, password }) => {
      setFieldErrors({});

      let validationErrors;

      if (!email.match(/^\S+@\S+\.\S{2,}$/))
        validationErrors = { ...validationErrors, email: "Не валидный email" };

      if (!email)
        validationErrors = {
          ...validationErrors,
          email: "email не может быть пустым",
        };

      if (!password)
        validationErrors = {
          ...validationErrors,
          password: "Пароль не может быть пустым",
        };

      if (validationErrors) return setFieldErrors(validationErrors);

      try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            clientId: Math.random(),
          },
          body: JSON.stringify({ email, password }),
        });

        if (res.status === 200) {
          const data = await res.json();
          auth(data.user, data.token);

          return navigate("/");
        }

        if (res.status === 400 || res.status === 401) {
          return setFieldErrors({
            email: "Неверный email или пароль",
            password: "Неверный email или пароль",
          });
        }

        throw new Error("Ошибка авторизации");
      } catch (err) {
        alert(err.message);
      }
    },
    [navigate, auth],
  );

  return { login, fieldErrors };
};
