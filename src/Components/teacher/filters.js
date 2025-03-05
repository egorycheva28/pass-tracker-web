import React, { useEffect } from "react";
import ListStudentsItem from "./listStudentsItem";
import { Button, Card, Form, Input, DatePicker } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getStudentsThunkCreator } from "../../reducers/teacherReducer";

function Filters() {
    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");
    const [tags, setGroup] = useState("");
    const [fullName, setFullName] = useState("");
    console.log(startDate, finishDate, tags, fullName);

    useEffect(() => {

    });

    const parameters = {};

    const applyFilters = async (e) => {
        e.preventDefault();
        console.log(startDate, finishDate, tags, fullName);

        await dispatch(getStudentsThunkCreator(parameters));
    };

    const resetFilters = async (e) => {
        e.preventDefault();
        setStartDate("");
        setFinishDate("");
        setGroup("");
        setFullName("");
        console.log(startDate, finishDate, tags, fullName);

        await dispatch(getStudentsThunkCreator(parameters));

    };

    return (
        <Card style={{ margin: '20px', textAlign: 'left', marginBottom: '50px' }}>
            <Form >
                <DatePicker value={startDate} onChange={(date) => setStartDate(date)} placeholder="Дата начала" style={{ marginRight: 15, width: 'auto' }} />
                <DatePicker value={finishDate} onChange={(date) => setFinishDate(date)} placeholder="Дата конца" style={{ marginInline: 15, width: 'auto' }} />
                <Input value={tags} onChange={(e) => setGroup(e.target.value)} placeholder="Номер группы" style={{ marginInline: 15, width: 'auto' }} />
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="ФИО" style={{ marginLeft: 15, width: '350px' }} />
                <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: 5, background: 'rgb(231, 53, 89)' }} onClick={applyFilters}>Применить</Button>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: 5, background: 'rgb(231, 53, 89)' }} onClick={resetFilters}>Сбросить</Button>
                </div>
            </Form>
        </Card >)
}
export default Filters;