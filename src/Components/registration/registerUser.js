import { Button, Card, Form, Input, Space, Typography } from "antd";
import React from 'react';
const { Title } = Typography;

function RegisterUser() {

    return (
        <Card style={{ width: 600, margin: '0 auto', textAlign: 'center', marginTop: '100px', zIndex: 1 }}>
            <Title level={3} style={{ marginTop: 0 }}>Регистрация</Title>
            <Form>
                <Form.Item name="lastName" label="Фамилия" rules={[{ required: true, message: 'Введите фамилию' }]} style={{ textAlign: 'right' }}>
                    <Input placeholder="Введите фамилию" style={{ width: "432px" }} />
                </Form.Item>
                <Form.Item name="firstName" label="Имя" rules={[{ required: true, message: 'Введите имя' }]} style={{ textAlign: 'right' }}>
                    <Input placeholder="Введите имя" style={{ width: "432px" }} />
                </Form.Item>
                <Form.Item name="middleName" label="Отчество" rules={[{ required: true, message: 'Введите отчество' }]} style={{ textAlign: 'right' }}>
                    <Input placeholder="Введите отчество" style={{ width: "432px" }} />
                </Form.Item>
                <Form.Item name="group" label="Номер группы" rules={[{ required: false }]} style={{ marginLeft: '11px', textAlign: 'right' }}>
                    <Input placeholder="Введите номер группы" style={{ width: "432px" }} />
                </Form.Item>
                <Form.Item name="email" label="Email"
                    rules={[{ required: true, message: 'Введите email' },
                    { pattern: new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'), message: 'Введите корректный email' }]} style={{ textAlign: 'right' }}>
                    <div>
                        <Input placeholder="Введите email" style={{ width: "432px" }} />
                        <span style={{ display: 'block', marginTop: '8px', color: '#888', textAlign: 'left', marginLeft: '62px' }}>
                            Email будет использоваться для входа в систему
                        </span>
                    </div>
                </Form.Item>
                <Form.Item name="password1" label="Пароль" rules={[{ required: true, message: 'Введите пароль' }]} style={{ textAlign: 'right' }}>
                    <Input.Password placeholder="Введите пароль" style={{ width: "432px" }} />
                </Form.Item>
                <Form.Item name="password2" label="Пароль" rules={[{ required: true, message: 'Введите повторно пароль' }]} style={{ textAlign: 'right' }}>
                    <Input.Password placeholder="Введите повторно пароль" style={{ width: "432px" }} />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">Зарегестрироваться</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default RegisterUser;