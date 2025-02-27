
import React from 'react';

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
    input: {
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ccc",
      width: "100%",
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

    return (
    <div style={styles.container}>
        <div style={styles.formBox}>
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={styles.input} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" style={styles.input} />
                <button type="submit" style={styles.button}>Войти</button>
                <button type="submit" style={styles.button}>Зарегистрироваться</button>
            </form>
        </div>
    </div>
    );
}

export default LoginUser;