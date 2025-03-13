import React from "react";
import UnapprovedItem from "./unapprovedItem";
import { Button, Card, Form, Input, DatePicker, Pagination } from "antd";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { unapprovedApplicationsThunkCreator } from "../../../reducers/deaneryReducer";

const Unapproved = ({ deaneryPage }) => {
    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");
    const [group, setGroup] = useState("");
    const [fullName, setFullName] = useState("");
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const count = deaneryPage.pagination.count;
    const isFetched = useRef(false);

    //console.log(startDate, finishDate, group, fullName);

    var parameters = ({
        startDate: startDate,
        finishDate: finishDate,
        group: group,
        fullName: fullName,
        page: current,
        size: pageSize
    });

    const applyFilters = async (e) => {
        e.preventDefault();
        //console.log(startDate, finishDate, group, fullName);
        parameters = ({
            startDate: startDate,
            finishDate: finishDate,
            group: group,
            fullName: fullName,
            page: current,
            size: pageSize
        });

        await dispatch(unapprovedApplicationsThunkCreator(parameters));
    };

    const resetFilters = async (e) => {
        e.preventDefault();

        setStartDate("");
        setFinishDate("");
        setGroup("");
        setFullName("");

        //console.log(startDate, finishDate, group, fullName);
        parameters = ({
            startDate: "",
            finishDate: "",
            group: "",
            fullName: "",
            page: current,
            size: pageSize
        });

        await dispatch(unapprovedApplicationsThunkCreator(parameters));
        //console.log(parameters);
    };

    useEffect(() => {
        if (isFetched.current) return; // Если уже загружали, не запускаем повторно
        isFetched.current = true;
        parameters = ({
            startDate: startDate,
            finishDate: finishDate,
            group: group,
            fullName: fullName,
            page: current,
            size: pageSize,
        });

        dispatch(unapprovedApplicationsThunkCreator(parameters));
    }, [current, pageSize]);

    return (
        <div>
            <h1 style={{ marginTop: '100px', marginBottom: '30px' }}>Список неодобренных заявок</h1>

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
                {deaneryPage.unapprovedApplications.map((value) => (
                    <UnapprovedItem userName={value.userName} group={value.group} startDate={value.startDate}
                        finishDate={value.finishDate} typeRequest={value.typeRequest} id={value.id} key={value.id} />
                ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
                <Pagination current={current} onChange={(page) => setCurrent(page)} total={count * 10} />
                <Input type="number" id="page-size" value={pageSize} onChange={(e) => setPageSize(e.target.value)} min={1}
                    style={{ width: '150px', marginLeft: '10px' }} />
            </div>
        </div>
    );
};

export default Unapproved;