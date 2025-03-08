import { Card, Button } from "antd";
import React from 'react';
import { useNavigate } from "react-router-dom";

function ApprovedApplicationItem(props) {
    const navigate = useNavigate();
    const detail = () => {
        navigate(`/detail${props.id}`);
    };

    return (
        <Card style={{ margin: '20px', textAlign: 'left', height: '50px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', cursor: 'pointer' }}
            onClick={detail}>
            <p>{'Фио'} - {'Группа'} - {'Дата'} - {'Причина'}</p>
        </Card>
    );
}

export default ApprovedApplicationItem;