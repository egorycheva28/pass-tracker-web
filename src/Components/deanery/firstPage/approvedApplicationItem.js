import { Card } from "antd";
import React from 'react';
import { useNavigate } from "react-router-dom";

function ApprovedApplicationItem(props) {
    const navigate = useNavigate();
    const detail = () => {
        navigate(`/detail/${props.id}`);
    };

    const formatDate = (date) => {
        if (!date) return "12.13.2024";
        return new Date(date).toLocaleDateString("ru-RU");
    };

    var type = "";
    if (props.typeRequest == "EducationalActivity") {
        type = "Образовательная деятельность";
    }
    else if (props.typeRequest == "FamilyCircumstances") {
        type = "Семейные обстоятельства";
    }
    else if (props.typeRequest == "Disease") {
        type = "Болезнь";
    }

    return (
        <Card style={{ margin: '20px', textAlign: 'left', height: '50px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', cursor: 'pointer' }}
            onClick={detail}>
            {props.group != null ? (
                <p>{props.userName} —— {props.group} —— {formatDate(props.startDate)} - {formatDate(props.finishDate)} —— {type}</p>
            ) : (
                <p>{props.userName} —— {formatDate(props.startDate)} - {formatDate(props.finishDate)} —— {type}</p>
            )}
        </Card>
    );
}

export default ApprovedApplicationItem;