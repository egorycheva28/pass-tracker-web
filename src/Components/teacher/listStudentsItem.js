import { Card } from "antd";
import React from 'react';

function ListStudentsItem(props) {

    const reverseStartDate = () => {
        const parts = props.startDate.split('T');
        if (parts.length !== 2) {
            throw new Error("Неправильный формат даты и времени");
        }

        const dateParts = parts[0].split('-');
        if (dateParts.length !== 3) {
            throw new Error("Неправильный формат даты");
        }

        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];

        return `${day}.${month}.${year}`;
    }

    const reverseFinishDate = () => {
        const parts = props.finishDate.split('T');
        if (parts.length !== 2) {
            throw new Error("Неправильный формат даты и времени");
        }

        const dateParts = parts[0].split('-');
        if (dateParts.length !== 3) {
            throw new Error("Неправильный формат даты");
        }

        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];

        return `${day}.${month}.${year}`;
    }

    return (
        <Card style={{ margin: '20px', textAlign: 'left', height: '50px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            {props.group != null ? (
                <p>{props.userName} —— {props.group} —— {reverseStartDate()} - {reverseFinishDate()}</p>
            ) : (
                <p>{props.userName} —— {reverseStartDate()} - {reverseFinishDate()}</p>
            )}
        </Card>
    );
}

export default ListStudentsItem;
