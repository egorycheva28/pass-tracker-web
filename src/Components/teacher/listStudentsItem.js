import { Card } from "antd";
import React from 'react';

function ListStudentsItem(props) {
    return (
        <Card style={{ margin: '20px', textAlign: 'left', height: '50px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <p>{props.title} - {props.description} - {props.title}</p>
        </Card>
    );
}

export default ListStudentsItem;
