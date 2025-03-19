import { Card, Button, Select } from "antd";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function UnconfirmedUsersItem(props) {

    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleDelete = async () => {
        await props.onDelete(props.id);
    };

    const handleConfirm = async () => {
        if (!role) {
            alert("Выберите роль перед подтверждением!");
            return;
        }
        await props.onConfirm(props.id, role);
    };

    return (
        <Card style={{ margin: "20px", textAlign: "left", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flexGrow: 1 }} onClick={() => navigate(`/profile/${props.id}`)}>
                    {props.group != null ? (
                        <p style={{ margin: 0 }}>{props.userName} —— {props.group}</p>
                    ) : (
                        <p style={{ margin: 0 }}>{props.userName}</p>
                    )}
                </div>

                <Select
                    placeholder="Выберите роль"
                    style={{ width: 150, marginRight: "10px" }}
                    onChange={(value) => setRole(value)}
                >
                    <Option value="Student">Студент</Option>
                    <Option value="Teacher">Преподаватель</Option>
                    <Option value="DeanOffice">Деканат</Option>
                </Select>

                <Button type="primary" onClick={handleConfirm} style={{ background: "rgb(231, 53, 89)" }}>
                    Принять
                </Button>

                <Button type="primary" onClick={handleDelete} style={{ background: "#555", marginLeft: "10px" }}>
                    Удалить
                </Button>
            </div>
        </Card>
    );
}
export default UnconfirmedUsersItem;