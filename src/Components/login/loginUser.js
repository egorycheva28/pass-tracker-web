
import React from 'react';
import { useState } from "react";
import { userApi } from '../../Api/userApi.js';


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
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await userApi.loginUser(email, password);
      if (data) {
        console.log("Успешный вход!", data);
        localStorage.setItem("token", data.accessToken);
        alert("Вы вошли в систему!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2>Авторизация</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
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
          <button type="submit" style={styles.button}> Войти</button>
          <button style={styles.button}> Зарегестрироваться </button>
        </form>
      </div>
    </div>
  );
}

export default LoginUser;
