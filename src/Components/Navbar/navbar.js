import { Row } from 'antd';
import { Header } from "antd/es/layout/layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Galochka from "./Galochka.jpg";

function Navbar() {
    //const location = useLocation();
    //const navigate = useNavigate();

    /*useEffect(() => {

    }, [location]);*/

    return (
        <nav style={{ justifyContent: "space-between", padding: 0, background: 'white', borderBottom: '1px solid grey', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2, display: 'flex' }}>
            <div style={{ display: 'flex' }}>
                <h1 style={{ marginInline: 20, marginTop: '25px', whiteSpace: 'nowrap' }}>Pass-tracker</h1>
                <img src={Galochka} style={{ width: '50px', height: '50px', marginTop: '15px', marginRight: '50px' }} />

                <Link to="/listStudents" style={{ marginInline: 20, color: 'black', marginTop: '30px', whiteSpace: 'nowrap'/*, display: 'none'*/ }}>Список студентов</Link>
                <Link to="/applications" style={{ marginInline: 20, color: 'black', marginTop: '30px', whiteSpace: 'nowrap'/*, display: 'none'*/ }}>Заявки</Link>
                <Link to="/role" style={{ marginInline: 20, color: 'black', marginTop: '30px', whiteSpace: 'nowrap'/*, display: 'none'*/ }}>Выдача роли</Link>
            </div>
            <Link to="/login" style={{ marginInline: 20, color: 'black', marginTop: '30px', whiteSpace: 'nowrap' }}>Войти</Link>
        </nav>
    );
}

export default Navbar;