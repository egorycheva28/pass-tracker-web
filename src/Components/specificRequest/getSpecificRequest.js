import React, { useEffect, useState } from "react";
import { requestApi } from "../../Api/specificRequestApi.js";

const styles = {
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    paddingTop: "100px",
    flexDirection: "column"
  },
  formBox: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "100vh",
    textAlign: "center",
    marginBottom: "20px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "10px",
    marginBottom: "5px",
    fontSize: "16px",
  },
  declineButton: {
    marginLeft: "10px",
    padding: "5px 20px",
    background: "#555",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  button: {
    marginLeft: "10px",
    padding: "5px 20px",
    background: 'rgb(231, 53, 89)',
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  imageStyle: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    cursor: "pointer",
  },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      position: "relative",
      backgroundColor: "white", 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
      borderRadius: "8px",
      
    },
    enlargedImage: {
      width: "50vw", 
      height: "80vh", 
      objectFit: "contain", // Изображение не обрезается
      borderRadius: "8px",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "red",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      fontSize: "18px",
      cursor: "pointer",
    },

  
};

function GetSpecificRequest() {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await requestApi.getDetails(`ab2b59f9-5de7-41da-b081-664072ce7c3c`);
        if (data) {
          console.log("Успешная загрузка профиля", data);
          setUser(data);
        }
      } catch (err) {
        setError(err.message || "Ошибка загрузки профиля");
      }
    };
    fetchProfile();
  }, []);

  const formatDate = (date) => {
    if (!date) return "12.13.2024";
    return new Date(date).toLocaleDateString("ru-RU");
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={{ marginBottom: "20px" }}>{user?.userName} - {user?.group} </h2>
        <div style={styles.infoRow}>
          <strong>Дата:</strong> {formatDate(user?.startDate)} - {formatDate(user?.finishDate)}
          <button style={styles.button}>Продлить</button>
        </div>
        <div style={styles.infoRow}>
          <strong>Причина:</strong> {user?.typeRequest || "Болезнь"}
        </div>
      </div>

      <div style={styles.formBox}>
        <h2 style={{ marginBottom: "20px" }}>Описание:</h2>
        <div style={styles.infoRow}>{user?.comment || "Нет данных"}</div>
      </div>

      <div style={styles.formBox}>
        <h2 style={{ marginBottom: "20px" }}>Документы:</h2>
        <img
          src={`data:image/png;base64,${user?.photo}`}
          alt="User photo"
          style={styles.imageStyle}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <div>
        <button style={styles.button}>Принять</button>
        <button style={styles.declineButton}>Отклонить</button>
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={() => setIsModalOpen(false)}>×</button>
            <img
              src={`data:image/png;base64,${user?.photo}`}
              alt="User photo"
              style={styles.enlargedImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default GetSpecificRequest;
