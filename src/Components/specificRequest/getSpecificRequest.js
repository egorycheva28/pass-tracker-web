import React, { useEffect, useState } from "react";
import { requestApi } from "../../Api/specificRequestApi.js";

const styles = {
  container: {
    display: "flex",
    justifyContent: "flex-start", // Это прижимает содержимое к верхней части
    alignItems: "center",     // // Это изменяет выравнивание по горизонтали
    height: "100vh",              // Высота остается на всю страницу
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
  }
  
  
  
};

function GetSpecificRequest() {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await requestApi.getDetails(`13a644c6-8244-41bc-05a2-08dd2a3ac0a9`);
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


  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={{ marginBottom: "20px" }}>{user.name} {user.semester}-{user.semester} </h2>

        <div style={styles.infoRow}> <strong>Дата:</strong> {user?.email || "Нет данных"} </div> 

        <div style={styles.infoRow}> <strong>Причина:</strong> {user?.email || "Нет данных"} </div> 
        </div>

        <div style={styles.formBox}>
        <h2 style={{ marginBottom: "20px" }}>Описание: </h2>

        <div style={styles.infoRow}> <strong>Дата:</strong> {user?.email || "Нет данных"} </div> 


        </div>
        
        <div style={styles.formBox}>
        <h2 style={{ marginBottom: "20px" }}>Документы: </h2>



        </div>

    </div>
  );
}

export default GetSpecificRequest;
