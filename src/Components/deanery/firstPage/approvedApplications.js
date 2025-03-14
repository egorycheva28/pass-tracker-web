import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, Form, Input, DatePicker, Pagination } from "antd";
import ApprovedApplicationItem from "./approvedApplicationItem";
import { approvedApplicationsThunkCreator, exportThunkCreator } from "../../../reducers/deaneryReducer";

const ApprovedApplications = ({ deaneryPage }) => {
    const dispatch = useDispatch();
    const isFetched = useRef(false);

    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");
    const [group, setGroup] = useState("");
    const [fullName, setFullName] = useState("");
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const count = deaneryPage.pagination.count;

    const fetchData = async () => {
        const parameters = {
            startDate,
            finishDate,
            group,
            fullName,
            author: group,
            page: current,
            size: pageSize,
        };
        console.log("Запрос отправлен:", parameters);
        await dispatch(approvedApplicationsThunkCreator(parameters));
    };

    useEffect(() => {
        if (!isFetched.current) {
            isFetched.current = true;
        } else {
            fetchData();
        }
    }, [startDate, finishDate, group, fullName, current, pageSize]);

    const applyFilters = (e) => {
        e.preventDefault();
        setCurrent(1);
    };

    const resetFilters = (e) => {
        e.preventDefault();
        setStartDate("");
        setFinishDate("");
        setGroup("");
        setFullName("");
        setCurrent(1);
    };

    const exportListStudents = async () => {
        dispatch(exportThunkCreator());
    };

    return (
        <div>
            <h1 style={{ marginTop: '100px', marginBottom: '30px' }}>Список одобренных заявок</h1>

            <Card style={{ margin: '20px', textAlign: 'left', marginBottom: '50px' }}>
                <Form >
                    <DatePicker value={startDate} onChange={(date) => setStartDate(date)} placeholder="Дата начала" style={{ marginRight: 15, width: 'auto' }} />
                    <DatePicker value={finishDate} onChange={(date) => setFinishDate(date)} placeholder="Дата конца" style={{ marginInline: 15, width: 'auto' }} />
                    <Input value={group} onChange={(e) => setGroup(e.target.value)} placeholder="Номер группы" style={{ marginInline: 15, width: 'auto' }} />
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="ФИО" style={{ marginLeft: 15, width: '350px' }} />
                    <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 5, background: 'rgb(231, 53, 89)' }} onClick={applyFilters}>Применить</Button>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 5, background: 'rgb(231, 53, 89)' }} onClick={resetFilters}>Сбросить</Button>
                    </div>
                </Form>
            </Card >

            <div className="card-deck">
                {deaneryPage.approvedApplications.map((value) => (
                    <ApprovedApplicationItem userName={value.userName} group={value.group} startDate={value.startDate}
                        finishDate={value.finishDate} typeRequest={value.typeRequest} id={value.id} key={value.id} />
                ))}
            </div>

            <div style={{ margin: '20px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Button type="primary" htmlType="submit" style={{ background: 'rgb(231, 53, 89)' }} onClick={exportListStudents}>Экспортировать</Button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
                <Pagination current={current} onChange={(page) => setCurrent(page)} total={count * 10} />
                <Input type="number" id="page-size" value={pageSize} onChange={(e) => setPageSize(e.target.value)} min={1}
                    style={{ width: '150px', marginLeft: '10px' }} />
            </div>
        </div>
    );
};


export default ApprovedApplications;
