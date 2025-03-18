import { Card,Button } from "antd";
import React from 'react';
import { useNavigate } from "react-router-dom";

function UnconfirmedUsersItem(props) {
    const navigate = useNavigate();
    const detail = () => {
        navigate(`/detail/${props.id}`);
    };
    const handleDelete = async () => {
        await props.onDelete(props.id); 
    };


    return (
<Card style={{ margin: '20px', textAlign: 'left', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flexGrow: 1 }}>
                    {props.group != null ? (
                        <p style={{ margin: 0 }} onClick={detail}>{props.userName} —— {props.group} </p>
                    ) : (
                        <p style={{ margin: 0 }} onClick={detail}>{props.userName}</p>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <Button type="primary" htmlType="submit" style={{ background: 'rgb(231, 53, 89)' }} >Принять</Button>
                    <Button type="primary" htmlType="submit" style={{ background: 'rgb(231, 53, 89)', marginLeft: '10px' }}  onClick={handleDelete}>Удальть</Button>
                </div>
            </div>
           
        </Card>
        
    );
}

export default UnconfirmedUsersItem;