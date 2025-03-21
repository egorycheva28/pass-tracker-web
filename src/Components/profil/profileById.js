import React, { useEffect, useState, useRef } from "react";
import { userApi } from '../../Api/userApi.js';
import { useParams } from 'react-router-dom';

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
        padding: "30px",
        borderRadius: "10px",
        width: "700px",
        minHeight: "500px",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "left", // Прижимаем в лево
        justifyContent: "flex-start",// Прижимаем к верху
        paddingTop: "10px",
    },

    input: {
        padding: "10px",
        margin: "10px 0",
        borderRadius: "4px",
        border: "1px solid #ccc",
        width: "100%",
        fontSize: "16px",
    },
    /*button: {
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "10px",
      width: "100%",
      fontSize: "16px",
    },
    label: {
      fontWeight: "bold",
      textAlign: "left",
      display: "block",
      marginTop: "10px",
    },*/
    infoRow: {
        display: "flex",
        justifyContent: "flex-start",
        gap: "15px",
        marginBottom: "30px",
        fontSize: "18px",
    },
    saveButton: {
        background: 'rgb(231, 53, 89)',
        color: "white",
        fontSize: "16px",
        padding: "7px",
    },
    cancelButton: {
        background: 'rgb(49, 48, 48)',
        color: "white",
        marginLeft: "10px",
        fontSize: "16px",
        padding: "7px",
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "none",
        border: "none",
        fontSize: "18px",
        cursor: "pointer",
    },
    modalContent: {
        position: "relative", // Чтобы крестик был внутри
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "300px",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
    },

    editButton: {
        border: "none",
        background: "none",
        cursor: "pointer",
        padding: "0",
    },
    editIcon: {
        width: "24px",
        height: "24px",
    },
};

function GetUserProfile() {
    const { id } = useParams();

    const [error, setError] = useState("");
    const [user, setUser] = useState(null);

    const isFetched = useRef(false);

    useEffect(() => {
        if (isFetched.current) return; // Если уже загружали, не запускаем повторно
        isFetched.current = true;

        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await userApi.getProfileById(id);
            if (data) {
                console.log("Успешная загрузка профиля", data);
                setUser(data);
            }
        } catch (err) {
            setError(err.message || "Ошибка загрузки профиля");
        }
    };


    const roleTranslations = {
        Teacher: "Преподаватель",
        Student: "Студент",
        Deanery: "Деканат",
        New: "Роль ещё не выдана",
        4: "Админ"
    };

    const translatedRoles = user?.roles?.map(role => roleTranslations[role] || role);
    return (
        <div style={styles.container}>
            <div style={styles.formBox}>
                <h1 style={{ marginBottom: "20px", alignSelf: "center" }}>Профиль</h1>
                <div style={{ marginTop: "60px", }}>
                    <div style={styles.infoRow}>
                        <strong>ФИО:</strong> {user?.name || "Нет данных"}
                    </div>

                    <div style={styles.infoRow}>
                        <strong>Роль:</strong> {translatedRoles?.join(", ") || "Нет данных"}
                    </div>

                    {user?.group && user?.group !== 0 ? (
                        <div style={styles.infoRow}>
                            <strong>Группа:</strong> {user?.group || "Нет данных"}
                        </div>
                    ) : null}

                    <div style={styles.infoRow}>
                        <strong>Почта:</strong> {user?.email || "Нет данных"}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetUserProfile;