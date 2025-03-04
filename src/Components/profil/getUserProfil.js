
import React from 'react';
import { useState } from "react";
import { userApi } from '../../Api/userApi.js';




function GetUserProfile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await userApi.getProfile();
      if (data) {
        setUser(data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div >
      <div >
        <h2>Профиль</h2>
        <p><strong>Фамилия:</strong> {}</p>
        <p><strong>Имя:</strong> {}</p>
        <p><strong>Отчество:</strong> {}</p>
        <p><strong>Группа:</strong> {}</p>
        <p><strong>Роль:</strong> {}</p>
        <label><strong>Почта:</strong> <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label><strong>Пароль:</strong> <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>

      </div>
    </div>
  );
}

export default GetUserProfile;
