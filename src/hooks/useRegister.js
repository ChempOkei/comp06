import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({});

  const register = useCallback(
    async ({ email, password, name }) => {
      setFieldErrors({});

      let validationErrors;

      if (!email.match(/^\S+@\S+\.\S{2,}$/))
        validationErrors = { ...validationErrors, email: "Не валидный email" };

      if (!email)
        validationErrors = {
          ...validationErrors,
          email: "email не может быть пустым",
        };

      if (!name.match(/^[A-z]+$/))
        validationErrors = {
          ...validationErrors,
          name: "Имя может содержать только латиницу",
        };

      if (!name)
        validationErrors = {
          ...validationErrors,
          name: "Имя не должно быть пустым",
        };

      if (!password.match(/[#_%!]/))
        validationErrors = {
          ...validationErrors,
          password: "Пароль должен содержать спецсимволы (# _ ! %)",
        };

      if (!password.match(/\d/))
        validationErrors = {
          ...validationErrors,
          password: "Пароль должен содержать цифры",
        };

      if (!password.match(/.{8,}/))
        validationErrors = {
          ...validationErrors,
          password: "Пароль должен содержать миниум 8 символов",
        };

      if (!password)
        validationErrors = {
          ...validationErrors,
          password: "Пароль не может быть пустым",
        };

      if (validationErrors) return setFieldErrors(validationErrors);

      try {
        const res = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            clientId: Math.random(),
          },
          body: JSON.stringify({ email, password, name }),
        });

        if (res.status === 201) {
          return navigate("/login");
        }

        if (res.status === 400) {
          return setFieldErrors({
            email: "Данный пользователь уже существует",
          });
        }

        throw new Error("Ошибка регистрации");
      } catch (err) {
        alert(err.message);
      }
    },
    [navigate],
  );

  return { register, fieldErrors };
};
