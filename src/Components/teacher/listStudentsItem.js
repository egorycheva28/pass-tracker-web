import { Card } from "antd";
import React from 'react';

function ListStudentsItem(props) {
    return (
        <Card style={{ margin: '20px', textAlign: 'left', height: '50px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <p>{'Фио'} - {'Группа'} - {'Дата'}</p>
        </Card>
    );
}

export default ListStudentsItem;
