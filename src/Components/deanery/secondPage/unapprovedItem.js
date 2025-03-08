import { Card, Button } from "antd";
import React from 'react';
import { useNavigate } from "react-router-dom";

function UnapprovedItem(props) {
    const navigate = useNavigate();
    const detail = () => {
        navigate(`/detail${props.id}`);
    };

    return (
        <Card style={{ margin: '20px', textAlign: 'left', cursor: 'pointer' }}
            onClick={detail}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flexGrow: 1 }}>
                    <p style={{ margin: 0 }} >{'Фио'} - {'Группа'} - {'Дата'} - {'Причина'}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <Button type="primary" htmlType="submit" style={{ background: 'rgb(231, 53, 89)' }}>Одобрить</Button>
                    <Button type="primary" htmlType="submit" style={{ background: 'rgb(231, 53, 89)', marginLeft: '10px' }}>Отклонить</Button>
                </div>
            </div>
        </Card>
    );
}

export default UnapprovedItem;