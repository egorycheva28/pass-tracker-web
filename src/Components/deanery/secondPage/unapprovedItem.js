import { Card, Button, Input } from "antd";
import Modal from 'react-modal';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { acceptRequestThunkCreator } from "../../../reducers/deaneryReducer";
import { useDispatch } from "react-redux";
import { declineRequestThunkCreator } from "../../../reducers/deaneryReducer";

Modal.setAppElement('#root');

function UnapprovedItem(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [comment, setCommetn] = useState("");

    const detail = () => {
        navigate(`/detail/${props.id}`);
    };

    const formatDate = (date) => {
        if (!date) return "12.13.2024";
        return new Date(date).toLocaleDateString("ru-RU");
    };

    var type = "";
    if (props.typeRequest == "EducationalActivity") {
        type = "По учебной деятельности";
    }
    else if (props.typeRequest == "FamilyCircumstances") {
        type = "По семейным обстоятельствам";
    }
    else if (props.typeRequest == "Disease") {
        type = "По болезни";
    }

    const acceptRequest = async (id) => {
        await dispatch(acceptRequestThunkCreator(id));
        window.location.reload();
    };

    const declineRequest = async (id) => {
        await dispatch(declineRequestThunkCreator(id, comment));
        window.location.reload();
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCommetn("");
    };

    return (
        <Card style={{ margin: '20px', textAlign: 'left', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flexGrow: 1 }}>
                    {props.group != null ? (
                        <p style={{ margin: 0 }} onClick={detail}>{props.userName} —— {props.group} —— {formatDate(props.startDate)} - {formatDate(props.finishDate)} —— {type}</p>
                    ) : (
                        <p style={{ margin: 0 }} onClick={detail}>{props.userName} —— {formatDate(props.startDate)} - {formatDate(props.finishDate)} —— {type}</p>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <Button type="primary" htmlType="submit" style={{ background: 'rgb(231, 53, 89)' }} onClick={() => acceptRequest(props.id)}>Одобрить</Button>
                    <Button type="primary" htmlType="submit" style={{ background: 'rgb(231, 53, 89)', marginLeft: '10px' }} onClick={openModal}>Отклонить</Button>
                </div>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ content: { width: '300px', height: '200px', margin: 'auto', borderRadius: '15px' } }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <button onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '44px', cursor: 'pointer' }}>&times;{ }</button>

                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
                        <h4>Комментарий к заявке</h4>
                        <Input value={comment} onChange={(e) => setCommetn(e.target.value)} placeholder="Введите комментарий" style={{ width: "300px" }} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 'auto' }}>
                        <Button type="primary" htmlType="submit" style={{ background: "rgb(231, 53, 89)" }} onClick={() => declineRequest(props.id)}>Отклонить</Button>
                    </div>
                </div>
            </Modal>
        </Card>
    );
}

export default UnapprovedItem;