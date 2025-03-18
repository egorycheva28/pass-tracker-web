import React, { useState, useEffect } from "react";
import UnconfirmedUsersItem from "./unconfirmedUsersItem.js";
import { Pagination, Input } from "antd";
import { adminApi } from "../../Api/adminApi.js";
const UnconfirmedUsers = () => {
    const [users, setUsers] = useState([]); 
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await adminApi.getUnconfirmedUsers({ page: current, size: pageSize });
                console.log("API response:", response);
                setUsers(response?.requests || []);
                setCount(response?.pagination?.count || 0);
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        };
    
        fetchData();
    }, [current, pageSize]);
    
    console.log(users);

    const handleDeleteUser = async (id) => {
        await adminApi.deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div>
            <h1>Не подтвержденные пользователи</h1>

            <div className="card-deck">
                {users.length > 0 ? (
                    users.map((user) => (
                        <UnconfirmedUsersItem 
                        key={user.id} 
                        userName={user.name}
                        group={user.group}
                        id={user.id}    
                        onDelete={handleDeleteUser}
                    />
                    ))
                ) : (
                    <p>Нет неподтвержденных пользователей.</p>
                )}
            </div>

            <Pagination current={current} onChange={setCurrent} total={count * 10} />
        </div>
    );
};

export default UnconfirmedUsers;