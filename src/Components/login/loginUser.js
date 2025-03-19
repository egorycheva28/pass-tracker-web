import React from 'react';
import { useState } from "react";
import { userApi } from '../../Api/userApi.js';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  formBox: {
    backgroundColor: "white",
    padding: "20px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  input: {
    padding: "10px",
    paddingRight: "35px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  },
  icon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  button: {
    padding: "10px",
    background: 'rgb(231, 53, 89)',
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

function LoginUser() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data1 = await userApi.loginUser(email, password);
      if (data1) {
        const data2 = await userApi.getProfile();
        const data3 = await userApi.getHighestRole(data2.id);
        console.log(data3);
        const fio = data2.name.split(" ");
        localStorage.setItem('lastName', `${fio[0]}`);
        localStorage.setItem('firstName', `${fio[1][0]}`);
        localStorage.setItem('middleName', `${fio[2][0]}`);
        localStorage.setItem('role', `${data3.role}`);
        navigate('/profile');
        console.log("Успешный вход!", data1);
        localStorage.setItem("token", data1.accessToken);
        alert("Вы вошли в систему!");
      }
    } catch (err) {
      if (err?.response?.data?.errors?.Email) {
        const emailErrors = err.response.data.errors.Email;
        if (emailErrors.includes("The Email field is required.")) {
          setError("Ошибка: Поле Email обязательно.");
        }
      } else if (err?.response?.data?.errors?.Password) {
        const passwordErrors = err.response.data.errors.Password;
        if (passwordErrors.includes("The Password field is required.")) {
          setError("Ошибка: Поле Пароль обязательно.");
        }
      } else if (err.response?.data?.detail === "Invalid credentials!") {
        setError("Ошибка: Введённые данные некоректны.");
      } else {
        setError("Произошла ошибка при авторизации. Попробуйте позже.");
      }
      console.error("Ошибка запроса:", err);
    }
  };

  const registration = async () => {
    navigate('/registration');
  }

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2>Авторизация</h2>
        <form style={styles.form}>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div style={styles.inputContainer}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={styles.input}
            />
            <img src="/email.png" alt="email" style={styles.icon} />
          </div>
          <div style={styles.inputContainer}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              style={styles.input}
            />
            <img
              src={showPassword ? "/eye-open.png" : "/eye-closed.png"}
              alt="Показать пароль"
              style={styles.icon}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <button type="submit" style={styles.button} onClick={handleSubmit}> Войти</button>
          <button style={styles.button} onClick={registration}> Зарегестрироваться </button>
        </form>
      </div>
    </div>
  );
}

export default LoginUser;