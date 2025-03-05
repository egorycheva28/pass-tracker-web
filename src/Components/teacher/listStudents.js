import React from "react";
import ListStudentsItem from "./listStudentsItem";
import { Button } from "antd";
import Filters from "./filters";
import Paginations from "./pagination";

class ListStudents extends React.Component {
    render() {
        return (
            <div>
                <h1 style={{ marginTop: '100px', marginBottom: '30px' }}>Список студентов</h1>
                <Filters />
                <div className="card-deck">
                    {
                        this.props.teacherPage.listStudents.map((value) => {
                            return <ListStudentsItem title={value.title} description={value.description} key={value.id} />
                        })
                    }
                </div>
                <div style={{ margin: '20px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button type="primary" htmlType="submit" style={{ background: 'rgb(231, 53, 89)' }}>Экспортировать</Button>
                </div>
                <Paginations />
            </div>
        )
    }
}

export default ListStudents;