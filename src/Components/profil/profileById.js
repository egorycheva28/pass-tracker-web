import React, { useEffect, useState } from "react";
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
        padding: "20px",
        borderRadius: "8px",
        width: "500px",
        textAlign: "center",
    },
    /*input: {
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ccc",
      width: "100%",
      fontSize: "16px",
    },
    button: {
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
        gap: "10px",
        marginBottom: "10px",
        fontSize: "16px",
    }



};

function ProfileById() {
    const { id } = useParams();
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    //console.log(id);
    //console.log(user);

    useEffect(() => {
        const fetchProfile = async () => {

            try {

                const data = await userApi.getProfileById(id);
                console.log(data);
                if (data) {
                    console.log("Успешная загрузка профиля", data);
                    setUser(data);
                    //localStorage.setItem('role', `${data.roles}`);
                    //setFullName(data.fullName || "");
                    //setGroup(data.group || ""); 
                }
            } catch (err) {
                setError(err.message || "Ошибка загрузки профиля");
            }
        };
        fetchProfile();
    }, [id]);

    /*const handleUpdateProfile = async () => {
      try {
        const updatedUser = await userApi.updateProfile({ fullName, group }); 
        setUser(updatedUser);
        setSuccessMessage("Данные успешно обновлены!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (err) {
        setError(err.message || "Ошибка обновления профиля");
      }
    };*/

    return (
        <div style={styles.container}>
            <div style={styles.formBox}>
                <h2 style={{ marginBottom: "20px" }}>Профиль </h2>

                <div style={styles.infoRow}> <strong>Фамилия:</strong> {user?.name || "Нет данных"} </div>

                <div style={styles.infoRow}> <strong>Имя:</strong> {user?.name || "Нет данных"} </div>
                <div style={styles.infoRow}> <strong>Отчество:</strong> {user?.name || "Нет данных"} </div>
                <div style={styles.infoRow}> <strong>Роль:</strong> {user?.roles || "Нет данных"} </div>
                <div style={styles.infoRow}> <strong>Группа:</strong> {user?.group || "Нет данных"} </div>
                <div style={styles.infoRow}> <strong>Почта:</strong> {user?.email || "Нет данных"} </div>
                <div style={styles.infoRow}> <strong>Роль:</strong> {user?.email || "Нет данных"} </div>
            </div>
        </div>
    );
}

export default ProfileById;
