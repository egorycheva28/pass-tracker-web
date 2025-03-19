import { Card } from "antd";
import React from 'react';

function ListStudentsItem(props) {

    const formatDate = (date) => {
        if (!date) return "12.13.2024";
        return new Date(date).toLocaleDateString("ru-RU");
    };

    return (
        <Card style={{ margin: '20px', textAlign: 'left', height: '50px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            {props.group != null ? (
                <p>{props.userName} —— {props.group} —— {formatDate(props.startDate)} - {formatDate(props.finishDate)}</p>
            ) : (
                <p>{props.userName} —— {formatDate(props.startDate)} - {formatDate(props.finishDate)}</p>
            )}
        </Card>
    );
}

export default ListStudentsItem;