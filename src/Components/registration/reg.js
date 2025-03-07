import { Button, Card, Form, Input, Space, Typography, DatePicker } from "antd";
import React from 'react';
import { registerUserThunkCreator } from "../../reducers/userReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { userApi } from "../../Api/userApi";
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

function RegisterUser(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [lastName, setLastName] = useState("");
    const [password1, setPassword1] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [group, setGroup] = useState("");
    //console.log(lastName);
    //console.log("Успешный ход");

    /*const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Успешный");

        try {
            const data = await userApi.registerUser(lastName, password1, email, firstName, middleName, group);
            console.log("Успешный вход");

            if (data) {
                console.log("Успешный вход!", data);
                alert("Вы вошли в систему!");
            }
        } catch {
            console.log("sds");
        }
    };*/

    //const token = localStorage.getItem('token');
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Успешный");

        await dispatch(registerUserThunkCreator(lastName, password1, email, firstName, middleName, group));
        console.log(localStorage.getItem('token'));
        if (localStorage.getItem('token') !== null) {
            console.log("1233");
            navigate('/login');
        }
        //navigate('/login');
    };
    /*const handleClick = () => {
        //dispatchEvent(registerUserActionCreator(lastName));
        console.log("кнопка нажата");
    }*/


    return (
        <Card style={{ width: 600, margin: '0 auto', textAlign: 'center', marginTop: '100px', zIndex: 1 }}>
            <Title level={3} style={{ marginTop: 0 }}>Регистрация</Title>
            <Form >
                <Form.Item name="lastName" label="Фамилия" rules={[{ required: true, message: 'Введите фамилию' }]} style={{ textAlign: 'right' }}>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Введите фамилию" style={{ width: "432px" }} />
                </Form.Item>
                <Form.Item name="password1" label="Пароль" rules={[{ required: true, message: 'Введите пароль' }]} style={{ textAlign: 'right' }}>
                    <Input.Password value={password1} onChange={(e) => setPassword1(e.target.value)} placeholder="Введите пароль" style={{ width: "432px" }} />
                </Form.Item>
                <Form.Item name="email" label="Email"
                    rules={[{ required: true, message: 'Введите email' },
                    { pattern: new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'), message: 'Введите корректный email' }]} style={{ textAlign: 'right' }}>
                    <div>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите email" style={{ width: "432px" }} />
                        <span style={{ display: 'block', marginTop: '8px', color: '#888', textAlign: 'left', marginLeft: '62px' }}>
                            Email будет использоваться для входа в систему
                        </span>
                    </div>
                </Form.Item>
                <Form.Item name="firstName" label="день рождения" rules={[{ required: false, message: 'Введите имя' }]} style={{ textAlign: 'right' }}>
                    <DatePicker value={firstName} onChange={(date) => setFirstName(date)} style={{ width: "432px" }} />
                </Form.Item>
                <Form.Item name="middleName" label="пол" rules={[{ required: true, message: 'Введите отчество' }]} style={{ textAlign: 'right' }}>
                    <Input value={middleName} onChange={(e) => setMiddleName(e.target.value)} placeholder="Введите отчество" style={{ width: "432px" }} />
                </Form.Item>
                <Form.Item name="group" label="Номер телефона" rules={[{ required: false }]} style={{ marginLeft: '11px', textAlign: 'right' }}>
                    <Input value={group} onChange={(e) => setGroup(e.target.value)} placeholder="Введите номер группы" style={{ width: "432px" }} />
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" style={{ background: 'rgb(231, 53, 89)' }} onClick={handleSubmit}>Зарегестрироваться</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default RegisterUser;
