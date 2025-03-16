import { Card, Button } from "antd";
import Modal from 'react-modal';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRoleThunkCreator } from "../../../reducers/deaneryReducer";
import { deleteRoleThunkCreator } from "../../../reducers/deaneryReducer";
import galochka from "./galochka.png";
import krestik from "./krestik.png";
import { userApi } from "../../../Api/userApi";

Modal.setAppElement('#root');

function RoleItem(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [student, setStudent] = useState(false);
    const [teacher, setTeacher] = useState(false);
    const [deanery, setDeanery] = useState(false);

    const detail = () => {
        navigate(`/profile/${props.id}`);
    };

    const profile = async () => {
        const data = await userApi.getProfileById(props.id);
        for (let i = 0; i < data.roles.length; i++) {
            if (data.roles[i] == 'Student') {
                setStudent(true);
            }
            else if (data.roles[i] == 'Teacher') {
                setTeacher(true);
            }
            else if (data.roles[i] == 'Deanery') {
                setDeanery(true);
            }

        }
    }

    const addRole = async (id, role) => {
        await dispatch(addRoleThunkCreator(id, role));
        profile();
    }

    const deleteRole = async (id, role) => {
        await dispatch(deleteRoleThunkCreator(id, role));
        if (role == 'Student') {
            setStudent(false);
        }
        else if (role == 'Teacher') {
            setTeacher(false);
        }
        else if (role == 'Deanery') {
            setDeanery(false);
        }
        profile();
    }

    const openModal = () => {
        setModalIsOpen(true);
        profile();
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };



    return (
        <Card style={{ margin: '20px', textAlign: 'left', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flexGrow: 1 }}>
                    {props.group != null ? (
                        <p style={{ margin: 0 }} onClick={detail}>{props.name} — {props.group}</p>
                    ) : (
                        <p style={{ margin: 0 }} onClick={detail}>{props.name}</p>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="primary" htmlType="submit" style={{ background: 'rgb(231, 53, 89)' }} onClick={openModal}>Выдать роль</Button>
                </div>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ content: { width: '500px', height: '400px', margin: 'auto', borderRadius: '15px' } }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <button onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '44px', cursor: 'pointer' }}>&times;{ }</button>

                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
                        <h2>Выдать роль</h2>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {student ? (
                                <img src={galochka} style={{ width: '30px', marginLeft: '-15px', marginRight: '5px' }} />

                            ) : (
                                <img src={krestik} style={{ width: '30px', marginLeft: '-15px', marginRight: '5px' }} />
                            )}

                            <div style={{ flexGrow: 1 }}>
                                <p>Студент</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type="primary" htmlType="submit" style={{ marginRight: 10, background: 'rgb(231, 53, 89)' }} onClick={() => addRole(props.id, 'Student')}>
                                    <div style={{ transform: 'rotate(45deg)' }}>&times;{ }</div>
                                </Button>
                                <Button type="primary" htmlType="submit" style={{ background: 'rgb(231, 53, 89)' }} onClick={() => deleteRole(props.id, 'Student')}>&minus;{ }</Button>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {teacher ? (
                                <img src={galochka} style={{ width: '30px', marginLeft: '-15px', marginRight: '5px' }} />

                            ) : (
                                <img src={krestik} style={{ width: '30px', marginLeft: '-15px', marginRight: '5px' }} />
                            )}
                            <div style={{ flexGrow: 1 }}>
                                <p>Преподаватель</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type="primary" htmlType="submit" style={{ marginRight: 10, background: 'rgb(231, 53, 89)' }} onClick={() => addRole(props.id, 'Teacher')}>
                                    <div style={{ transform: 'rotate(45deg)' }}>&times;{ }</div>
                                </Button>
                                <Button type="primary" htmlType="submit" style={{ background: 'rgb(231, 53, 89)' }} onClick={() => deleteRole(props.id, 'Teacher')}>&minus;{ }</Button>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {deanery ? (
                                <img src={galochka} style={{ width: '30px', marginLeft: '-15px', marginRight: '5px' }} />

                            ) : (
                                <img src={krestik} style={{ width: '30px', marginLeft: '-15px', marginRight: '5px' }} />
                            )}
                            <div style={{ flexGrow: 1 }}>
                                <p>Деканат</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type="primary" htmlType="submit" style={{ marginRight: 10, background: 'rgb(231, 53, 89)' }} onClick={() => addRole(props.id, 'Deanery')}>
                                    <div style={{ transform: 'rotate(45deg)' }}>&times;{ }</div>
                                </Button>
                                <Button type="primary" htmlType="submit" style={{ background: 'rgb(231, 53, 89)' }} onClick={() => deleteRole(props.id, 'Deanery')}>&minus;{ }</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </Card>
    );
}

export default RoleItem;