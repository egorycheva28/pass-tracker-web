import React from 'react';
import { Input, Pagination } from "antd";
import { useState } from "react";

const Paginations = () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    console.log(pageSize);
    console.log(current);

    return (
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
            <Pagination current={current} onChange={(page) => setCurrent(page)} total={50} />
            <Input type="number" id="page-size" value={pageSize} onChange={(e) => setPageSize(e.target.value)} min={1}
                style={{ width: '150px', marginLeft: '10px' }} />
        </div>
    );
};

export default Paginations;
