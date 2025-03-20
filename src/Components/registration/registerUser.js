import { Button, Card, Form, Input, Space, Typography } from "antd";
import React from 'react';
import { registerUserThunkCreator } from "../../reducers/userReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function RegisterUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [group, setGroup] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(registerUserThunkCreator(lastName, firstName, middleName, group, email, password));

        if (localStorage.getItem('token') !== null) {
            navigate('/profile');
        }
    };

    return (
        <Card style={{ width: 600, margin: '0 auto', textAlign: 'center', marginTop: '100px', zIndex: 1 }}>
            <Title level={3} style={{ marginTop: 0 }}>Регистрация</Title>
            <Form>
                <Form.Item name="lastName" label="Фамилия" rules={[{ required: true, message: 'Введите фамилию' },
                { pattern: new RegExp('^([А-ЯЁ][а-яё]*|[A-Z][a-z]*)$'), message: 'Введите корректную фамилию' }]} style={{ textAlign: 'right' }}>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Введите фамилию" style={{ width: "432px" }} />
                </Form.Item>
                <Form.Item name="firstName" label="Имя" rules={[{ required: true, message: 'Введите имя' },
                { pattern: new RegExp('^([А-ЯЁ][а-яё]*|[A-Z][a-z]*)$'), message: 'Введите корректное имя' }]} style={{ textAlign: 'right' }}>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Введите имя" style={{ width: "432px" }} />
                </Form.Item>
                <Form.Item name="middleName" label="Отчество" rules={[{ required: true, message: 'Введите отчество' },
                { pattern: new RegExp('^([А-ЯЁ][а-яё]*|[A-Z][a-z]*)$'), message: 'Введите корректное отчество' }
                ]} style={{ textAlign: 'right' }}>
                    <Input value={middleName} onChange={(e) => setMiddleName(e.target.value)} placeholder="Введите отчество" style={{ width: "432px" }} />
                </Form.Item>
                <Form.Item name="group" label="Номер группы" rules={[{ required: false }, { pattern: new RegExp('^[\\d\\s]*$'), message: 'Введите корректный номер группы' }]} style={{ marginLeft: '11px', textAlign: 'right' }}>
                    <Input value={group} onChange={(e) => {
                        const value = e.target.value.trim();
                        setGroup(value === '' ? null : value);
                    }} placeholder="Введите номер группы" style={{ width: "432px" }} />
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
                <Form.Item name="password" label="Пароль" rules={[{ required: true, message: 'Введите пароль' }]} style={{ textAlign: 'right' }}>
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Введите пароль" style={{ width: "432px" }} />
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