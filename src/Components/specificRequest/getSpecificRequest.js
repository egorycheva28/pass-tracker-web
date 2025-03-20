import React, { useEffect, useState, useRef } from "react";
import { requestApi } from "../../Api/specificRequestApi.js";
import { deaneryApi } from '../../Api/deaneryApi.js';
import { useParams } from 'react-router-dom';

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
  modalOverlay1: {
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
  modalContent1: {
    position: "relative",
    backgroundColor: "white",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    borderRadius: "8px",

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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
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
  textarea: {
    width: "100%",
    height: "80px",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  }
};

function GetSpecificRequest() {
  const { id } = useParams();

  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [declineComment, setDeclineComment] = useState("");
  const [isProlongModalOpen, setIsProlongModalOpen] = useState(false);
  const [newFinishDate, setNewFinishDate] = useState("");

  const isFetched = useRef(false);

  useEffect(() => {
    if (isFetched.current) return; // Если уже загружали, не запускаем повторно
    isFetched.current = true;

    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await requestApi.getDetails(id);
      if (data) {
        console.log("Успешная загрузка профиля", data);
        setUser(data);
      }
    } catch (err) {
      setError(err.message || "Ошибка загрузки профиля");
    }
  };

  const formatDate = (date) => {
    if (!date) return "12.13.2024";
    return new Date(date).toLocaleDateString("ru-RU");
  };

  const handleAccept = async () => {
    try {
      await deaneryApi.acceptRequest(id);
      console.log("Запрос принят");
      setUser((prevUser) => ({ ...prevUser, statusRequest: "Accepted" })); // Обновление состояния
    } catch (err) {
      setError(err.message || "Ошибка принятия запроса");
    }
  };

  const handleProlong = async () => {
    if (!newFinishDate) {
      setError("Выберите дату для продления.");
      return;
    }

    try {
      await requestApi.prolongRequest(id, new Date(newFinishDate).toISOString());
      console.log("Запрос продлён до:", newFinishDate);
      setUser((prevUser) => ({ ...prevUser, finishDate: newFinishDate }));
      setIsProlongModalOpen(false);
      setError(""); // Очистка ошибок после успешного запроса
    } catch (err) {
      if (err.response?.status === 404 && err.response?.data?.detail === "You cant short request") {
        setError("Ошибка: Нельзя указать дату раньше текущей.");
      } else {
        setError(err.response?.data?.detail || "Ошибка продления запроса");
      }
    }
  };

  const translations = {
    EducationalActivity: "Образовательная деятельность",
    Disease: "Болезнь",
    FamilyCircumstances: "Семейные обстоятельства",
    Pending: "На рассмотрении",
    Accepted: "Принята",
    Declined: "Отклонена"
  };

  const handleOpenDeclineModal = () => {
    setDeclineComment("");
    setIsDeclineModalOpen(true);
  };

  const handleCloseDeclineModal = () => {
    setIsDeclineModalOpen(false);
  };

  const handleCloseProlongModal = () => {
    setIsProlongModalOpen(false);
    setError("");
    setNewFinishDate("");
  };
  

  const handleDecline = async () => {
    try {
      await deaneryApi.declineRequest(id, declineComment);
      console.log("Запрос отклонён с комментарием:", declineComment);
      setUser((prevUser) => ({ ...prevUser, statusRequest: "Declined" }));
      setIsDeclineModalOpen(false);
    } catch (err) {
      setError(err.message || "Ошибка отклонения запроса");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={{ marginBottom: "20px" }}>{user?.userName} - {user?.group} </h2>
        <div style={styles.infoRow}>
          <strong>Дата:</strong> {formatDate(user?.startDate)} - {formatDate(user?.finishDate)}
          {user?.typeRequest === "EducationalActivity" && user?.statusRequest === "Accepted" ? (

            <button style={styles.button} onClick={() => setIsProlongModalOpen(true)}>Продлить</button>

          ) : null}

        </div>
        <div style={styles.infoRow}>
          <strong>Причина:</strong> {translations[user?.typeRequest] || user?.typeRequest || "Не указано"}
        </div>

        <div style={styles.infoRow}>
          <strong>Статус:</strong> {translations[user?.statusRequest] || user?.statusRequest || "Не указано"}
        </div>

        <div style={styles.infoRow}>
          <div style={styles.infoRow}>
            <strong>Занёс документы в деканат:</strong>
            <div style={{
              width: "20px",
              height: "20px",
              border: "1px solid #000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              {user?.inDeanery ? (
                <img
                  src="/checkmark.png"
                  alt="Red Checkmark"
                  style={{ width: "20px", height: "20px" }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>


      <div style={styles.formBox}>
        <h2 style={{ marginBottom: "20px" }}>Документы:</h2>

        {user?.photo !== null ? (
          <img
            src={`data:image/png;base64,${user?.photo}`}
            alt="User photo"
            style={styles.imageStyle}
            onClick={() => setIsModalOpen(true)}
          />
        ) : null}

      </div>
      {user?.statusRequest === "Pending" ? (
        <div>
          <button style={styles.button} onClick={handleAccept}>Принять</button>
          <button style={styles.declineButton} onClick={handleOpenDeclineModal}>Отклонить</button>
        </div>
      ) : null}
      {isModalOpen && (
        <div style={styles.modalOverlay1} onClick={() => setIsModalOpen(false)}>
          <div style={styles.modalContent1} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={() => setIsModalOpen(false)}>×</button>
            <img
              src={`data:image/png;base64,${user?.photo}`}
              alt="User photo"
              style={styles.enlargedImage}
            />
          </div>
        </div>
      )}

      {isDeclineModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Отклонить запрос</h3>
            <textarea
              style={styles.textarea}
              value={declineComment}
              onChange={(e) => setDeclineComment(e.target.value)}
              placeholder="Введите комментарий...(Это не обязательно)"
            />
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <button style={styles.button} onClick={handleDecline}>Подтвердить</button>
              <button style={styles.declineButton} onClick={handleCloseDeclineModal}>Отмена</button>
            </div>
          </div>
        </div>
      )}

      {isProlongModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Продлить запрос</h3>
            {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
            <input
              type="date"
              value={newFinishDate}
              onChange={(e) => setNewFinishDate(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <button style={{ ...styles.button, padding: "10px 20px", fontSize: "12px" }} onClick={handleProlong}>Подтвердить</button>
              <button style={styles.declineButton}  onClick={handleCloseProlongModal}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetSpecificRequest;
