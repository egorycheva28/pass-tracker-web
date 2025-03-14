import React, { useState, useEffect, useCallback } from "react";
import RoleItem from "./roleItem";
import { Button, Card, Form, Input, DatePicker, Pagination } from "antd";
import { useDispatch } from "react-redux";
import { roleThunkCreator } from "../../../reducers/deaneryReducer";

const Role = ({ deaneryPage }) => {
    const dispatch = useDispatch();

    const [group, setGroup] = useState("");
    const [fullName, setFullName] = useState("");
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const count = deaneryPage.pagination.count;

    // Функция для получения параметров запроса
    const getParameters = useCallback(() => ({
        group: group,
        fullName: fullName,
        page: current,
        size: pageSize,
    }), [group,fullName, current, pageSize]);

    const applyFilters = useCallback(async (e) => {
        e.preventDefault();
        await dispatch(roleThunkCreator(getParameters()));
    }, [dispatch, getParameters]);

    const resetFilters = useCallback(async (e) => {
        e.preventDefault();
        setGroup("");
        setFullName("");
        setCurrent(1);

        await dispatch(roleThunkCreator({
            group: "",
            fullName: "",
            page: 1,
            size: pageSize,
        }));
    }, [dispatch, pageSize]);

    useEffect(() => {
        dispatch(roleThunkCreator(getParameters()));
    }, [dispatch, getParameters]);
    return (
        <div>
            <h1 style={{ marginTop: '100px', marginBottom: '30px' }}>Выдача роли</h1>

            <Card style={{ margin: '20px', textAlign: 'left', marginBottom: '50px' }}>
                <Form >
                    <Input value={group} onChange={(e) => setGroup(e.target.value)} placeholder="Номер группы" style={{ marginInline: 15, width: 'auto' }} />
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="ФИО" style={{ marginLeft: 15, width: '350px' }} />
                    <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 5, background: 'rgb(231, 53, 89)' }} onClick={applyFilters}>Применить</Button>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 5, background: 'rgb(231, 53, 89)' }} onClick={resetFilters}>Сбросить</Button>
                    </div>
                </Form>
            </Card >

            <div className="card-deck">
                {deaneryPage.role.map((value) => (
                    <RoleItem name={value.name} group={value.group} id={value.id} key={value.id} />
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

export default Role;
