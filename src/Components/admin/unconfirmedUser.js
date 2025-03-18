import React, { useState, useEffect } from "react";
import UnconfirmedUsersItem from "./unconfirmedUsersItem.js";
import { Pagination, Input } from "antd";
import { adminApi } from "../../Api/adminApi.js";
const UnconfirmedUsers = () => {
    const [users, setUsers] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [count, setCount] = useState(0);

    const fetchData = async (page = current, size = pageSize) => {
        try {
            const response = await adminApi.getUnconfirmedUsers({ page, size });
            console.log("API response:", response);
            setUsers(response?.requests || []);
            setCount(response?.pagination?.count || 0);
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [current, pageSize]);

    console.log(users);

    const handleDeleteUser = async (id) => {
        await adminApi.deleteUser(id);
        await fetchData();
    };

    const handleConfirmUser = async (id, role) => {
        await adminApi.confirmUser(id, role);
        await fetchData();
    };

    return (
        <div>
            <h1 style={{ marginTop: '100px', marginBottom: '30px' }}>Не подтвержденные пользователи</h1>

            <div className="card-deck">
                {users.length > 0 ? (
                    users.map((user) => (
                        <UnconfirmedUsersItem
                            key={user.id}
                            userName={user.name}
                            group={user.group}
                            id={user.id}
                            onDelete={handleDeleteUser}
                            onConfirm={handleConfirmUser}
                        />
                    ))
                ) : (
                    <p>Нет неподтвержденных пользователей.</p>
                )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
                <Pagination current={current} onChange={(page) => setCurrent(page)} total={count * 10} />
                <Input type="number" id="page-size" value={pageSize} onChange={(e) => setPageSize(e.target.value)} min={1}
                    style={{ width: '150px', marginLeft: '10px' }} />
            </div>
        </div>
    );
};

export default UnconfirmedUsers;